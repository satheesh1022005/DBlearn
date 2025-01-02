import { useEffect, useState } from "react";
import { viewContest } from "./contestservice";
import "./Contest.css"; // Custom CSS file to style the component
import { useNavigate } from "react-router-dom";

const Contest = () => {
  const [contest, setContest] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const fetchedContests = await viewContest();
        setContest(fetchedContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="contest-container">
      <h2 className="text-center contest-head-test">List of Labs</h2>
      <div className="row">
        {contest?.length > 0 ? (
          contest?.map((contestItem) => (
            <div key={contestItem._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{contestItem.name}</h5>
                  <p className="card-text">{contestItem.description}</p>
                  <p className="text-muted">Start Time: 06-02-2024</p>
                  <p className="text-muted">End Time: 09-02-2024</p>
                </div>
                  <button
                    className="btn btn-primary w-100 py-2"
                    onClick={() => navigate(`/test/${contestItem.id}`)}
                  >
                    View Lab
                  </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No Lab available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contest;
