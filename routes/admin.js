import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { v4 as uuidv4 } from "uuid"
import * as adminController from "../controllers/adminController.js"
import { requireAdmin } from "../middleware/authMiddleware.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|svg/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb(new Error("Only image files are allowed"))
    }
  },
})

// Apply requireAdmin middleware to all admin routes
router.use(requireAdmin)

// Dashboard route
router.get("/dashboard", adminController.dashboardPage)

// Profile routes
router.get("/profile", adminController.profilePage)
router.post("/profile", upload.any(), adminController.updateProfile)

// Projects routes
router.get("/projects", adminController.projectsPage)
router.get("/projects/add", adminController.addProjectPage)
router.post("/projects/add", upload.single("coverImage"), adminController.addProject)
router.get("/projects/edit/:id", adminController.editProjectPage)
router.post("/projects/edit/:id", upload.single("coverImage"), adminController.updateProject)
router.delete("/projects/:id", adminController.deleteProject)

// Messages routes
router.get("/messages", adminController.messagesPage)
router.patch("/messages/:id/read", adminController.markMessageAsRead)
router.delete("/messages/:id", adminController.deleteMessage)

export default router
