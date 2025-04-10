import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: [String],
  category: {
    type: String,
    required: true,
  },
  technologies: [String],
  techStack: [String],
  demoUrl: String,
  githubUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create slug from title
projectSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next()

  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")

  next()
})

const Project = mongoose.model("Project", projectSchema)

export default Project
