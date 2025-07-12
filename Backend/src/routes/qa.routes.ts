import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { createQuestion } from '../controllers/qa.controller';
import upload from '../middleware/multer';

const qaRoutes=Router()


qaRoutes.post("/createQuestion",protect,upload.array("images",6),createQuestion);
// qaRoutes.post("/answerCreate");
// qaRoutes.post("/likeQuestion");
// qaRoutes.post("/dislikeQuestion");


export default qaRoutes;
