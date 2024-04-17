import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

const LanguageButton = () => {
  const { t, i18n } = useTranslation('global');

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang); // Store selected language in localStorage
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage); // Set language on component mount
    }
  }, [i18n]);

  return (
    <div>
      <Dropdown className="mr-5">
        <Dropdown.Toggle className="bg-transparent border-white text-white" id="dropdown-basic">
          {t('Select_Language')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleChangeLanguage('en')}>English</Dropdown.Item>
          <Dropdown.Item onClick={() => handleChangeLanguage('hi')}>Hindi</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LanguageButton;
