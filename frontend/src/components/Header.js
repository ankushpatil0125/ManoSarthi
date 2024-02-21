import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOGO_IMAGE } from "../utils/images";
import "../css/Header.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";

const Header =() => {
  const { t } = useTranslation("global");

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <Navbar.Brand href="/home">
        <img className="image" src={LOGO_IMAGE} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto custom-nav ">
          <Nav.Link href="/Doctor">
            {t("header.Doctor")}
          </Nav.Link>
          <Nav.Link href="/Supervisor">
            {t("header.Supervisor")}
          </Nav.Link>
          <div className="rounded-link mx-5">
            <LanguageButton/>
          </div >
          <Nav.Link href="/doctor-profile">
            {t("header.Profile")}
          </Nav.Link>
          <Nav.Link href="/">
            {t("login.Logout")}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
