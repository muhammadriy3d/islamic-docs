import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';

import "../styles/Home.scss";
import { useEffect } from 'react';

const Home = () => {
  const userLanguage = localStorage.getItem('userLanguage') || 'ar';
  const { t } = useTranslation();
  const fadeIn = useSpring({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const raise = useSpring({
    from: { transform: 'translateY(150px)' }, // Initial position (raised)
    to: { transform: 'translateY(0)' },       // Final position (lowered)
    config: { duration: 400 },              // Animation duration in milliseconds
  });

  const raiseLate = useSpring({
    from: { transform: 'translateY(250px)' }, // Initial position (raised)
    to: { transform: 'translateY(0)' },       // Final position (lowered)
    config: { duration: 500 },              // Animation duration in milliseconds
  });

  const raiseAfter = useSpring({
    from: { transform: 'translateY(300px)' }, // Initial position (raised)
    to: { transform: 'translateY(0)' },       // Final position (lowered)
    config: { duration: 550 },              // Animation duration in milliseconds
  });

  useEffect(() => {
    // After the component mounts, set the transform property to lower the element
    // fadeIn.opacity = 1;
    raise.transform = 'translateY(0)';
    raiseLate.transform = 'translateY(0)';
    raiseAfter.transform = 'translateY(0)';
  }, [raise, raiseAfter, raiseLate]); // Empty dependency array ensures it runs only once

  
  
  return (
    <div className="container">
      
      {/* Hero */}
      <animated.div style={{ ...fadeIn }} className="hero-container">
        {/* <video width="1920" height="1080" muted autoPlay>
          <source src={Hero} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <div className="content-container" dir={`${userLanguage === "ar" ? "ltr" : "rtl"}`}>
          <animated.h1 style={{ ...raise, ...fadeIn }} className={`hero-title ${userLanguage !== "ar" ? "ltr" : "rtl"}`}>{t("homePage.page_title")}</animated.h1>
          <animated.p style={{ ...raiseLate, ...fadeIn }} className={`hero-subtitle ${userLanguage !== "ar" ? "ltr" : "rtl"}`}>{t("homePage.page_subtitle")}</animated.p>
          <animated.button style={{ ...raiseAfter }} className={`hero-btn-container ${userLanguage !== "ar" ? "ltr" : "rtl"}`} onClick={() => { window.location.href = "/learn_more" }}>
            <span className="hero-btn-text">
              {t("homePage.page_button_text")}
            </span>
          </animated.button>
        </div>
      </animated.div>

      {/* Quick Access Topics */}
      <div className='topics-container' dir='auto'>
        <nav className='topics'>
          <div className='topics-list'>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.quran_link')}>القرآن الكريم</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.sunnah_link')}>السنه النبوية</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.sunnah_link')}>السنه النبوية</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.library_link')}>المكتبة</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.names_link')}>أسماء الله الحسنى</Link>
          </div>
        </nav>
      </div>
      <div className='topics-container' dir='auto'>
        <nav className='topics'>
          <div className='topics-list'>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.quran_link')}>الصيام</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.sunnah_link')}>التربية</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.sunnah_link')}>التربية</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.names_link')}>الإعجاز القرآني</Link>
          </div>
        </nav>
      </div>
      <div className='topics-container' dir='auto'>
        <nav className='topics'>
          <div className='topics-list'>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.quran_link')}>التفسير</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.sunnah_link')}>أسئلة شائعة</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.sunnah_link')}>أسئلة شائعة</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.library_link')}>الصلاة</Link>
            <Link className='topic' hrefLang={userLanguage} to={"/" + t('homePage.names_link')}>الزكاه</Link>
          </div>
        </nav>
      </div>

      {/* Pray time */}
      <div className='pray-time-container'>
        <div className='pray-time'>
          <h3 className='time-title'>إن الصلاة على المؤمنين كانت كتاباً موقوتا</h3>
          <div className='box-time'>
            <ul className='time-list'>
              <li className='time-item'>
                الفجر
                <div className='time'>05:00</div>
              </li>
              <li className='time-item'>
                الظهر
                <div className='time'>12:50</div>
              </li>
              <li className='time-item'>
                العصر
                <div className='time'>3:59</div>
              </li>
              <li className='time-item'>
                المغرب
                <div className='time'>7:00</div>
              </li>
              <li className='time-item'>
                العشاء
                <div className='time'>8:00</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Home;