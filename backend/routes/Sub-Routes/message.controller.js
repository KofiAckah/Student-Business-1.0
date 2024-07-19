import { Message } from "../../models/Message.js";
import { Conversation } from "../../models/Conversation.js";
import { User } from "../../models/User.js";

export const createMessage = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    if (message === "") {
      return res.status(401).json({ msg: "Fill the message" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
      // await conversation.save();
      // await newMessage.save();
      await Promise.all([conversation.save(), newMessage.save()]);
      res.status(200).json(newMessage);
    } else {
      res.status(400).json({ msg: "Message not sent" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

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
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = await User.findById(req.user._id);

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const getChattedUsers = async (req, res) => {
  try {
    // Assuming req.user._id contains the ID of the logged-in user
    const loggedInUserId = req.user._id;

    // Find conversations where the logged-in user is a participant
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    }).populate("participants");

    // Filter out the logged-in user from the participants and collect unique users
    const chattedUsers = {};
    conversations.forEach((conversation) => {
      conversation.participants.forEach((participant) => {
        if (participant._id.toString() !== loggedInUserId.toString()) {
          // Use a map/object to ensure uniqueness of users
          chattedUsers[participant._id] = {
            _id: participant._id,
            username: participant.username,
            email: participant.email,
            profilePic: participant.image, // Assuming the field is named profilePic
          };
        }
      });
    });

    // Convert the map/object back into an array of user objects
    const uniqueChattedUsers = Object.values(chattedUsers);

    res.status(200).json(uniqueChattedUsers);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
