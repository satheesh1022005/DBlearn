import React, { useState } from 'react';
import './StudentForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const [data, setData] = useState({
    educationalProfessionalBackground: {
      currentRole: '',
      experienceLevel: '',
      education: '',
    },
    platformSpecificSkillsAndProgress: {
      skills: [{ skillName: '', proficiencyLevel: '' }],
      coursesEnrolled: [{ courseName: '', progressPercentage: '', status: '' }],
      certificates: [{ certificateName: '', certificateURL: '' }],
    },
    activityAndAchievements: {
      recentActivity: '',
      badgesEarned: [{ badgeName: '', badgeIcon: '' }],
      leaderboardPosition: '',
    },
    preferences: {
      learningStyle: '',
      learningGoals: '',
    },
    contactAndSocialLinks: {
      phoneNumber: '',
      linkedInProfile: '',
      githubPortfolio: '',
    },
    optionalData: {
      location: '',
      preferredLanguage: '',
      dateOfBirth: '',
    },
  });

  const [step, setStep] = useState(1);

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      setData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: prevData[section][field].map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item
          ),
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    }
  };

  const handleNext = () => {
    if (step <= 5) setStep(step + 1);
    console.log(data)
  };
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };
  const navigate=useNavigate();
  const handleSubmit=async()=>{
      console.log(data);
      try{
        const user=await axios.post('http://localhost:3000/api/setInfo',data,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(user);
        navigate('/profile');

      }catch(error){
        console.log(error);
      }
  }
  return (
    <div className="multistep-form">
      <h1 className='profile-form-title'>Update User Profile</h1>
      
      {step === 1 && (
        <div className="form-section">
          <h2>Educational & Professional Background</h2>
          <input
            type="text"
            value={data.educationalProfessionalBackground.currentRole}
            onChange={(e) =>
              handleChange('educationalProfessionalBackground', 'currentRole', e.target.value)
            }
            placeholder="Current Role"
          />
          <input
            type="text"
            value={data.educationalProfessionalBackground.experienceLevel}
            onChange={(e) =>
              handleChange('educationalProfessionalBackground', 'experienceLevel', e.target.value)
            }
            placeholder="Education"
          />
          <input
            type="text"
            value={data.educationalProfessionalBackground.education}
            onChange={(e) =>
              handleChange('educationalProfessionalBackground', 'education', e.target.value)
            }
            placeholder="College"
          />
        </div>
      )}

      {/* Platform-Specific Skills & Progress */}
      {step === 2 && (
        <div className="form-section">
          <h2>Platform-Specific Skills & Progress</h2>
          
          {data.platformSpecificSkillsAndProgress.skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                onChange={(e) =>
                  handleChange('platformSpecificSkillsAndProgress', 'skills', e.target.value, index)
                }
                placeholder="Skill Name"
              />
              {/* <input
                type="text"
                value={skill.proficiencyLevel}
                onChange={(e) =>
                  handleChange(
                    'platformSpecificSkillsAndProgress',
                    'proficiencyLevel',
                    e.target.value,
                    index
                  )
                }
                placeholder="Proficiency Level"
              /> */}
            </div>
          ))}
          
          {/* Add more skills dynamically */}
          <button
            onClick={() =>
              setData((prevData) => ({
                ...prevData,
                platformSpecificSkillsAndProgress: {
                  ...prevData.platformSpecificSkillsAndProgress,
                  skills: [...prevData.platformSpecificSkillsAndProgress.skills, { skillName: '', proficiencyLevel: '' }],
                },
              }))
            }
          >
            Add More Skills
          </button>

          {/* Add other platform-specific sections similarly */}
        </div>
      )}

      {/* Activity and Achievements */}
      {step === 3 && (
        <div className="form-section">
          <h2>Activity & Achievements</h2>
          <input
            type="text"
            value={data.activityAndAchievements.recentActivity}
            onChange={(e) =>
              handleChange('activityAndAchievements', 'recentActivity', e.target.value)
            }
            placeholder="Completed Course"
          />
          <input
            type="text"
            value={data.activityAndAchievements.leaderboardPosition}
            onChange={(e) =>
              handleChange('activityAndAchievements', 'leaderboardPosition', e.target.value)
            }
            placeholder="Achievements"
          />
        </div>
      )}

      {/* Preferences */}
      {step === 4 && (
        <div className="form-section">
          <h2>Preferences</h2>
          <input
            type="text"
            value={data.preferences.learningStyle}
            onChange={(e) => handleChange('preferences', 'learningStyle', e.target.value)}
            placeholder="Interested Topic"
          />
          <input
            type="text"
            value={data.preferences.learningGoals}
            onChange={(e) => handleChange('preferences', 'learningGoals', e.target.value)}
            placeholder="Interested Subject"
          />
        </div>
      )}

      {/* Contact & Social Links */}
      {step === 5 && (
        <div className="form-section">
          <h2>Contact & Social Links</h2>
          <input
            type="text"
            value={data.contactAndSocialLinks.phoneNumber}
            onChange={(e) =>
              handleChange('contactAndSocialLinks', 'phoneNumber', e.target.value)
            }
            placeholder="Phone Number"
          />
          <input
            type="text"
            value={data.contactAndSocialLinks.linkedInProfile}
            onChange={(e) =>
              handleChange('contactAndSocialLinks', 'linkedInProfile', e.target.value)
            }
            placeholder="LinkedIn Profile"
          />
          <input
            type="text"
            value={data.contactAndSocialLinks.githubPortfolio}
            onChange={(e) =>
              handleChange('contactAndSocialLinks', 'githubPortfolio', e.target.value)
            }
            placeholder="GitHub Portfolio"
          />
        </div>
      )}

      {/* Optional Data */}
      {step === 6 && (
        <div className="form-section">
          <h2>Optional Data</h2>
          <input
            type="text"
            value={data.optionalData.location}
            onChange={(e) => handleChange('optionalData', 'location', e.target.value)}
            placeholder="Location"
          />
          <input
            type="text"
            value={data.optionalData.preferredLanguage}
            onChange={(e) => handleChange('optionalData', 'preferredLanguage', e.target.value)}
            placeholder="Preferred Language"
          />
          <label>Date of Birth</label>
          <input
            type="date"
            value={data.optionalData.dateOfBirth}
            onChange={(e) => handleChange('optionalData', 'dateOfBirth', e.target.value)}
            placeholder="Date of Birth"
          />
        </div>
      )}

      <div className="navigation-buttons">
        {step > 1 && <button onClick={handlePrevious} className="prev-button">Previous</button>}
        {step < 6 && (
          <button onClick={handleNext} className="next-button">Next</button>
        ) }
         {step === 6 && (
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
