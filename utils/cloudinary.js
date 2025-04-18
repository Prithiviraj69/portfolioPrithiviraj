import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload an image to Cloudinary
 * @param {string} filePath - Path to the file to upload
 * @param {string} folder - Folder in Cloudinary to store the image
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadImage = async (filePath, folder = "portfolio") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: "auto",
    })
    return result
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    throw new Error("Failed to upload image to Cloudinary")
  }
}

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
export const deleteImage = async (publicId) => {
  if (!publicId) return null

  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error)
    throw new Error("Failed to delete image from Cloudinary")
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - Public ID or null if not a Cloudinary URL
 */
export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes("cloudinary.com")) return null

  // Extract the public ID from the URL
  // Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.ext
  const parts = url.split("/")
  const fileNameWithExt = parts[parts.length - 1]
  const fileName = fileNameWithExt.split(".")[0]
  const folder = parts[parts.length - 2]

  return `${folder}/${fileName}`
}

export default cloudinary
