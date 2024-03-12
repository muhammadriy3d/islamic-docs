import React, { useEffect, useState } from 'react';
import QuranJson from "../assets/json/quran.json";

import "../styles/quran.scss";
import { Link } from 'react-router-dom';

const Quran = () => {
  const [quran, setQuran] = useState([{}]);

  useEffect(() => {
    setQuran(QuranJson)
  }, [])

  const handleVerseClick = (id) => {
    localStorage.setItem('verseId', id);

  }

  return (
    <div>
      <div className='verses-container'>
        <div className='verse-nav'>
          <div className='quran-title'>
            الفهرس
          </div>
        </div>
        {quran.map((x, y) => (
          <Link to={`/القرآن_الكريم/verse/${x.id}`}>
            <div className='verses' key={y} onClick={() => { handleVerseClick(x.id) }} tabIndex={0} role='button' onKeyDown={() => { }}>
              <h3 className='verse-name'>{x.name}</h3>
              <p className='verses-total'>{x.type === "meccan" ? "مكية" : "مدنية"}, عدد آياتها {x.total_verses}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Quran;
