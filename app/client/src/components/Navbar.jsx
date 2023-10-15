/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import "../styles/navbar.scss";
import DropdownButton from "./DropdownButton";
import { faBars, faDownload, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import FlashNotification from './Flash';
import { useSpring, animated } from "react-spring";

const Navbar = ({ title }) => {
  const [userSelectedLanguage, setUserSelectedLanguage] = useState("");
  const { i18n, t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [show, setShow] = useState(false);
  const [clicked, setClick] = useState(false)
  const slideInLeft = useSpring({
    from: { transform: 'translateX(-50px)' },
    to: { transform: 'translateX(0)' },
    config: { duration: 300 },
  });

  const slideInRight = useSpring({
    from: { transform: 'translateX(50px)' },
    to: { transform: 'translateX(0)' },
    config: { duration: 300 },
  });
  
  useEffect(() => {
    slideInLeft.transform = 'translateX(0)';
    slideInRight.transform = 'translateX(0)';
  }, [slideInLeft, slideInRight]);

  const handleMenuClick = () => {
    setClick(!clicked);
  }

  const showNotification = (message) => {
    setNotificationMessage(message);
    setShow(true);
  };

  const copyToClipboard = async () => {
    try {
      const urlToCopy = window.location.href; // Replace with the actual URL you want to copy
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
    { img: faShareNodes, link: "share" }
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
          <animated.a style={{ ...slideInRight }} className={`brand ${isRTL ? "rtl" : "ltr"}`} href="/" draggable={false}>
            {t('navBar.brand')}
          </animated.a>
          <ul className={`ul ${clicked ? 'responsive' : ''}`}>
            {pages.map((page, i) => (
              <li className={`li ${clicked ? 'responsive' : ''}`} key={i}>
                <a className="page-link" href={page.link} draggable={false}>
                  {page.title}
                </a>
              </li>
            ))}
            <label className="lang-label" htmlFor="languages" aria-label="Choose a language"></label>
            <li className={`dropbtn ${clicked ? 'responsive' : ''}`}>
              <DropdownButton selectClass={`${clicked ? 'responsive' : ''}`} title={t("navBar.page_sections")} options={options} onSelected={handleOptionSelect} />
            </li>
          </ul>
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        copyToClipboard();
                      }
                    }}
                  >
                    <div>
                      <FontAwesomeIcon icon={faShareNodes} width={20} height={20} />
                    </div>
                  </div>
                  {show && <div className="flash-notification" role="button" onClick={() => setShow(false)} tabIndex={0} onKeyDown={() => {}}><button className="exit" onClick={() => setShow(false)}>&times;</button>{notificationMessage}</div>}
                </li>


              ) : (
                <a href={icon.link} key={i} draggable={false}>
                  <li className="navbar-item">
                    <FontAwesomeIcon icon={icon.img} width={20} height={20} />
                  </li>
                </a>
              )
            ))}
            {isRTL ? 
              <button className="navbar-item en" onClick={() => changeLanguage('en')}>E</button>
            :
              <button className="navbar-item ar" onClick={() => changeLanguage('ar')}>ع</button>
            }
          </ul>
          <animated.div style={{ ...slideInLeft }} role="button" className={`bars ${clicked ? "open" : "close"}`} tabIndex={0} onClick={handleMenuClick} onKeyDown={(e) => {
            if (e.key === 'Enter') {  
              copyToClipboard();
            }
          }}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </animated.div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
