import { Router } from 'express';
import { register, login ,logout} from '../controllers/auth.controller';
import { getQuestionsWithAnswers } from '../controllers/view.controller';


const viewRoutes = Router();

viewRoutes.get("/getAllQA",getQuestionsWithAnswers)

export default viewRoutes
