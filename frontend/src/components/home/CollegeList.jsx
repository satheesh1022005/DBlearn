import { Link, useNavigate } from "react-router-dom";

const CollegeList = ({ colleges }) => {
    const navigate = useNavigate();
    console.log(colleges)
    return (
            <section className=' pt-5'>
            
            <div className="student-list-container mt-0">
                <div className="student-list-header">
                    <div className="student-list-item">S.No</div>
                    <div className="student-list-item">Faculty Name</div>
                    <div className="student-list-item">Email</div>
                    <div className="student-list-item">Total Contest</div>
                    <div className="student-list-item">Tasks</div>
                    <div className="student-list-item">Total Students</div>
                </div>
                {
                    colleges && colleges.facultyList.map((student, ind) => (
                        <div className="student-list-row" key={student._id} onClick={()=>navigate(`/faculty/${student.faculty._id}`)}>
                            <div className="student-list-item">{ind + 1}</div>
                            <div className="student-list-item">{student.faculty.name}</div>
                            <div className="student-list-item">{student.faculty.email}</div>
                            <div className="student-list-item">{student.faculty.contest.length}</div>
                            <div className="student-list-item">{student.faculty.tasks.length}</div>
                            <div className="student-list-item">{student.faculty.students.length}</div>
                        </div>
                    )) || <div className='p-3'>No Students Found</div>
                }
            </div>
            <div className='student-add-button'>
                <Link to={"/createFaculty"}><div className='student-add-button-icon'>Add Faculty</div></Link>
            </div>
            </section>
    );
}

export default CollegeList;