import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <div className="landing">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
            <p className=" display-1">
              <b>
                <b>Create</b>{" "}
                <span className="text-warning">
                  <b>Report</b>
                </span>{" "}
                <b>APP</b>
              </b>
            </p>

            <div>
              <Link to={"/reports"}>
                <button className="btn btn-success">
                  Creat Eligibility Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
