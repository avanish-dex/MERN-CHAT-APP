import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    
    // --- MCA ENHANCEMENT: SENTIMENT LOGIC ---
    const sentimentColor = message.sentiment === "Positive" ? "bg-green-600" : 
                           message.sentiment === "Negative" ? "bg-red-600" : 
                           bubbleBgColor;

    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} />
                </div>
            </div>
            
            <div className={`chat-bubble text-white ${sentimentColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>

            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
                {message.sentiment && (
                    <span className='font-bold ml-2'>[{message.sentiment}]</span>
                )}
            </div>
        </div>
    );
};

export default Message;