import express from "express";

var router = express.Router();

import register_user from "../controllers/register_user.js";
import update_user from "../controllers/update_user.js";
import get_users from "../controllers/get_users.js";

/* GET users listing. */
router.get('/', get_users);

router.post('/' ,register_user);

router.patch('/',update_user)

export default router;
