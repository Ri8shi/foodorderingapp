const express = require("express");
const router = express.Router();
const {getAllRestaurants} = require("../controllers/restaurantController");
const { getRestaurant } = require("../controllers/restaurantController");

router.route("/").get(getAllRestaurants)
router.route("/:storeId").get(getRestaurant)

module.exports = router;