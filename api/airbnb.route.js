import express from "express"
import AirBnbController from "./airbnb.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();
router.route("/").get(AirBnbController.apiGetAirBnb);
router.route("/review").post(ReviewsController.apiPostReview).put(ReviewsController.apiUpdateReview).delete(ReviewsController.apiDeleteReview);

export default router;