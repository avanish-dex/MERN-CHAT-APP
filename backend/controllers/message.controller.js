import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import axios from "axios";

// --- GET MESSAGES ---
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// --- SEND MESSAGE (With NLP Integration) ---
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; 
        const senderId = req.user._id; 

        // 1. Find or create the conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // 2. Create the new message in memory
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // 3. Save to database (Promise.all runs both saves simultaneously for speed)
        await Promise.all([conversation.save(), newMessage.save()]);

        // 4. MCA Enhancement: Call Python NLP Service
        // Using 127.0.0.1 to avoid Node.js localhost resolution bugs
        const nlpResponse = await axios.post("http://127.0.0.1:5001/analyze", { 
            text: message 
        });
        const sentiment = nlpResponse.data.sentiment;

        // 5. Attach sentiment to the exact variable we created above
        const newMessageWithSentiment = { ...newMessage._doc, sentiment };

        // 6. Emit via Socket.io for real-time updates
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessageWithSentiment);
        }

        // 7. Send the response back to the sender's screen
        res.status(201).json(newMessageWithSentiment);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};