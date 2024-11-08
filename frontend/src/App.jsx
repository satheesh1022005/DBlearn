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
import QueryOptimizationBot from "./components/bot/QueryOptimizationBot";
import ErDiagramFetcher from "./components/Autonomous/ErDiagramFetcher";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/optimize" element={<QueryOptimizationBot />} />
          <Route path="/er" element={<ErDiagramFetcher />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
