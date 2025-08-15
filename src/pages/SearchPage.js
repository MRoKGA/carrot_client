// src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import '../css/Search.css';
import { FaSearch, FaCar, FaBuilding, FaUsers, FaPlay } from 'react-icons/fa';
import SearchHeader from '../components/Search/SearchHeader';
import QuickRow from '../components/Search/QuickRow';
import RecentList from '../components/Search/RecentList';

const quickItems = [
  { icon: <FaSearch />,   label: '알바'   },
  { icon: <FaCar />,      label: '중고차' },
  { icon: <FaBuilding />, label: '부동산' },
  { icon: <FaUsers />,    label: '모임'   },
  { icon: <FaPlay />,     label: '스토리' },
];

// 로컬스토리지 키
const RECENT_KEY = 'recentSearches';

// 안전 로드/세이브 유틸
const loadRecent = () => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};
const saveRecent = (arr) => {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(arr));
  } catch {/* ignore */}
};

const SearchPage = () => {
  const [query, setQuery]   = useState('');
  const [recent, setRecent] = useState([]);

  // 최초 로드
  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  // 변경 시 저장
  useEffect(() => {
    saveRecent(recent);
  }, [recent]);

  // 공통 추가 로직(중복 제거, 최신 우선, 최대 10개)
  const addRecent = (kw) => {
    const v = (kw || '').trim();
    if (!v) return;
    setRecent((prev) => {
      const next = [v, ...prev.filter((x) => x !== v)];
      return next.slice(0, 10);
    });
  };

  const removeOne = (kw) => setRecent((prev) => prev.filter((r) => r !== kw));
  const clearAll  = () => setRecent([]);

  // 퀵칩 클릭 시: 입력 채우고 최근 추가(원하면 즉시 검색 실행도 여기서)
  const handleQuickClick = (label) => {
    setQuery(label);
    addRecent(label);
    // TODO: runSearch(label);
  };

  // Enter 입력 시: 최근 추가
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addRecent(query);
      // TODO: runSearch(query);
    }
  };

  return (
    <div className="search-wrap">
      <SearchHeader
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <QuickRow items={quickItems} onClick={handleQuickClick} />

      <div className="section">
        <div className="section-title">진행 중인 이벤트</div>
        <div className="event-card">GS25 무제한 1+1 혜택</div>
      </div>

      <RecentList items={recent} onRemove={removeOne} onClear={clearAll} />
    </div>
  );
};

export default SearchPage;
