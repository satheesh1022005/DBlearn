import { useParams } from "react-router-dom";
import "./StudentFacult.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentFacult = ({ data }) => {
  const [tasks, setTask] = useState();
  const { id } = useParams();
  const studentList = JSON.parse(localStorage.getItem("faculty"))?.data?.studentList;
  const FacultyList = JSON.parse(localStorage.getItem("college")).facultyList;
  const student = studentList.find((student) => student._id === id);

  let info1,info;
  let qid;
  let studentInfo;
  if(student){
    info=student?.info
    qid=student._id;
  }
  if(FacultyList){
    for(let i=0;i<FacultyList.length;i++){
      for(let j=0;j<FacultyList[i].stu.length;j++){
        if(FacultyList[i].stu[j]._id===id){
          info1=FacultyList[i].stu[j];
        }
      }
  }
}
console.log(info1)
  if(info1){
    info=info1?.info;
    console.log(info);
    qid=id;
  }
  console.log(qid)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (student || FacultyList) {
          const user = await axios.post("http://localhost:3000/api/getStudentTask", {
            id: qid
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setTask(user.data.tasks);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);
  console.log(tasks);
  return (
    <section className="d-flex student-profile-back">
      <StudentSideBar info={info} user={student || info1} tasks={tasks}/>
      <StudentProgress info={info} tasks={tasks}/>
    </section>
  );
};

export default StudentFacult;


const StudentSideBar=({info,tasks,user})=>{
  console.log(info)
  return(
    <div className="student-profile-sidebar"> 
            <div className="section-student-facult student-profile-faculty">
            <h3 className="section-title-student-facult">Profile Info</h3>
            <div className="student-image-prof">
            <div className="activity-container-image">A</div>
            <div className="activity-container-student-facult">
              <strong>Name:</strong> {user?.name}
            </div>
            <div className="activity-container-student-facult">
              <strong>Email:</strong>{" "}
              {user?.email}
            </div>
            </div>
          </div>


      <div className="section-student-facult">
            <h3 className="section-title-student-facult">Activity & Achievements</h3>
            <div className="activity-container-student-facult">
              <strong>Recent Activity:</strong> {info?.activityAndAchievements?.recentActivity}
            </div>
            <div className="activity-container-student-facult">
              <strong>Leaderboard Position:</strong>{" "}
              {info?.activityAndAchievements?.leaderboardPosition}
            </div>
          </div>


          <div className="section-student-facult">
            <h3 className="section-title-student-facult">Contact & Social Links</h3>
            <div className="contact-info-student-facult">
              <div className="contact-item-student-facult">
                <strong>Phone Number:</strong> {info?.contactAndSocialLinks?.phoneNumber}
              </div>
              <div className="contact-item-student-facult">
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={info?.contactAndSocialLinks?.linkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </div>
              <div className="contact-item-student-facult">
                <strong>GitHub:</strong>{" "}
                <a
                  href={info?.contactAndSocialLinks?.githubPortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
{/* 
          <div className="section-student-facult">
            <h3 className="section-title-student-facult">Optional Information</h3>
            <div className="optional-info-student-facult">
              <div className="optional-item-student-facult">
                <strong>Location:</strong> {info?.optionalData?.location}
              </div>
              <div className="optional-item-student-facult">
                <strong>Preferred Language:</strong> {info?.optionalData?.preferredLanguage}
              </div>
              <div className="optional-item-student-facult">
                <strong>Date of Birth:</strong>{" "}
                {new Date(info?.optionalData?.dateOfBirth).toLocaleDateString()}
              </div>
            </div>
          </div> */}
    </div>
  )
}


export const StudentProgress=({info,tasks})=>{
  return(
    <>
      {info && (
        <div className="profile-container-student-facult">
          <h2 className="profile-header-student-facult">Student Profile Overview</h2>

          <div className="section-student-facult">
            <h3 className="section-title-student-faculty"> Progress Report</h3>
            <div className="courses-student-facult">
              <div className="container mt-4">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="">
                      <tr className="table-content-title">
                        <th >S.No</th>
                        <th>Task Name</th>
                        <th>Task Status</th>
                        <th>Completed Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks && tasks.length > 0 ? (
                        tasks.map((task, index) => (
                          <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task?.task?.title}</td>
                            <td>
                              <span
                                className={`badge ${task.status === "completed"
                                    ? "bg-success"
                                    : task.status === "In Progress"
                                      ? "bg-warning text-dark"
                                      : "bg-danger"
                                  }`}
                              >
                                {task.status}
                              </span>
                            </td>
                            {console.log(new Date(task.completionDate).toLocaleDateString())}
                            <td>{task.completionDate ? new Date(task.completionDate).toLocaleDateString() : "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No tasks available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="section-student-facult">
            <h3 className="section-title-student-facult">Educational  Background</h3>
            <div className="info-container-student-facult">
              <div className="info-item-student-facult">
                <strong>Current Role:</strong> {info?.educationalProfessionalBackground?.currentRole}
              </div>
              <div className="info-item-student-facult">
                <strong>Experience Level:</strong> {info?.educationalProfessionalBackground?.experienceLevel}
              </div>
              <div className="info-item-student-facult">
                <strong>Education:</strong> {info?.educationalProfessionalBackground?.education}
              </div>
            </div>
          </div> */}

        </div>
      )}
    </>
  )
}
