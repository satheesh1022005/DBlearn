import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HomePageHeader from "./HomePageHeader";
import HomeCard from "./HomeCard";
import add from "../../assets/add.png";
import add1 from "../../assets/add-button.png";
import contest from "../../assets/contest.png";
import StudentList from "./StudentList";
import CollegeList from "./CollegeList";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [college,setCollege] = useState();
  useEffect(() => {
    const college1 = JSON.parse(localStorage.getItem("college"));
    if(college1) setCollege(college1);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <div>
      <Navbar/>
      <HomePageHeader name={user?user?.name:"Admin "}/>
      <section className="container  text-center p-0">
        <div className="p-0 m-0 ">
          {user && (
            <div className="">
              
              {user.role === "college" && (
                <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                  <CollegeList colleges={college}/>
                  </div>
              )}
              {user.role === "faculty" && (
                <>
                <section className="d-flex align-items-center justify-content-center gap-3 bg-light pb-5">
                  <HomeCard source={contest} title={"Add Lab"} link={"/create/lab"}/>
                  <HomeCard source={add} title={"Assign Task"} link={"/task"}/>
                  <HomeCard source={contest} title={"Create contest"} link={"/contest"}/>
                </section>
                <div className="bg-white">
                <StudentList/>
                </div>
                </>
              )}
              {user.role === "student" && (
                <section>
                  <button
                    className="btn btn-primary mt-3 px-4 py-2"
                    onClick={() => navigate("/view")}
                  >
                    ViewTask
                  </button>
                  <button
                    className="btn btn-primary mt-3 px-4 py-2"
                    onClick={() => navigate("/contestList")}
                  >
                    ViewContest
                  </button>
                  <button
                    className="btn btn-primary mt-3 px-4 py-2"
                    onClick={() => navigate("/sheet")}
                  >
                    Interview Sheet
                  </button>
                </section>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
