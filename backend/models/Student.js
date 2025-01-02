const mongoose = require('mongoose');



const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  progress: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
      status: { type: String, enum: ['pending', 'in-progress', 'completed'] },
      completionDate: { type: Date }
    }
  ],
  info: {
    educationalProfessionalBackground: {
      currentRole: { type: String },
      experienceLevel: {
        type: String
      },
      education: { type: String }
    },
    platformSpecificSkillsAndProgress: {
      skills: [
        {
          skillName: { type: String },
          proficiencyLevel: {
            type: String
          },
          skills:{
            type:String
          }
        }
      ],
      coursesEnrolled: [
        {
          courseName: { type: String },
          progressPercentage: { type: Number, default: 0 },
          status: {
            type: String
          }
        }
      ],
      certificates: [
        {
          certificateName: { type: String },
          certificateURL: { type: String } // URL to the certificate
        }
      ]
    },
    activityAndAchievements: {
      recentActivity: { type: String },
      badgesEarned: [
        {
          badgeName: { type: String },
          badgeIcon: { type: String } // URL to the badge icon
        }
      ],
      leaderboardPosition: { type: String }
    },
    preferences: {
      learningStyle: { type: String },
      learningGoals: { type: String }
    },
    contactAndSocialLinks: {
      phoneNumber: { type: String },
      linkedInProfile: { type: String }, // URL
      githubPortfolio: { type: String } // URL
    },
    optionalData: {
      location: { type: String },
      preferredLanguage: { type: String },
      dateOfBirth: { type: Date }
    }
  },
    createdAt: { type: Date, default: Date.now }
  });


module.exports = mongoose.model('Student', studentSchema);