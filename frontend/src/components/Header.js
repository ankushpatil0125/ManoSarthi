import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOGO_IMAGE } from "../utils/images";
import "../css/Header.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("User_Id")
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Navbar.Brand as={Link} to="/home">
        <img className="image" src={LOGO_IMAGE} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto custom-nav">
          <Link to="/doctor-supervisor" className="nav-link">
            {t("Actor.Doctor/Supervisor")}
          </Link>
          <div className="rounded-link mx-5">
            <LanguageButton />
          </div>
          <Link to="/doctor-profile" className="nav-link">
            {t("header.Profile")}
          </Link>
          <Link to="/" className="nav-link" onClick={handleLogout}>
            {t("login.Logout")}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
