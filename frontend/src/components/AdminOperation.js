import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/DoctorHomePage.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminOperation = () => {
  const {t} = useTranslation("global");
  return (
    <div>
      <Header />
      <div className="container">
        <div className="card-grid">
          <Link
            to="/add-doctor-supervisor"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4 className="no-underline">{t('Actor.Add Doctor/Supervisor')}</h4>
              </div>
            </div>
          </Link>
          <Link
            to="//update-doctor-supervisor"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4>{t('Actor.Update Doctor/Supervisor')}</h4>
              </div>
            </div>
          </Link>
          <Link
            to="/delete-doctor-supervisor"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4>{t('Actor.Delete Doctor/Supervisor')}</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOperation;
