import { Request, Response } from 'express';
import { Answer, Question, User } from '../models/db';


export const getQuestionsWithAnswers = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 }) 
      .populate('userId', 'username email') 
      .populate('acceptedAnswerId') 
      .lean();

    const questionIds = questions.map(q => q._id);
    const answers = await Answer.find({ questionId: { $in: questionIds } })
      .populate('userId', 'username email')
      .lean();

    const answersGrouped: { [key: string]: any[] } = {};
    answers.forEach(answer => {
      const qId = answer.questionId.toString();
      if (!answersGrouped[qId]) answersGrouped[qId] = [];
      answersGrouped[qId].push(answer);
    });

    const combined = questions.map(question => {
      const qId = question._id.toString();
      return {
        ...question,
        answers: answersGrouped[qId] || [],
      };
    });

    res.status(200).json({ success: true, data: combined });
  } catch (error) {
    console.error('Error fetching questions with answers:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
