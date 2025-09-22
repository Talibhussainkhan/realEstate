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

export const deleteListing = async ( req, res , next ) => {
    const listing = await Listing.findById(req.params.id);
    if( !listing ) return next(errorHandler(404, 'Listing not found!'));
    if(req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only delete your own listing!'));
    try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!')
      
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if( !listing ) return next(errorHandler(404, 'Listing not found!'));
    if(req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only delete your own listing!'));
    try {
        const data = req.body;
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        {
            $set : {
             data
            }
        },
        { new : true }
      )
        res.status(200).json(updateListing);
    } catch (error) {
        next(error)
    }
}