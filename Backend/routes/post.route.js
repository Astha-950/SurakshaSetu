import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { isloggedIn} from "../middlewares/auth.middleware.js";
import {createPost, getAllPosts, getPost,togglePostStatus} from "../controllers/post.controller.js";
const postRouter=Router();

postRouter.post("/create",upload.fields([
    {name:"post_media",maxCount:5}
]),isloggedIn,createPost)

postRouter.get("/allPosts",getAllPosts);

postRouter.get("/singlePost/:post_id",getPost);
postRouter.patch("/toggleStatus",togglePostStatus);

export default postRouter;

