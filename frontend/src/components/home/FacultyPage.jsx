import { useParams } from "react-router-dom";
import StudentList from "./StudentList";
import "./HomeCard.css"
const FacultyPage = () => {
    const {id} = useParams();
    const college = JSON.parse(localStorage.getItem("college"));
    const facultyList=college?.facultyList?.filter(item=>item.faculty._id===id);
    console.log(facultyList[0]?.stu)
    return (
        <div className="college-faculty-page">
            <h1>Students List</h1>
            <div className="college-faculty-list">
            <StudentList students={facultyList[0]?.stu} flag={false}/>
            </div>
        </div>
    );      

}
export default FacultyPage;