import { useTranslation } from "react-i18next";
import "../styles/404.scss";

const NotFound = () => {
  const { t } = useTranslation();
  const userLanguage = localStorage.getItem("userLanguage") || "ar";

  return (
    <div className="np-container">
      <div className="just-line"></div>
      <div className="np-detail">
        <h3 className="np-title">404. <span className="np-span">{t('notFound.page_title')}</span></h3>
        <p className="np-describe">{t('notFound.page_describe')}</p>
        <button className={`hero-btn-container ${userLanguage !== "ar" ? "ltr" : "rtl"}`} onClick={() => { window.location.href = "/" }}>
          <span className="hero-btn-text">
            {t("notFound.page_button_text")}
          </span>
        </button>
      </div>
      <img className="nfc-meme" src="https://i.imgflip.com/82ttdm.jpg" alt="memecatwith404" title="made at imgflip.com" width={300} />

    </div>
  );
}

export default NotFound;