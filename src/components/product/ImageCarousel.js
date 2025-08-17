// src/components/product/ImageCarousel.jsx
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../css/imageCarousel.css';

export default function ImageCarousel({ images = [] }) {
  const [idx, setIdx] = useState(0);
  const len = images.length || 1;

  const prev = () => setIdx((i) => (i - 1 + len) % len);
  const next = () => setIdx((i) => (i + 1) % len);

  const src = (name) => {
    try {
      return require(`../../assets/images/${name}`);
    } catch {
      // 외부 URL 혹은 fallback
      return name.startsWith('http') ? name : require(`../../assets/images/${images[0]}`);
    }
  };

  return (
    <div className="car-wrap">
      <img className="car-img" src={src(images[idx])} alt={`img-${idx}`} />
      {len > 1 && (
        <>
          <button className="car-nav car-prev" onClick={prev}><FaChevronLeft /></button>
          <button className="car-nav car-next" onClick={next}><FaChevronRight /></button>
          <div className="car-dots">
            {images.map((_, i) => (
              <span key={i} className={`car-dot ${i===idx?'on':''}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
