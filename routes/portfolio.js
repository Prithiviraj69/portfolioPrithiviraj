import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import * as portfolioController from "../controllers/portfolioController.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Main route - one page portfolio
router.get("/", portfolioController.homePage)

// Direct resume download route
router.get("/resume", (req, res) => {
  const resumePath = path.join(__dirname, "../public/docs/Prithiviraj_Elumalai_Resume.pdf")
  res.download(resumePath, "Prithiviraj_Elumalai_Resume.pdf", (err) => {
    if (err) {
      res.redirect("/docs/Prithiviraj_Elumalai_Resume.pdf")
    }
  })
})

// Legacy routes - redirect to sections
router.get("/about", portfolioController.aboutPage)
router.get("/projects", portfolioController.projectsPage)
router.get("/skills", portfolioController.skillsPage)
router.get("/contact", portfolioController.contactPage)

// Project detail page - still separate
router.get("/projects/:slug", portfolioController.projectPage)

// Contact form submission
router.post("/contact", portfolioController.submitContact)

export default router
