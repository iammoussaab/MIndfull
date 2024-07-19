import React from "react";

const ContactList = ({ contacts, selectedContact, setSelectedContact }) => {
  return (
    <div>
      <label>Select Receiver:</label>
      <select
        value={selectedContact}
        onChange={(e) => setSelectedContact(e.target.value)}
      >
        <option value="">Select a contact</option>
        {contacts.map((contact) => (
          <option key={contact._id} value={contact._id}>
            {contact.firstName} {contact.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContactList;
