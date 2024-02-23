import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dzb4gvhwk",
  api_key: process.env.CLOUDINARY_API_KEY || '613863594475792',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'yUgzBJsM-4E7CHsk1OyL5-RTGJM',
});

export default cloudinary;

// const image="./images/image2-new.jpg";
// (async function run(){
//     try{
//         const result= await cloudinary.uploader.upload(image);
//     console.log(result.secure_url);
//     }
//     catch(error){
//         console.log(error);
//     }
// })()