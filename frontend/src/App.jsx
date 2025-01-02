import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Register from "./page/Register";
import FacultyRegister from "./components/register/FacultyRegister";
import StudentRegister from "./components/register/StudentRegister";
import AssignTask from "./components/task/AssignTask";
import Home from "./components/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTask from "./components/task/AddTask";
import ContestForm from "./components/ContestForm";
import ChallengeForm from "./components/ChallengeForm";
import ViewTask from "./components/task/ViewTask";
import StudentTest from "./page/StudentTest";
import Sheet from "./components/Interview/Sheet";
import SQLPlayground from "./components/SQLPlayground/SQLPlayground";
import DiscussionForum from "./components/discussion/DiscussionForum";
import Landing from "./page/Landing";
import NLPtoSQLBot from "./components/bot/Nlp2Sql";
import Project from "./page/Project";
import Contest from "./components/contest/Contest";
import Lab from "./components/Lab/Contest";
import LabForm from "./components/Lab/ContestForm";
import ErDiagramFetcher from "./components/Autonomous/ErDiagramFetcher";
import StudentProfile from "./components/profile/StudentProfile";
import StudentForm from "./components/profile/StudentForm";
import StudentFacult from "./components/home/StudentFacult";
import StudentList from "./components/home/FacultyPage";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createFaculty" element={<FacultyRegister />} />
          <Route path="/createStudent" element={<StudentRegister />} />
          <Route path="/task" element={<AssignTask />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createTask" element={<AddTask />} />
          <Route path="/contest" element={<ContestForm />} />
          <Route path="/challenge/:contestId" element={<ChallengeForm />} />
          <Route path="/view" element={<ViewTask />} />
          <Route path="/test/:id" element={<StudentTest />} />
          <Route path="/sheet" element={<Sheet />} />
          <Route path="/playground" element={<SQLPlayground />} />
          <Route path="/discussion" element={<DiscussionForum />} />
          <Route path="/nlp2sql" element={<NLPtoSQLBot />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contestList" element={<Contest />} />
          <Route path="/er" element={<ErDiagramFetcher />} />
          <Route path="/lab" element={<Lab/>}/>
          <Route path="/create/lab" element={<LabForm/>}/>
          <Route path="/profile" element={<StudentProfile/>}/>
          <Route path="/create/profile" element={<StudentForm/>}/>
          <Route path="/student/profile/:id" element={<StudentFacult />} />
          <Route path="/faculty/:id" element={<StudentList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
