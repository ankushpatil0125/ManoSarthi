import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/DoctorHomePage.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminOperation = () => {
  const { t } = useTranslation("global");
  return (
    <div>
      <Header />
      {
        localStorage.getItem("ROLE")==="[ROLE_ADMIN]"? 
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
                <h4 className="no-underline">
                  {t("Actor.Add")}
                </h4>
              </div>
            </div>
          </Link>
          <Link
            to="/update-doctor-supervisor"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4>{t("Actor.Reassign")}</h4>
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
                <h4>{t("Actor.Delete")}</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>:
      <div className="container">
      <div className="card-grid">
          <Link
            to="/add-healthworker"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4 className="no-underline">
                  {t("Actor.Add HealthWorker")}
                </h4>
              </div>
            </div>
          </Link>
          <Link
            to="/update-healthworker"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4>{t("Actor.Update HealthWorker")}</h4>
              </div>
            </div>
          </Link>
          <Link
            to="/delete-healthworker"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4>{t("Actor.Delete HealthWorker")}</h4>
              </div>
            </div>
          </Link>
          <Link
            to="/show-activity-healthworker"
            style={{
              textDecoration: "none", // Remove underline
              color: "inherit", // Use the default text color
            }}
          >
            <div className="card">
              <div className="card-body">
                <h4>{t("Actor.Show Activity")}</h4>
              </div>
            </div>
          </Link>
        </div>
        </div>
      }
      
    </div>
  );
};

export default AdminOperation;




