import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"; 

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        // 1. Listen for the exact string emitted by your backend
        socket?.on("newMessage", (newMessage) => {
            // 2. Append the new message to the existing array of messages
            setMessages([...messages, newMessage]);
        });

        // 3. Cleanup function (Crucial: prevents messages from duplicating)
        return () => socket?.off("newMessage");
        
    }, [socket, setMessages, messages]);
};

export default useListenMessages;