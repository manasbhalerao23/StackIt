import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

(async () => {
    try {
      console.log("Warming up Cloudinary...");
      await cloudinary.api.ping(); // Test API
      console.log("Cloudinary is ready!");
    } catch (err) {
      console.error("Cloudinary Warm-up Failed:", err);
    }
  })();

export default cloudinary;

export const uploadOnCloudinary= async (localFilePath:any)=>{
try{
   
    if(!localFilePath)return;


   const response=  await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })
console.log("file is uploaded on cloudinary "+response.url);
return response



}catch(err){
fs.unlinkSync(localFilePath)
return null;
}

}


export const deleteImage = async (imageUrl:string) => {
  try {
    
    const publicId = imageUrl?.split('/')?.pop()?.split('.')[0]; 
    if(!publicId){
      throw new Error("Invalid Image URL");
    }
     await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};