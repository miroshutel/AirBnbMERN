import express from "express"
import AirBnbController from "./airbnb.controller.js";

const router = express.Router();
router.route("/").get(AirBnbController.apiGetAirBnb);
//router.route("review").post(AirBnbController.apiPostReview).put(AirBnbController.apiUpdateReview).delete(AirBnbController.apiDeleteReview)

export default router;