import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async ( req, res, next ) =>{
    try {
        if (!req.files || req.files.length === 0) {
        return errorHandler(400, 'At least one image is required');   
     }
    const userId = req.user.id;
    const imageUrls = req.files.map((file) => file.path);
    const listingData = await Listing.create({ ...req.body, imageUrls , userRef : userId});
    res.status(200).json(listingData);
    } catch (error) {
        next(error);
    }
}