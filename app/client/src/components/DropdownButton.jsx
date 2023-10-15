import React, { useEffect, useState, useRef } from 'react';
import "../styles/dropdown.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft, faL } from '@fortawesome/free-solid-svg-icons';

const DropdownButton = ({ title, options }) => {
  const [selected, onSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    onSelect(!selected);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleDropdown();
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(false); // Close the dropdown when an item is selected

    // Add your custom action here
    console.log(`Selected option: ${option.title}`);
    // You can perform any action here, such as making an API request, setting state, or other logic
  };

  useEffect(() => {
    // Add a click event listener to the document to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onSelect(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="select-container" ref={dropdownRef}>
      <button
        className="select"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-expanded={selected}
        aria-haspopup="listbox"
      >
        <span className='select-text'>{title}</span>
        {selected ? (
          <FontAwesomeIcon icon={faCaretLeft} />
          ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {selected && (
        <ul className={`options ${selected ? 'open' : ''}`} role="listbox" aria-label="Options">
          {options.map((option, i) => (
            <li
              key={i}
              className="option"
              onClick={() => handleOptionSelect(option.title)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleOptionSelect(option.title);
                }
              }}
              tabIndex={0} // Make the list item focusable
              role="option"
              aria-selected={option.title === selectedOption}
            >
              <a className="option-text" href={option.link}>{option.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
