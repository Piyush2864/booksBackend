import { v2 as cloudinary } from 'cloudinary';

import fs from 'fs'



// Configuration
cloudinary.config({
    cloud_name: 'dwc1kyrwy',
    api_key: '587661277666165',
    api_secret: 'mQHa2_jisA1e_xXhqVtCbWsEYj0' // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded successfully
        //cconsole.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        console.log(response)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed

        return null;
    }
};

export { uploadOnCloudinary }

// Upload an image
// const uploadResult = await cloudinary.uploader
//     .upload(
//         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
//     )
//     .catch((error) => {
//         console.log(error);
//     });

// console.log(uploadResult);

// // Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto'
// });

// console.log(optimizeUrl);

// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
// });

// console.log(autoCropUrl); 