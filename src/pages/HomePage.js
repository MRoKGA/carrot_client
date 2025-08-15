import React, { useState, useMemo } from 'react';
import '../css/Home.css';
import ProductCard from '../components/Home/ProductCard';
import BottomTab from '../components/Home/BottomTab';
import HomeHeader from '../components/Home/HomeHeader';
import CategoryChips from '../components/Home/CategoryChips';
import FloatingMenu from '../components/Home/FloatingMenu';
import { FaPlus, FaTimes } from 'react-icons/fa';

const dummyData = [
  {
    id: 1,
    title: '에어팟 프로',
    location: '군자동',
    time: '3일 전',
    price: 220000,
    image: 'airpot.jpg',
    chatCount: 3,
    likeCount: 11,
    category: '디지털/가전',   
  },
  {
    id: 2,
    title: '바이레도 블랑쉬 50ml',
    location: '광진구 구의제3동',
    time: '26초 전',
    price: 4000,
    image: 'perfume.jpg',
    chatCount: 0,
    likeCount: 2,
    category: '뷰티/미용',      
  },
  {
    id: 3,
    title: '조립식컴퓨터',
    location: '광진구 구의제3동',
    time: '40초 전',
    price: 40000,
    image: 'computer.jpg',
    chatCount: 0,
    likeCount: 2,
    category: '디지털/가전',     
  },
];

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState('군자동');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 데이터에서 카테고리 목록 자동 생성 (중복 제거)
  const categories = useMemo(() => {
    return Array.from(new Set(dummyData.map(d => d.category)));
  }, []);

  // 선택된 카테고리에 따른 필터링
  const filtered = useMemo(() => {
    if (selectedCategory === '전체') return dummyData;
    return dummyData.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="home-wrapper">
      <HomeHeader
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* 카테고리 칩 */}
      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="product-list">
        {filtered.map(item => (
            <ProductCard key={item.id} product={item} />
        ))}
      </div>

    {/* 플로팅 버튼 */}
      <button className="floating-button" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={20} /> : <FaPlus size={20} />}
      </button>

      {/* 드롭다운 메뉴 */}
      <FloatingMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <BottomTab />
    </div>
  );
};

export default HomePage;