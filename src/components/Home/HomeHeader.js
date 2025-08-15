// src/components/Home/HomeHeader.js
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { AiFillCaretDown, AiOutlineBell } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import '../../css/Home.css';
import { useNavigate } from 'react-router-dom';

const locations = ['군자동', '화양동', '자양동', '내 동네 설정'];

const HomeHeader = ({ selectedLocation, setSelectedLocation }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    setDropdownOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="home-header" ref={wrapperRef}>
      <div className="location-wrapper2">
        <span className="location" onClick={toggleDropdown}>
          {selectedLocation} <IoIosArrowDown />
        </span>
        {dropdownOpen && (
          <div className="dropdown">
            {locations.map(loc => (
              <div
                key={loc}
                className={`dropdown-item ${loc === selectedLocation ? 'selected' : ''}`}
                onClick={() => handleSelect(loc)}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header-icons">
        <FiMenu
        size={25}
        style={{ color: 'white', cursor: 'pointer' }}
        onClick={() => navigate('/services')}
        />
        <FiSearch
          size={25}
          style={{ marginLeft: 10, color: 'white', cursor: 'pointer' }}
          onClick={() => navigate('/search')}          
        />
        <AiOutlineBell
        size={25}
        style={{ marginLeft: 10, color: 'white', cursor: 'pointer' }}
        onClick={() => navigate('/news')}
        />
      </div>
    </div>
  );
};

export default HomeHeader;
