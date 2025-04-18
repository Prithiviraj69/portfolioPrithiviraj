import path from "path"
import { fileURLToPath } from "url"
import Profile from "../models/Profile.js"
import Project from "../models/Project.js"
import Message from "../models/Message.js"
import { uploadImage, deleteImage, getPublicIdFromUrl } from "../utils/cloudinary.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper function to create a slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

// Helper function to generate a unique slug
const generateUniqueSlug = async (title) => {
  let slug = createSlug(title)
  const existingProject = await Project.findOne({ slug })

  // If a project with this slug already exists, append a timestamp
  if (existingProject) {
    const timestamp = Date.now().toString().slice(-4)
    slug = `${slug}-${timestamp}`
  }

  return slug
}

// Dashboard page
export const dashboardPage = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments()
    const messageCount = await Message.countDocuments()
    const unreadMessageCount = await Message.countDocuments({ read: false })

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      projectCount,
      messageCount,
      unreadMessageCount,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load dashboard",
    })
  }
}

// Profile page
export const profilePage = async (req, res) => {
  try {
    let profile = await Profile.findOne()

    if (!profile) {
      profile = {
        fullName: "",
        title: "",
        bio: "",
        avatar: "/images/default-avatar.png",
        education: [],
        experience: [],
        skills: [],
        socialLinks: {
          github: "",
          linkedin: "",
          twitter: "",
          email: "",
        },
        resumeUrl: "",
      }
    }

    res.render("admin/profile", {
      title: "Edit Profile",
      profile,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load profile page",
    })
  }
}

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      title,
      bio,
      aboutMe,
      education,
      experience,
      skills,
      skillsToDelete,
      github,
      linkedin,
      twitter,
      email,
      whatsapp,
      resumeUrl,
    } = req.body

    let profile = await Profile.findOne()

    // Group files by field name
    const files = {}
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        files[file.fieldname] = file
      })
    }

    // Parse skills data
    const skillsData = JSON.parse(skills)
    const processedSkills = []

    // Process each skill
    for (const skill of skillsData) {
      const skillData = {
        name: skill.name,
        category: skill.category,
        icon: skill.icon,
      }

      // Check if there's a file upload for this skill
      const fileKey = `skillIcon${skill.index}`
      if (files[fileKey]) {
        const file = files[fileKey]

        // Upload to Cloudinary
        const result = await uploadImage(file.path, "portfolio/skills")

        // Update the skill icon path with Cloudinary URL
        skillData.icon = result.secure_url

        // Store the public_id for future reference
        skillData.cloudinaryId = result.public_id
      } else if (skill.icon === "data:new-upload") {
        // This means there was a file input but no actual file was selected
        // Keep the existing icon if available
        if (profile && profile.skills) {
          const existingSkill = profile.skills.find((s) => s.name === skill.name)
          if (existingSkill) {
            skillData.icon = existingSkill.icon
            skillData.cloudinaryId = existingSkill.cloudinaryId
          } else {
            skillData.icon = "/images/skills/default.png"
          }
        } else {
          skillData.icon = "/images/skills/default.png"
        }
      }

      processedSkills.push(skillData)
    }

    // Delete skill icons that were removed
    if (skillsToDelete) {
      const deletedPaths = JSON.parse(skillsToDelete)
      for (const iconPath of deletedPaths) {
        // Check if it's a Cloudinary URL
        const publicId = getPublicIdFromUrl(iconPath)
        if (publicId) {
          await deleteImage(publicId)
        }
      }
    }

    const profileData = {
      fullName,
      title,
      bio,
      aboutMe,
      education: JSON.parse(education),
      experience: JSON.parse(experience),
      skills: processedSkills,
      socialLinks: {
        github,
        linkedin,
        twitter,
        email,
        whatsapp,
      },
      resumeUrl,
      updatedAt: Date.now(),
    }

    if (files.avatar) {
      // Upload avatar to Cloudinary
      const result = await uploadImage(files.avatar.path, "portfolio/avatars")
      profileData.avatar = result.secure_url
      profileData.avatarCloudinaryId = result.public_id

      // Delete old avatar from Cloudinary if it exists
      if (profile && profile.avatarCloudinaryId && !profile.avatar.includes("default-avatar")) {
        await deleteImage(profile.avatarCloudinaryId)
      }
    }

    if (profile) {
      profile = await Profile.findOneAndUpdate({}, profileData, { new: true })
    } else {
      profile = await Profile.create(profileData)
    }

    res.status(200).json({ success: true, profile })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

