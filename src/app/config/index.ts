import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  clnary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  clnary_api_key: process.env.CLOUDINARY_API_KEY,
  clnary_api_secret: process.env.CLOUDINARY_API_SECRET
};
