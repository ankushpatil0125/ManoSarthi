import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOGO_IMAGE } from "../../utils/images";
import "../../css/Header.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("User_Id");
    navigate("/");
  };

  const role = localStorage.getItem("ROLE");

  const handleLogoClick = () => {
    if (role === "[ROLE_ADMIN]") {
      navigate("/admin-home");
    } else if (role === "[ROLE_DOCTOR]") {
      navigate("/doctor-home");
    } else if (role === "[ROLE_SUPERVISOR]") {
      navigate("/supervisor-home");
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Navbar.Brand as={Link} to="/home" onClick={handleLogoClick}>
        <img className="image" src={LOGO_IMAGE} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto custom-nav">
          {role === "[ROLE_ADMIN]" && (
            <Link to="/admin-home" className="nav-link">
              {t("header.Home")}
            </Link>
          )}
          {role === "[ROLE_DOCTOR]" && (
            <Link to="/doctor-home" className="nav-link">
              {t("header.Home")}
            </Link>
          )}
          {role === "[ROLE_SUPERVISOR]" && (
            <Link to="/supervisor-home" className="nav-link">
              {t("header.Home")}
            </Link>
          )}
          {role === "[ROLE_DOCTOR]" && (
            <Link to="/doctor-dashboard" className="nav-link">
              {t("header.Dashboard")}
            </Link>
          )}
          {role === "[ROLE_SUPERVISOR]" && (
            <Link to="/healthworker-home" className="nav-link">
              {t("Actor.HealthWorker")}
            </Link>
          )}
          <div className="mr-12">
            <LanguageButton />
          </div>
          {role !== "[ROLE_ADMIN]" && (
            <Link to="/profile" className="nav-link">
              {t("header.Profile")}
            </Link>
          )}
          <Link to="/" className="nav-link" onClick={handleLogout}>
            {t("login.Logout")}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;



