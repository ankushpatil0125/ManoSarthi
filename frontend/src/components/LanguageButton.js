import React from 'react'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
const LanguageButton = () => {

  const {t,i18n} = useTranslation("global");
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
        <Dropdown >
            <Dropdown.Toggle className="bg-transparent border-white text-black" variant="secondary" id="dropdown-basic">
              {t("Select_Language")}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item href="#" onClick={()=>handleChangeLanguage("en")}>English</Dropdown.Item>
              <Dropdown.Item href="#"onClick={()=>handleChangeLanguage("hi")}>Hindi</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default LanguageButton