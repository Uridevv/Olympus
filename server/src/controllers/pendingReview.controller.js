import PendingReview from '../models/pendingReview.model.js'

export const getPendingReviews = async (req, res) => {
    try {

        const pendingReviews = await PendingReview.find({user:req.params.userId}).populate('user').populate('product');
        if (!pendingReviews) return res.status(404).json({ message: "No pending reviews found" })
            
        return res.status(200).json(pendingReviews)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const getOnePendingReview = async (req, res) => {
    try {
        const pendingReview = await PendingReview.findById(req.params.id).populate('user').populate('product');
        if (!pendingReview) return res.status(404).json({ message: "Pending review not found" })
            
        return res.status(200).json(pendingReview)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const deletePendingReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePendingReview = await PendingReview.findByIdAndDelete(id);
        if (!deletePendingReview) return res.status(404).json({ message: "Pending review not found" });
        return res.status(200).json({ message: "Pending review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}