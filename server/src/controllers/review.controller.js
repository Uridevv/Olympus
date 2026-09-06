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

export const likeReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        const alreadyLikedIndex = review.alreadyLiked.findIndex(
            (likedUserId) => likedUserId.toString() === userId
        );

        if (alreadyLikedIndex !== -1) {
            // Ya tenia like, se lo quitamos.
            review.alreadyLiked.splice(alreadyLikedIndex, 1);
            review.likes = Math.max(0, review.likes - 1);
        } else {
            // No tenia like, se lo agregamos.
            review.alreadyLiked.push(userId);
            review.likes += 1;

            // Si tenia dislike, se lo quitamos.
            const alreadyDislikedIndex = review.alreadyDisliked.findIndex(
                (dislikedUserId) => dislikedUserId.toString() === userId
            );
            if (alreadyDislikedIndex !== -1) {
                review.alreadyDisliked.splice(alreadyDislikedIndex, 1);
                review.dislikes = Math.max(0, review.dislikes - 1);
            }
        }

        const updatedReview = await review.save();
        return res.status(200).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const dislikeReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        const alreadyDislikedIndex = review.alreadyDisliked.findIndex(
            (dislikedUserId) => dislikedUserId.toString() === userId
        );

        if (alreadyDislikedIndex !== -1) {
            // Ya tenia dislike, se lo quitamos.
            review.alreadyDisliked.splice(alreadyDislikedIndex, 1);
            review.dislikes = Math.max(0, review.dislikes - 1);
        } else {
            // No tenia dislike, se lo agregamos.
            review.alreadyDisliked.push(userId);
            review.dislikes += 1;

            // Si tenia like, se lo quitamos.
            const alreadyLikedIndex = review.alreadyLiked.findIndex(
                (likedUserId) => likedUserId.toString() === userId
            );
            if (alreadyLikedIndex !== -1) {
                review.alreadyLiked.splice(alreadyLikedIndex, 1);
                review.likes = Math.max(0, review.likes - 1);
            }
        }

        const updatedReview = await review.save();
        return res.status(200).json(updatedReview);
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