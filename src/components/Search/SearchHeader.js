// src/components/Search/SearchHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const SearchHeader = ({ placeholder = '근처에서 검색', value, onChange, onKeyDown, onClose }) => {
  const nav = useNavigate();
  const close = onClose ?? (() => nav(-1));

  return (
    <div className="search-top">
      <button className="icon-btn" onClick={() => nav(-1)}>
        <FiArrowLeft size={22} />
      </button>
      <input
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <button className="text-btn" onClick={close}>닫기</button>
    </div>
  );
};

export default SearchHeader;
