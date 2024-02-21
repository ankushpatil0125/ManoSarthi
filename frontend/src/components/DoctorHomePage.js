import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/DoctorHomePage.css";
import Header from "./Header";

function DoctorHomePage() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="card-grid">
          <div className="card">
            <div className="card-body">
              <h4>Pending</h4>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4>Ongoing</h4>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4>Treated</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorHomePage;
