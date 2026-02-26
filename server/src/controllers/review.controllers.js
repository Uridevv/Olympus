import Review from '../models/review.model.js'

export const getProductReviews = async (req, res) => {
    try{
        const { productId } = req.params;
        const reviewsFound = await Review.find({product:productId}).populate('user').populate('product')
        if(!reviewsFound) return res.status(404).json({message:"Reviews not found."})

        return res.status(200).json(reviewsFound)

    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getUserReviews = async (req, res) => {
    try{
        const { userId } = req.params;
        const reviewsFound = await Review.find({user:userId}).populate('user')
        if(!reviewsFound) return res.status(404).json({message:"Reviews not found."})

        return res.status(200).json(reviewsFound)

    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

export const createReview = async (req, res) => {
    try {
        const { user, product, rating, opinion } = req.body;
        const newReview = new Review({ user, product, rating, opinion });
        const savedReview = await newReview.save();
        return res.status(200).json(savedReview);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) return res.status(404).json({ message: "Review not found" });
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}