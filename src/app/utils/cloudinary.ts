/* eslint-disable no-console */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';


cloudinary.config({
    cloud_name: config.clnary_cloud_name,
    api_key: config.clnary_api_key,
    api_secret: config.clnary_api_secret,
});


export default cloudinary;
