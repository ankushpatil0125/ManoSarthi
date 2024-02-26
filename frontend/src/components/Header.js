import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOGO_IMAGE } from "../utils/images";
import "../css/Header.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";
import { useNavigate } from "react-router-dom";

const Header =() => {
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const handleLogout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("ROLE");
    navigate("/login");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Navbar.Brand href="/home">
        <img className="image" src={LOGO_IMAGE} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto custom-nav ">
          <Nav.Link href="/doctor-supervisor">
            {t("Actor.Doctor/Supervisor")}
          </Nav.Link>
          <div className="rounded-link mx-5">
            <LanguageButton/>
          </div >
          <Nav.Link href="/doctor-profile">
            {t("header.Profile")}
          </Nav.Link>
          <Nav.Link href="/" onClick={handleLogout}>
            {t("login.Logout")}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
