import React, { useState, useMemo } from 'react';
import '../css/Home.css';
import ProductCard from '../components/Home/ProductCard';
import BottomTab from '../components/Home/BottomTab';
import HomeHeader from '../components/Home/HomeHeader';
import CategoryChips from '../components/Home/CategoryChips';
import FloatingMenu from '../components/Home/FloatingMenu';
import { FaPlus, FaTimes } from 'react-icons/fa';
import products from '../assets/data/products';

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState('군자동');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(d => d.category)));
    return ['전체', ...cats];
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === '전체') return products;
    return products.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="home-wrapper">
      <HomeHeader
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

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

      <button className="floating-button" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={20} /> : <FaPlus size={20} />}
      </button>
      <FloatingMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <BottomTab />
    </div>
  );
};

export default HomePage;
