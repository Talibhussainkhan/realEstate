import Listing from "../models/listingModel.js";

export const createListing = async ( req, res, next ) =>{
    try {
        const listing = await Listing.create(req.body)
    } catch (error) {
        next(error);
    }
}