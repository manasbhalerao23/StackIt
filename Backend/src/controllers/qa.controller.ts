import { Answer, Question } from "../models/db"
import { Request, Response, NextFunction } from 'express';
import cloudinary from "../utils/cloudinary";
import mongoose from "mongoose";
export const createQuestion=async(req:Request, res:Response)=>{
     let images:any=[];
    // console.log("Waiting 500ms to ensure files are ready...");
    // await new Promise(resolve => setTimeout(resolve, 500));
    // console.log('Received files:', req.files);

if(req.files){

    for (const file of req.files as Express.Multer.File[]) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            timeout: 30000,
          });
          images.push(result.url);
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);
          images.push(null); 
          res.status(500).json({message:err});
          return 
        }
      }
}
console.log(images)
    const {title,description,tags}=req.body
    if (!title || !description || !tags) {
  return res.status(400).json({ message: 'Title, description, and tags are required.' });
}

const userId = req.user;

if (!userId) {
  return res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

const question = await Question.create({
  title,
  description,
  tags,
  userId,
  images
});

return res.status(201).json({
  message: 'Question created successfully.',
  data: question,
});
}


export const createAnswer= async(req:Request,res:Response)=>{
     let images:any=[];
     if(req.files){

    for (const file of req.files as Express.Multer.File[]) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            timeout: 30000,
          });
          images.push(result.url);
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);
          images.push(null); 
          res.status(500).json({message:err});
          return 
        }
      }
}
const {questionId,content}=req.body
if(!questionId || !content){
    return res.status(400).json({message:'Question id and content are required.'})
}
const question = await Question.findById(questionId);
if (!question) {
return res.status(404).json({ message: 'Question not found.' });
}
const userId = req.user;
if (!userId) {
  return res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

const answer= await Answer.create({
    questionId,
    content,
    userId,
    images
})
return res.status(201).json({
  message: 'Answer created successfully.',
  data: answer,
});



}



export const upvoteAnswer = async (req: Request, res: Response) => {
const userId = req.user;
const { answerId } = req.body;

if (!answerId || !mongoose.Types.ObjectId.isValid(answerId)) {
return res.status(400).json({ message: 'Invalid answer ID.' });
}

try {
const answer = await Answer.findById(answerId);
if (!answer) {
return res.status(404).json({ message: 'Answer not found.' });
}


const hasUpvoted = answer.upvotes.includes(userId);
const hasDownvoted = answer.downvotes.includes(userId);

if (hasUpvoted) {
  answer.upvotes.pull(userId);
} else {
  answer.upvotes.push(userId);
  if (hasDownvoted) {
    answer.downvotes.pull(userId); 
  }
}

await answer.save();

return res.status(200).json({
  message: hasUpvoted ? 'Upvote removed.' : 'Answer upvoted.',
  upvotes: answer.upvotes.length,
  downvotes: answer.downvotes.length
});
} catch (error) {
console.error(error);
return res.status(500).json({ message: 'Internal server error.' });
}
};

export const downvoteAnswer = async (req: Request, res: Response) => {
try {
const userId = req.user; 
const { answerId } = req.body;


if (!answerId || !mongoose.Types.ObjectId.isValid(answerId)) {
  return res.status(400).json({ message: 'Invalid or missing answer ID.' });
}

if (!userId) {
  return res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

const answer = await Answer.findById(answerId);
if (!answer) {
  return res.status(404).json({ message: 'Answer not found.' });
}

const hasDownvoted = answer.downvotes.includes(userId);
const hasUpvoted = answer.upvotes.includes(userId);

if (hasDownvoted) {
  answer.downvotes.pull(userId);
} else {
  answer.downvotes.push(userId);

  if (hasUpvoted) {
    answer.upvotes.pull(userId);
  }
}

await answer.save();

return res.status(200).json({
  message: hasDownvoted ? 'Downvote removed.' : 'Answer downvoted.',
  upvotes: answer.upvotes.length,
  downvotes: answer.downvotes.length,
});
} catch (error) {
console.error('Downvote error:', error);
return res.status(500).json({ message: 'Internal server error.' });
}
};