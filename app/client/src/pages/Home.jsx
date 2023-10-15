import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring'

import "../styles/Home.scss";
import { useEffect } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const fadeIn = useSpring({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const raise = useSpring({
    from: { transform: 'translateY(150px)' }, // Initial position (raised)
    to: { transform: 'translateY(0)' },       // Final position (lowered)
    config: { duration: 300 },              // Animation duration in milliseconds
  });

  const raiseLate = useSpring({
    from: { transform: 'translateY(250px)' }, // Initial position (raised)
    to: { transform: 'translateY(0)' },       // Final position (lowered)
    config: { duration: 400 },              // Animation duration in milliseconds
  });

  const raiseAfter = useSpring({
    from: { transform: 'translateY(300px)' }, // Initial position (raised)
    to: { transform: 'translateY(0)' },       // Final position (lowered)
    config: { duration: 450 },              // Animation duration in milliseconds
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
      <animated.div style={{ ...fadeIn }} className="hero-container">
        {/* <video width="1920" height="1080" muted autoPlay>
          <source src={Hero} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <div className="content-container">
          <animated.h1 style={{ ...raise, ...fadeIn }} className="hero-title">{t("homePage.page_title")}</animated.h1>
          <animated.p style={{ ...raiseLate, ...fadeIn }} className="hero-subtitle">{t("homePage.page_subtitle")}</animated.p>
          <animated.button style={{ ...raiseAfter }} className="hero-btn-container" onClick={() => { window.location.href = "/learn_more" }}>
            <span className="hero-btn-text">
              {t("homePage.page_button_text")}
            </span>
          </animated.button>
        </div>
      </animated.div>
    </div>
  );
}

export default Home;