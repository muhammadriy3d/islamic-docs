import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import "./styles/app.scss";
import NotFound from "./pages/404";

const App = () => {
  const { t } = useTranslation();

  // Define your routes with paths and components
  const routes = [
    { path: "/", element: <Home /> },
  ];

  const isNotFound = () => {
    // Get the current pathname from the window's location
    const currentPath = window.location.pathname;

    // Check if the current path matches any of your defined route paths
    return !routes.some((route) => route.path === currentPath);
  };

  useEffect(() => {
    const handleCopy = (e) => {
      const selectedText = window.getSelection().toString();
      const pageLink = window.location.href;
      const copiedTextWithLink = selectedText + ' (Source: ' + pageLink + ')';
      e.clipboardData.setData('text/plain', copiedTextWithLink);
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  // Footer sections
  const sections = [
    {
      first: [
        {
          title: [
            t('footerPage.first_section_title')
          ],
          items: [
            t('footerPage.first_section_item_1'),
            t('footerPage.first_section_item_2'),
            t('footerPage.first_section_item_3'),
            t('footerPage.first_section_item_4'),
            t('footerPage.first_section_item_5'),
          ]
        }
      ],
    },
    {
      second: [
        {
          title: [
            t('footerPage.last_section_title')
          ],
          items: [
            t('footerPage.last_section_item_1'),
            t('footerPage.last_section_item_2'),
            t('footerPage.last_section_item_3'),
            t('footerPage.last_section_item_4')
          ]
        }
      ]
    }
  ];

  return (
      isNotFound() ? (
        <Routes>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      ) : (
        <div className="App">
          <Navbar />
          <div className="fixed-navbar"></div>
          <Routes>
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
          </Routes>
          <Footer brand={t("footer.brand")} mail="name@exmail.com" fsection={sections[0].first} sdsection={sections[1].second} />
        </div>
      )
  );
}

export default App;
