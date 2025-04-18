import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "/images/default-avatar.png",
  },
  avatarCloudinaryId: {
    type: String,
  },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
      description: String,
    },
  ],
  experience: [
    {
      position: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  skills: [
    {
      name: String,
      category: {
        type: String,
        enum: ["FRONT-END", "BACK-END", "CLOUD", "OTHER"],
      },
      icon: String,
      cloudinaryId: String,
    },
  ],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    email: String,
    whatsapp: String,
  },
  resumeUrl: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Profile = mongoose.model("Profile", profileSchema)

export default Profile
