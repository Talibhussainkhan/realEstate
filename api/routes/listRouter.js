import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListing } from "../controller/listController.js";

const listingRouter = express.Router();

listingRouter.post('/create', verifyToken, createListing);



export default listingRouter;