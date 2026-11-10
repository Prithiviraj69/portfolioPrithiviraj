import mongoose from "mongoose"
import Profile from "../models/Profile.js"
import Project from "../models/Project.js"
import Message from "../models/Message.js"

// Home page (now includes all sections)
export const homePage = async (req, res) => {
  try {
    let profile = null
    let projects = []

    if (mongoose.connection.readyState === 1) {
      try {
        profile = await Profile.findOne().maxTimeMS(3000)
        projects = await Project.find().sort({ createdAt: -1 }).maxTimeMS(3000)
      } catch (dbErr) {
        console.warn("DB query timed out or unavailable, serving fallback data:", dbErr.message)
      }
    }

    res.render("portfolio/home", {
      title: profile ? `${profile.fullName} - Portfolio` : "Prithiviraj Elumalai - Portfolio",
      profile,
      projects,
    })
  } catch (err) {
    console.error("Error in homePage:", err)
    res.render("portfolio/home", {
      title: "Prithiviraj Elumalai - Portfolio",
      profile: null,
      projects: [],
    })
  }
}

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: "Database is connecting. Please try again in a few moments." })
    }

    await Message.create({
      name,
      email,
      subject,
      message,
    })

    res.status(200).json({ success: true, message: "Message sent successfully" })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: "Failed to send message" })
  }
}

// Keep these methods for backward compatibility or direct access
export const aboutPage = async (req, res) => {
  res.redirect("/#about")
}

export const projectsPage = async (req, res) => {
  res.redirect("/#projects")
}

export const projectPage = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })

    if (!project) {
      return res.status(404).render("404", { title: "404 - Project Not Found" })
    }

    res.render("portfolio/project-detail", {
      title: project.title,
      project,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load project details",
    })
  }
}

export const skillsPage = async (req, res) => {
  res.redirect("/#skills")
}

export const contactPage = (req, res) => {
  res.redirect("/#contact")
}