// Projects page
export const projectsPage = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })

    res.render("admin/projects", {
      title: "Manage Projects",
      projects,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load projects page",
    })
  }
}

// Add project page
export const addProjectPage = (req, res) => {
  res.render("admin/add-project", { title: "Add Project" })
}

// Add project
export const addProject = async (req, res) => {
  try {
    const { title, description, category, techStack, demoUrl, githubUrl, featured } = req.body

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Cover image is required" })
    }

    // Create a safe split function that handles undefined values
    const safeSplit = (str) => {
      if (!str) return []
      return str.split(",").map((item) => item.trim())
    }

    // Generate a unique slug from the title
    const slug = await generateUniqueSlug(title)

    // Upload cover image to Cloudinary
    const result = await uploadImage(req.file.path, "portfolio/projects")

    try {
      const project = await Project.create({
        title,
        slug,
        description,
        coverImage: result.secure_url,
        coverImageCloudinaryId: result.public_id,
        category,
        technologies: req.body.technologies ? safeSplit(req.body.technologies) : [],
        techStack: safeSplit(techStack),
        demoUrl,
        githubUrl,
        featured: featured === "true",
      })

      res.status(201).json({ success: true, project })
    } catch (err) {
      // If project creation fails, delete the uploaded image
      if (result && result.public_id) {
        await deleteImage(result.public_id)
      }
      console.warn(err)
      res.status(400).json({ success: false, message: err.message })
    }
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

// Edit project page
export const editProjectPage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).render("404", { title: "404 - Project Not Found" })
    }

    res.render("admin/edit-project", {
      title: `Edit Project: ${project.title}`,
      project,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load edit project page",
    })
  }
}

// Update project
export const updateProject = async (req, res) => {
  try {
    const { title, description, category, techStack, demoUrl, githubUrl, featured } = req.body

    // Create a safe split function that handles undefined values
    const safeSplit = (str) => {
      if (!str) return []
      return str.split(",").map((item) => item.trim())
    }

    // Get the current project to check if title has changed
    const currentProject = await Project.findById(req.params.id)

    // Only generate a new slug if the title has changed
    let slug = currentProject.slug
    if (currentProject.title !== title) {
      slug = await generateUniqueSlug(title)
    }

    const projectData = {
      title,
      slug,
      description,
      category,
      technologies: req.body.technologies ? safeSplit(req.body.technologies) : [],
      techStack: safeSplit(techStack),
      demoUrl,
      githubUrl,
      featured: featured === "true",
      updatedAt: Date.now(),
    }

    if (req.file) {
      // Upload new cover image to Cloudinary
      const result = await uploadImage(req.file.path, "portfolio/projects")
      projectData.coverImage = result.secure_url
      projectData.coverImageCloudinaryId = result.public_id

      // Delete old cover image from Cloudinary
      if (currentProject && currentProject.coverImageCloudinaryId) {
        await deleteImage(currentProject.coverImageCloudinaryId)
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true })

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }

    res.status(200).json({ success: true, project })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }

    // Delete cover image from Cloudinary
    if (project.coverImageCloudinaryId) {
      await deleteImage(project.coverImageCloudinaryId)
    }

    // Delete project images from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const image of project.images) {
        const publicId = getPublicIdFromUrl(image)
        if (publicId) {
          await deleteImage(publicId)
        }
      }
    }

    await Project.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

// Messages page
export const messagesPage = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.render("admin/messages", {
      title: "Messages",
      messages,
    })
  } catch (err) {
    console.error(err)
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load messages page",
    })
  }
}

// Mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" })
    }

    res.status(200).json({ success: true, message })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" })
    }

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(400).json({ success: false, message: err.message })
  }
}
