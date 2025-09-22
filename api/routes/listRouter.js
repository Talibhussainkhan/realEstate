import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListing, deleteListing, updateListing } from "../controller/listController.js";
import { upload } from "../utils/multer.js";

const listingRouter = express.Router();
// 6 limit set if you want to set so remove
listingRouter.post('/create',verifyToken, upload.array('images', 6) , createListing);
listingRouter.delete('/delete/:id', verifyToken, deleteListing);
listingRouter.post('/update/:id', verifyToken, updateListing);


export default listingRouter;