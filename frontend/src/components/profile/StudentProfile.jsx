import React, { useEffect, useState } from 'react';
import './StudentProfile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const temp = {
  basicInformation: {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    username: 'john_doe',
    profilePicture: 'https://example.com/profile/johndoe.jpg',
  },
  educationalProfessionalBackground: {  
    currentRole: 'Data Analyst',
    experienceLevel: 'Intermediate',
    education: "Bachelor's in Computer Science",
  },
  platformSpecificSkillsAndProgress: {
    skills: [
      { skillName: 'SQL', proficiencyLevel: 'Advanced' },
      { skillName: 'Data Analysis', proficiencyLevel: 'Intermediate' },
    ],
    coursesEnrolled: [
      { courseName: 'Advanced SQL Techniques', progressPercentage: 75.5, status: 'Ongoing' },
      { courseName: 'Database Optimization', progressPercentage: 100, status: 'Completed' },
    ],
    certificates: [
      { certificateName: 'SQL Mastery', certificateURL: 'https://example.com/certificates/sql-mastery.pdf' },
    ],
  },
  activityAndAchievements: {
    recentActivity: "Completed the 'Database Optimization' course",
    badgesEarned: [
      { badgeName: 'SQL Pro', badgeIcon: '' },
      { badgeName: 'Top Performer', badgeIcon: '' },
    ],
    leaderboardPosition: 12,
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
};

const StudentProfile = () => {
    const[data,setData]=useState(temp);
    const[quser,setUser]=useState({
        name:'',
        email:'',
        id:""
    })
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await axios.get("http://localhost:3000/api/me", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if(user?.data.user){
                setUser({
                    name:user?.data.user.name,
                    email:user?.data.user.email,
                    id:user?.data.user._id,
                })
                setData(user?.data.user.info);
                console.log(quser)
            }
            
          } catch (err) {
            console.log(err);
          }
        };
      
        fetchUser();
      }, []);
    console.log(quser);
  return (
    <>
     <div className="profile-header">
        <div alt="Profile" className="profile-picture">{quser?.name[0]?.toUpperCase()}</div>
        <div className='profile-details'>
        <h1 className="full-name">{quser?.name} 
            <Link to="/create/profile"><div className='edit-button'>Edit Profile</div></Link>
        </h1>
        <p className="username">@{quser?.id}</p>
        <p className="email">{quser?.email}</p>
        </div>
      </div>
    <div className="profile-container">
      <div className='btn btn-secondary mb-3'><a href="/landing" className='text-white'>Go to Dashboard</a></div>

      <div className="row">
        <div className="section half-width">
          <h2 className="section-title">Professional Background</h2>
          <p><strong>Current Role:</strong> {data?.educationalProfessionalBackground?.currentRole || 'N/A'}</p>
          <p><strong>Education:</strong> {data?.educationalProfessionalBackground?.experienceLevel || 'N/A'}</p>
          <p><strong>College:</strong> {data?.educationalProfessionalBackground?.education || 'N/A'}</p>
        </div>
        <div className="section half-width">
          <h2 className="section-title">Preferences</h2>
          <p><strong>Interested Topic:</strong> {data?.preferences?.learningStyle || 'N/A'}</p>
          <p><strong>Interested Subject:</strong> {data?.preferences?.learningGoals || 'N/A'}</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Skills & Progress</h2>
        <div className="row">
          <div className="half-width">
            <h3>Skills</h3>
            <ul className='skill-list'>
              {data?.platformSpecificSkillsAndProgress?.skills?.map(skill => (
                <li key={skill.skillName} className='skill-item'>
                  {skill.skills}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Activity & Achievements</h2>
        <p><strong>Recent Activity:</strong> {data?.activityAndAchievements?.recentActivity || 'N/A'}</p>
        <p><strong>Leaderboard Position:</strong> {data?.activityAndAchievements?.leaderboardPosition || 'N/A'}</p>
        
      </div>

      <div className="row">
        <div className="section half-width">
          <h2 className="section-title">Contact & Social Links</h2>
          <p><strong>Phone Number:</strong> {data?.contactAndSocialLinks?.phoneNumber || 'N/A'}</p>
          <p>
            <strong>LinkedIn:</strong>{' '}
            <a href={data?.contactAndSocialLinks?.linkedInProfile} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{' '}
            <a href={data?.contactAndSocialLinks?.githubPortfolio} target="_blank" rel="noopener noreferrer">
              View Portfolio
            </a>
          </p>
        </div>
        <div className="section half-width">
          <h2 className="section-title">Additional Information</h2>
          <p><strong>Location:</strong> {data?.optionalData?.location || 'N/A'}</p>
          <p><strong>Preferred Language:</strong> {data?.optionalData?.preferredLanguage || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {data?.optionalData?.dateOfBirth || 'N/A'}</p>
        </div>
      </div>
    </div> 
    </>
  );
};

export default StudentProfile;
