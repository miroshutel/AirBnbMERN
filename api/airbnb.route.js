import express from "express"
import AirBnbController from "./airbnb.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();
router.route("/").get(AirBnbController.apiGetAirBnb);
router.route("/id:id").get(AirBnbController.apiGetAirBnbById);
router.route("/bed_type").get(AirBnbController.apiGetAirBnbByBedType);
router.route("/review").post(ReviewsController.apiPostReview).put(ReviewsController.apiUpdateReview).delete(ReviewsController.apiDeleteReview);

export default router;