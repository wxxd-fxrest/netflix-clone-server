const { addTolikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addTolikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/remove", removeFromLikedMovies);

module.exports = router; 