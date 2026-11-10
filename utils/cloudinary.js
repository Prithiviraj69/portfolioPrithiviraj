import { v2 as cloudinary } from "cloudinary"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload an image to Cloudinary, with automatic local fallback
 * @param {string} filePath - Path to the file to upload
 * @param {string} folder - Folder in Cloudinary to store the image
 * @returns {Promise<Object>} - Cloudinary upload result or local URL
 */
export const uploadImage = async (filePath, folder = "portfolio") => {
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: "auto",
      })
      return result
    } catch (error) {
      console.warn("Cloudinary upload failed, falling back to local storage:", error.message)
    }
  }

  // Local filesystem fallback
  try {
    const filename = path.basename(filePath)
    const targetDir = path.join(__dirname, "../public/uploads")
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    const targetPath = path.join(targetDir, filename)
    if (fs.existsSync(filePath) && filePath !== targetPath) {
      fs.copyFileSync(filePath, targetPath)
    }
    return {
      secure_url: `/uploads/${filename}`,
      public_id: filename,
    }
  } catch (err) {
    console.error("Local upload fallback error:", err)
    return {
      secure_url: `/images/default-avatar.png`,
      public_id: "default",
    }
  }
}

/**
 * Delete an image from Cloudinary or local storage
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
export const deleteImage = async (publicId) => {
  if (!publicId) return null

  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      return result
    } catch (error) {
      console.warn("Cloudinary delete error:", error.message)
    }
  }

  // Local delete fallback
  try {
    const localPath = path.join(__dirname, "../public/uploads", publicId)
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath)
    }
  } catch (err) {
    // Ignore error
  }
  return { result: "ok" }
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
