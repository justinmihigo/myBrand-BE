import multer from "multer";
const storage= multer.diskStorage({
    // destination: function(req,file,cb){
    //     cb(null,'../images')
    // },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
const fileFilter= (req:any,file:any,cb:any)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb({message:'Unsupported file type'}, false)
    }
}
const upload= multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024},
    fileFilter:fileFilter
});
export default upload;