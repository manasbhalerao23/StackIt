import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { createAnswer, createQuestion, downvoteAnswer, upvoteAnswer } from '../controllers/qa.controller';
import upload from '../middleware/multer';

const qaRoutes=Router()


qaRoutes.post("/createQuestion",protect,upload.array("images",6),createQuestion);
qaRoutes.post("/createAnswer",protect,upload.array("images",6),createAnswer);
qaRoutes.post("/upvote",protect,upvoteAnswer);
qaRoutes.post("/downvote",protect, downvoteAnswer);



export default qaRoutes;
