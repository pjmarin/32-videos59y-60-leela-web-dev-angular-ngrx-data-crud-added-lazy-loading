import { Router } from "express";
import { getPosts, addPost, updatePost, deletePost, getPostById } from "../controllers/posts.controller.js";
import { requireToken } from "../middlewares/requireToken.js"

const router = Router();

// router.get("/getPosts", requireToken, getPosts);
// router.post("/addPost", requireToken, addPost);
// router.patch("/updatePost", requireToken, updatePost);
// router.get("/getPostById/:id", requireToken, getPostById);
// router.delete("/deletePost/:id", requireToken, deletePost);

router.get("/getPosts", getPosts);
router.post("/addPost", addPost);
router.put("/updatePost", updatePost);
router.get("/getPostById/:id", getPostById);
router.delete("/deletePost/:id", deletePost);

export default router;