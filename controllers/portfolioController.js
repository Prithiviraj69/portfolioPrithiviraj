import Profile from "../models/Profile.js"
import Project from "../models/Project.js"
import Message from "../models/Message.js"

// Home page (now includes all sections)
export const homePage = async (req, res) => {
  try {
    const profile = await Profile.findOne()
    const projects = await Project.find().sort({ createdAt: -1 })

    res.render("portfolio/home", {
      title: profile ? `${profile.fullName} - Portfolio` : "Portfolio",
      profile,
      projects,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load home page",
    })
  }
}

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

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
