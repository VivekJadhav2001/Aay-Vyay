// import { API_PATHS } from "./apiPaths.js";
// import axiosInstance from "./axiosInstance.js";

// const uploadImage = async (imageFile) => {
//     const formData = new FormData();
//     //Append image file to form data
//     formData.append('image', imageFile);

//     try {
//         const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {   // UPLOAD_IMAGE refer apiPaths.js
//             headers: {
//                 'Content-Type': 'multipart/form-data', //Set header for file upload
//             },
//         })
//         return response.data //Return Response data
//     } catch (error) {
//         console.error('Error uploading the image', error)
//         throw error // ReThrow error for handlilng
//     }
// }

// export default uploadImage