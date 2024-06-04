import React, { useEffect } from "react";

const Chatbot = () => {
    useEffect(() => {
        window.embeddedChatbotConfig = {
            chatbotId: "pSPBjJSvsvU9JMTUQwDLn",
            domain: "www.chatbase.co"
        };

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.chatbotId = "pSPBjJSvsvU9JMTUQwDLn";
        script.domain = "www.chatbase.co";
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // or you can return a placeholder component if needed
};

export default Chatbot;
