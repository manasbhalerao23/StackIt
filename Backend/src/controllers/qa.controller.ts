import { Question } from "../models/db"
import { Request, Response, NextFunction } from 'express';
import cloudinary from "../utils/cloudinary";
export const createQuestion=async(req:Request, res:Response)=>{
     let images:any=[];
    // console.log("Waiting 500ms to ensure files are ready...");
    // await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Received files:', req.files);

if(req.files){
    // Keep Cloudinary connection "warm" on server start

    for (const file of req.files as Express.Multer.File[]) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            timeout: 30000,
          });
          images.push(result.url);
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);
          images.push(null); // Push null or handle the error gracefully
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

// Assuming req.user._id is available from auth middleware
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