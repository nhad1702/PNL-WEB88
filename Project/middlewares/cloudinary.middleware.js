import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

console.log('Cloudinary Config:', cloudinary.config());

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'task-uploads',
        allowed_formats: ['pdf', 'docx', 'zip', 'rar', 'txt'],
        resource_type: 'auto',
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

export { upload };