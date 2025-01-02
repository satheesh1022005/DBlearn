import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";
import DoubtClarificationBot from "../components/bot/DoubtClarificationBot";
import bot from "../assets/bot.webp";
import Home from "../components/home/Home";
import chat from "../assets/chat.png";
import axios from "axios";
function Landing() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showBot, setShowBot] = useState(false); // State to control bot visibility
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get("http://localhost:3000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        localStorage.setItem('faculty', JSON.stringify(user));
        localStorage.setItem('college', JSON.stringify(user.data));
        console.log(user.data.user)
        if (user?.user?.data)
          localStorage.setItem('user', JSON.stringify(user?.user?.data));
        setUser(user?.user?.data);
        setUser(user?.data?.user)
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  return (
    <>
      {user?.role == "student" ? (
        <div className="landing-container">
          <div className="sidebar">
            <div className="logo">
              <span className="logo-icon">&#128204;</span>
            </div>
            <ul>
              <li>
                <Link to="/landing">
                  <div>Dashboard</div>
                </Link>
              </li>
              <li>
                <Link to="/view">
                  <div>Courses</div>
                </Link>
              </li>
              <li>
                <Link to="/contestList">
                  <div>Contest</div>
                </Link>
              </li>
              <li>
                <Link to="/lab">
                  <div>Labs</div>
                </Link>
              </li>
              <li>
                <Link to="/playground">
                  <div>Playground</div>
                </Link>
              </li>
              <li>
                <Link to="/sheet">
                  <div>SQL sheet</div>
                </Link>
              </li>
              <li>
                <Link to="/discussion">
                  <div>Discussion</div>
                </Link>
              </li>
              <li>
                <Link to="/project">
                  <div>Project</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="main">
            <div className="header">
              <input type="text" placeholder="Search"
               onChange={(e)=>setSearch(e.target.value)}
               onKeyDown={(e) => {
                if (e.key === "Enter") {
                  localStorage.setItem("search", search);
                  navigate("/contestList");
                }
              }} />
              <div className="header-right">
                <div className="dropdown">
                  <a href="/profile" className="dropdown-toggle">
                    Profile {user?.name}
                  </a>
                  <a href="/" className="text-danger fw-bold">
                    Logout
                  </a>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="dashboard">
                <div className="dashboard-title">
                  <div className="title-text">Dashboard</div>
                  <div className="title-time">
                    Last Updated on 04/11/2024 03:30 PM
                  </div>
                </div>
                <div className="user-profile">
                  <div className="user-image">{user?.name[0]?.toUpperCase()}</div>
                  <div className="user-info">
                    <div className="user-name"><span>Name :</span> {user?.name}</div>
                    <div className="user-email"><span>Email :</span> {user?.email}</div>
                    <div className="user-details">
                      <div><span>Course :</span> SQL Learning</div>
                    </div>
                  </div>
                </div>
                <div className="stats">
                  <div className="stat-item">
                    <div className="stat-title">Total Courses</div>
                    <div className="stat-value">{user?.progress.length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value">{user?.progress.filter((item) => item.status === "completed").length}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-title">In Progress</div>
                    <div className="stat-value">{user?.progress.filter((item) => item.status === "pending").length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bot-icon" onClick={toggleBot}>
            {!showBot && <img src={bot} alt="bot" width="75px" height="75px" />}
          </div>

          {/* Bot Component */}
          {showBot && <DoubtClarificationBot setShowBot={setShowBot} />}
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}

export default Landing;
