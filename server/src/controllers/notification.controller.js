import Notification from '../models/notification.model.js'

export const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ user: userId }).sort({ date: -1 });
        if (!notifications) return res.status(404).json({ message: "No notifications found" })

        return res.status(200).json(notifications)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const getNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) return res.status(404).json({ message: "Notification not found" })

        return res.status(200).json(notification)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const createNotification = async (req, res) => {
    try {
        const { user, title, message, type, status } = req.body;
        const newNotification = new Notification({ user, title, message, type, status });
        const savedNotification = await newNotification.save();
        return res.status(200).json(savedNotification);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const updateNotificationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, ids } = req.body;

        if (Array.isArray(ids) && ids.length > 0) {
            const result = await Notification.updateMany({ _id: { $in: ids } }, { status });
            if (result.matchedCount === 0) return res.status(404).json({ message: "No notifications found" });
            const updatedNotifications = await Notification.find({ _id: { $in: ids } });
            return res.status(200).json(updatedNotifications);
        }

        if (!id) return res.status(400).json({ message: "Notification id or ids array is required" });

        const updatedNotification = await Notification.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedNotification) return res.status(404).json({ message: "Notification not found" });
        return res.status(200).json(updatedNotification);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { ids } = req.body;

        if (Array.isArray(ids) && ids.length > 0) {
            const result = await Notification.deleteMany({ _id: { $in: ids } });
            if (result.deletedCount === 0) return res.status(404).json({ message: "No notifications found" });
            return res.status(200).json({ message: `${result.deletedCount} notifications deleted successfully` });
        }

        if (!id) return res.status(400).json({ message: "Notification id or ids array is required" });

        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) return res.status(404).json({ message: "Notification not found" });
        return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}
