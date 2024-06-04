import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import "./dashboardCommonStyles.css"; // Import CSS file
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const { isAuthenticated, user } = useContext(Context);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/v1/appointment/getallbypatient",
                    { withCredentials: true }
                );
                setAppointments(data.appointments);
            } catch (error) {
                setAppointments([]);
            }
        };
        fetchAppointments();
    }, []);

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            <section className="dashboard page">
                <div className="banner">
                    <div className="firstBox">
                        <img src="/doc.png" alt="docImg" />
                        <div className="content">
                            <div>
                                <p>Hello ,</p>
                                <h5>
                                    {user &&
                                        `${user.firstName} ${user.lastName}`}{" "}
                                </h5>
                            </div>
                            <p>
                                Welcome to your dashboard. Here you can see all your appointments and their statuses.
                            </p>
                        </div>
                    </div>
                    <div className="secondBox">
                        <p>Total Appointments</p>
                        <h3>{appointments.length}</h3>
                    </div>
                </div>
                <div className="banner">
                    <h5>Appointments</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Visited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{appointment.appointment_date.substring(0, 16)}</td>
                                        <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                        <td>{appointment.department}</td>
                                        <td
                                            className={
                                                appointment.status === "Pending"
                                                    ? "value-pending"
                                                    : appointment.status === "Accepted"
                                                        ? "value-accepted"
                                                        : "value-rejected"
                                            }
                                        >
                                            <select
                                                value={appointment.status}
                                                onChange={(e) =>
                                                    handleUpdateStatus(appointment._id, e.target.value)
                                                }
                                            >
                                                <option value="Pending" className="value-pending">
                                                    Pending
                                                </option>
                                                <option value="Accepted" className="value-accepted">
                                                    Accepted
                                                </option>
                                                <option value="Rejected" className="value-rejected">
                                                    Rejected
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            {appointment.hasVisited === true ? (
                                                <GoCheckCircleFill className="green" />
                                            ) : (
                                                <AiFillCloseCircle className="red" />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Appointments Found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            <Sidebar />
        </>
    );
};

export default PatientDashboard;
