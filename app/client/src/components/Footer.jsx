import { useTranslation } from "react-i18next";
import "../styles/footer.scss";

const Footer = ({ fsection, sdsection, brand, mail }) => {
  const { t } = useTranslation();

  return (
    <div className="bottom-menu-container" dir="auto">
      <div className="footer-container">
        <div className="site-details">
          {/* LOGO */}
          <h3 className="brand">{brand}</h3>
          <p>
            {t('homePage.page_subtitle')}
          </p>
          <br />
          <div className="contact-ways">
            <p className="contact-us">{t('footer.contact_text')}: {mail}</p>
            <p className="support">{t('footer.support')}: {mail}</p>
            <p className="donations">{t('footer.donation')}: {mail}</p>
          </div>
        </div>
        <div className="vline"></div>
        {fsection.map((x, s) => (
          <nav className="start-section">
            <h3 className="footer-section-title" key={s}>{x.title}</h3>
            <ul className="footer-section-items">
              {x.items.map((j, ij) => (
                <li className="footer-section-item" key={ij}>{j}</li>
              ))}
            </ul>
          </nav>
        ))}
        {sdsection.map((x, s) => (
          <nav className="end-section">
            <h3 className="footer-section-title" key={s}>{x.title}</h3>
            <ul className="footer-section-items">
              {x.items.map((j, ij) => (
                <li className="footer-section-item" key={ij}>{j}</li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="credits">
        <p>{t('footer.ownership')} © 2023 {brand}. {t('footer.copyrights')}.</p>
      </div>
    </div>
  );
}

export default Footer;