import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const reUsables = {
  imageUpload: (req, res, next) => {
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
    });
    if (!req.file) {
      req.body.imageUrl = undefined;
      return next();
    }
    cloudinary.v2.uploader.upload(req.file.path, { use_filename: true }, ( error, result) => {
      if (result) {
        req.body.imageUrl = result.secure_url;
        return next();
      }
      res.status(500).json({
        status: 'Error',
        message: 'Image upload failed due to server error, please try again later',
        error,
      });
    });
  },
};

export default reUsables;
