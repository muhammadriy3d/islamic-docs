/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';

import QuranJson from "../assets/json/quran.json";
import _002 from "../assets/audio/002.mp3";

import "../styles/verse.scss";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const QuranVerse = () => {
  const [quran, setQuran] = useState([{}]);
  const [ayat, setAyat] = useState("")
  const [ayatEn, setAyatEn] = useState("")
  const [verseName, setVerseName] = useState("")
  // const [nextVerse, setNextVerse] = useState("")
  const [verseType, setVerseType] = useState("")
  const [currentVerse, setCurrentVerse] = useState(0);
  const param = useParams();

  useEffect(() => {
    setCurrentVerse(param.verseId)
    QuranJson.map((x) => (
      (currentVerse === x.id.toPrecision()) && (
        setVerseName(x.name),
        setVerseType(x.type),
        setQuran(x.verses)
      )
      // (currentVerse + 1 === x.id.toPrecision()) && (
      //   setNextVerse(x.name)
      // )
    ))

    let aList = []
    quran.forEach(i => (
      aList.push(i.text + ` ﴿${i.id}﴾ `)
    ))
    setAyat(aList)

    let aListEn = []
    quran.forEach(i => (
      aListEn.push(i.text_en + ` ﴾${i.id}﴿ `)
    ))
    setAyatEn(aListEn)

  }, [currentVerse, param.verseId, quran])

  return (
    <>
      <div className='verse-nav'>
        <div className='quran-title' style={{ position: 'relative', zIndex: 4500 }}>
          <span>
            <Link to={"/quran"}>
              <FontAwesomeIcon icon={faArrowRightLong} style={{ transform: "translateY(3px)", paddingLeft: "8px", color: "white" }} />
            </Link>
            سوره {verseName}
          </span>
          <span>
            {verseType === "medinan" ? "مدنية" : "مكية"}
          </span>
        </div>
      </div>
      <div className='sign-container'>
        {(localStorage.getItem('userLanguage') === "ar") ? (
          <div className='signs'>
            <audio autoPlay controls lang='ar' loop style={{ width: "100%", position: 'fixed', left: 0, right: 0, bottom: "0", zIndex: 4500 }} crossOrigin='anonymous'>
              <source src={_002} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
            <p className='sign'>{ayat}</p>
          </div>
        ) : (
          <div className='signs-en'>
            <audio autoPlay controls style={{ width: "100%", position: 'fixed', left: 0, right: 0, bottom: "0", zIndex: 4500 }} crossOrigin='anonymous'>
              <source src={_002} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
            <p className='sign-en'>{ayatEn}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default QuranVerse;
