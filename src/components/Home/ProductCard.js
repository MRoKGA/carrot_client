import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaHeart } from 'react-icons/fa';
import '../../css/productCard.css';

const ProductCard = ({ product }) => {
  const nav = useNavigate();

  const goDetail = () => {
    nav(`/product/${product.id}`, { state: product }); // 상품 데이터 함께 전달
  };

  return (
    <div className="product-card" onClick={goDetail}>
      <img
        className="thumbnail"
        src={require(`../../assets/images/${product.images[0]}`)} // 무조건 첫 번째 이미지
        alt={product.title}
      />
      <div className="info">
        <div className="title">
          {product.title}
          <span className="badge">{product.category}</span>
        </div>
        <div className="subinfo">{product.location} · {product.time}</div>
        <div className="price">{product.price.toLocaleString()}원</div>
        <div className="extra">
          {product.chatCount > 0 && (
            <span><FaComment size={12} style={{ marginRight: 4 }} />{product.chatCount}</span>
          )}
          {product.likeCount > 0 && (
            <span><FaHeart size={12} style={{ marginRight: 4 }} />{product.likeCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
