const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Fetch message error:", error);

    res.status(500).json({
      message: "Failed to fetch message",
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (cleanName.length > 100) {
      return res.status(400).json({
        message: "Name is too long",
      });
    }

    if (cleanEmail.length > 254) {
      return res.status(400).json({
        message: "Email is too long",
      });
    }

    if (cleanSubject.length > 200) {
      return res.status(400).json({
        message: "Subject is too long",
      });
    }

    if (cleanMessage.length > 5000) {
      return res.status(400).json({
        message: "Message is too long",
      });
    }

    const newMessage = await Message.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    console.error("Mark message as read error:", error);

    res.status(500).json({
      message: "Failed to update message",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  markMessageAsRead,
  deleteMessage,
};