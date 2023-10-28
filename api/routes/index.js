import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Express on vercel");
});

router.get("/r1", function (req, res, next) {
  res.json({ msg: "Express on vercel" });
});

export default router;
