import React from 'react';
import './StudentList.css';
import { Link, useNavigate } from 'react-router-dom';

const StudentList = ({students,flag=true}) => {
    let studentList = JSON.parse(localStorage.getItem("faculty"))?.data?.studentList;
    const navigate = useNavigate();
    if(studentList && studentList.length==0) studentList=students;
    return (
        <section className=' pt-5'>
        
        <div className="student-list-container mt-0">
            <div className="student-list-header">
                <div className="student-list-item">S.No</div>
                <div className="student-list-item">Students Name</div>
                <div className="student-list-item">Email</div>
                <div className="student-list-item">Total Course</div>
                <div className="student-list-item">Pending Task</div>
                <div className="student-list-item">Completed Task</div>
            </div>
            {
                studentList && studentList.map((student, ind) => (
                    <div className="student-list-row" key={student._id} onClick={()=>navigate(`/student/profile/${student._id}`)}>
                        <div className="student-list-item">{ind + 1}</div>
                        <div className="student-list-item">{student.name}</div>
                        <div className="student-list-item">{student.email}</div>
                        <div className="student-list-item">{student.progress.length}</div>
                        <div className="student-list-item">{student.progress.filter(task => task.status === "pending").length}</div>
                        <div className="student-list-item">{student.progress.filter(task => task.status === "completed").length}</div>
                    </div>
                )) || <div className='p-3'>No Students Found</div>
            }
        </div>
        {flag && <div className='student-add-button'>
            <Link to={"/createStudent"}><div className='student-add-button-icon'>Add Student</div></Link>
        </div>}
        </section>
    );
};

export default StudentList;
