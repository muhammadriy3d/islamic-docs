import { useEffect, useState } from "react";
import "../styles/navbar.scss";
import DropdownButton from "./DropdownButton";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import FlashNotification from './Flash';

const Navbar = ({ title }) => {
  const [userSelectedLanguage, setUserSelectedLanguage] = useState("");
  const { i18n, t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [show, setShow] = useState(false);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setShow(true);
  };

  const copyToClipboard = async () => {
    try {
      const urlToCopy = 'https://abc.com'; // Replace with the actual URL you want to copy
      await navigator.clipboard.writeText(urlToCopy);
      setIsCopied(true);
      showNotification("Copied to clipboard: " + urlToCopy);
    } catch (err) {
      console.error("Failed to copy to clipboard: ", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide the notification after 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, []);

  const userLanguage = localStorage.getItem('userLanguage') || 'ar';
  const isRTL = userLanguage === 'ar';

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setUserSelectedLanguage(language);
    localStorage.setItem('userLanguage', language);
  };

  const icons = [
    { img: faDownload, link: '/download' },
    { img: faShare, link: "share" }
  ];

  const options = [
    {
      title: t('navBar.page_sections_item_quran'), link: '/quran'
    },
    {
      title: t("navBar.page_sections_item_sunnah"), link: '/السنه-النبويه'
    },
  ];

  const pages = [
    { title: t('navBar.page_main'), link: "/" },
    { title: t('navBar.page_about'), link: "/about" },
    { title: t('navBar.page_vision'), link: "/our_vision" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option.link) {
      window.location.href = option.link;
    }
  };

  return (
    <div className="top-menu">
      <div className={`top-menu-container ${isRTL ? "rtl" : "ltr"}`}>
        <nav className="navbar right">
          <a className={`brand ${isRTL ? "rtl" : "ltr"}`} href="/">
            {t('navBar.brand')}
          </a>
          <ul className="ul">
            {pages.map((page, i) => (
              <li className="li" key={i}>
                <a className="page-link" href={page.link}>
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
          <label className="lang-label" htmlFor="languages" aria-label="Choose a language"></label>
          <div className="dropbtn">
            <DropdownButton title={t("navBar.page_sections")} options={options} onSelected={handleOptionSelect} />
          </div>
        </nav>
        <nav className="navbar left">
          <ul className="navbar-items">
            {icons.map((icon, i) => (
              (icon.link === "share") ? (
                <li className="navbar-item" key={i}>
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={copyToClipboard}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        copyToClipboard();
                      }
                    }}
                  >
                    <div>
                      <FontAwesomeIcon icon={faShare} width={20} height={20} />
                    </div>
                  </div>
                  {show && <div className="flash-notification">{notificationMessage}</div>}
                </li>


              ) : (
                <a href={icon.link} key={i}>
                  <li className="navbar-item">
                    <FontAwesomeIcon icon={icon.img} width={20} height={20} />
                  </li>
                </a>
              )
            ))}
            <button className="navbar-item" onClick={() => changeLanguage('en')}>EN</button>
            <button className="navbar-item" onClick={() => changeLanguage('ar')}>ع</button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
