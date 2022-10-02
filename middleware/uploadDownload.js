import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
      destination: (req,file,callback) => callback(null, './images'),
      filename: (req,file,callback) => callback(null, file.originalname)
    }),
    fileFilter: (req,file,callback) => {
      const canUpload = ["image/png","image/jpg","image/jpeg","application/pdf"].some(type => file.mimetype === type)
      if (canUpload) {
        callback(null,true)
      } else {
        callback(null,false)
        return callback(new Error('File type not Allowed. please upload image files and pdf only'))
      }
    },
    limits:{fileSize: (1 * 1024 * 1024)} 
  }).fields([{name : 'file'},{name : 'foto'}])

export default {
    upload
}