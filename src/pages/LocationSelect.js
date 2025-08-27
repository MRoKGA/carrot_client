// src/pages/LocationSelect.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import locationData from '../assets/data/법정동_시도_시군구_읍면동2.json';
import backIcon from '../assets/images/back2.png';
import '../css/location.css';

const LocationSearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredList([]);
    } else {
      const filtered = locationData.filter(
        (item) =>
          item.시도명?.includes(search) ||
          item.시군구명?.includes(search) ||
          item.읍면동명?.includes(search)
      );
      setFilteredList(filtered);
    }
  }, [search]);

  useEffect(() => {
    if (!process.env.REACT_APP_KAKAO_REST_API_KEY) {
      console.warn('❗️Kakao API 키가 로드되지 않았습니다. .env 설정을 확인하세요.');
    }
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('GPS를 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
            {
              headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
              },
            }
          );

          const data = await response.json();
          const region = data.documents?.[0];

          console.log('📍 Kakao 응답 데이터:', data);

          if (region) {
            const searchKeyword = region.region_3depth_name; // 예: 회기동
            setSearch(searchKeyword); // 검색창에 자동 입력
          } else {
            alert('주소 정보를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('Kakao API 오류:', error);
          alert('위치 정보를 가져오는 데 실패했습니다.');
        }
      },
      (error) => {
        alert('GPS 접근이 거부되었습니다.');
      }
    );
  };

  const handleSelectLocation = (item) => {
    const selectedAddress = `${item.시도명} ${item.시군구명} ${item.읍면동명}`;
    console.log("선택된 주소:", selectedAddress);

    navigate('/phone', { state: { address: selectedAddress } });
  };

  return (
    <div className="location-wrapper">
      <div className="search-bar-wrapper">
        <img
          src={backIcon}
          alt="back"
          className="back-button"
          onClick={() => window.history.back()}
        />
        <input
          type="text"
          placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
          value={search}
          onChange={handleChange}
          className="search-input"
        />
      </div>

      <button className="location-button" onClick={handleGetCurrentLocation}>
        현재위치로 찾기
      </button>

      <h3 className="location-title">근처 동네</h3>
      <ul className="location-list">
        {filteredList.map((item, idx) => (
          <li
            key={idx}
            className="location-item"
            onClick={() => handleSelectLocation(item)} // ✅ 클릭 이벤트 추가
          >
            {item.시도명} {item.시군구명} {item.읍면동명}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearchPage;
