import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Local storage setup
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/election_results");

    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Cloudinary storage setup
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: any) => ({
    folder: "election_results", // Cloudinary folder name
    format: file.mimetype.split("/")[1], // Automatically determine format based on file type
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, // File name without extension
    resource_type: "auto", // Automatically detect resource type
  }),
});

// Configure Multer to use both storage engines
export const uploadElectionResult = multer({storage:cloudinaryStorage}).single("file");
