import { useEffect, useState } from "react";
import { viewContest } from "./contestservice";
import "./Contest.css"; // Custom CSS file to style the component
import { useNavigate } from "react-router-dom";

const Contest = () => {
  const [main,setMainContest] = useState([]);
  const [search,setSearch] = useState('');
  const [contest, setContest] = useState([]);
  const navigate = useNavigate();
  const value=localStorage.getItem('search');
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const fetchedContests = await viewContest();
        setMainContest(fetchedContests);
        setContest(fetchedContests);
        if(value){
          setContest(fetchedContests.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
          setSearch(value);
          localStorage.removeItem('search');
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);
  return (
    <div className="contest-container">
      <h2 className="text-center contest-head-test ">List of Contests</h2>
      <div>
        <input
          type="text"
          className="form-control-search my-3 p-2 mb-4"
          placeholder="Search contests"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setContest(main.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
              setSearch('');
            }
          }
        }
        />
      </div>
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
                    View Contest
                  </button>
                </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No contests available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contest;
