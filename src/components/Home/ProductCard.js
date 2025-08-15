import React from 'react';
import { FaComment, FaHeart } from 'react-icons/fa'; // 아이콘 import
import '../../css/productCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img className="thumbnail" src={require(`../../assets/images/${product.image}`)} alt={product.title} />

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
