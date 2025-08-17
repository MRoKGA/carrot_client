import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiShare2, FiMoreHorizontal, FiSend } from 'react-icons/fi';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaFlag } from 'react-icons/fa';
import '../css/ProductDetail.css';
import ImageCarousel from '../components/product/ImageCarousel';
import SellerProfile from '../components/product/SellerProfile';

import products from '../assets/data/products';              // ✅ 추가
import HorizontalList from '../components/product/HorizontalList'; // ✅ 추가

export default function ProductDetailPage() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const product = useMemo(
    () =>
      state || products.find(p => String(p.id) === String(id)) || {
        id,
        title: '상품 제목',
        location: '우리동네',
        time: '방금 전',
        price: 0,
        images: ['airpot.jpg'],
        likeCount: 0,
        chatCount: 0,
        category: '기타',
        desc: '상품 설명이 여기에 들어갑니다.',
        seller: {
          name: '판매자',
          avatar: 'avatar-default.jpg',
          region: '근처',
          score: 36.5,
        },
      },
    [state, id]
  );

  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked(v => !v);

  const [msg, setMsg] = useState('');
  const sendMessage = () => {
    if (!msg.trim()) return;
    console.log('send:', msg);
    setMsg('');
  };

  const reportPost = () => {
    const reason = window.prompt('신고 사유를 입력해 주세요.');
    if (reason && reason.trim()) alert('신고가 접수되었습니다.');
  };

  const images = Array.isArray(product.images)
    ? product.images
    : [product.image || 'airpot.jpg'];

  // ✅ 같은 판매자의 다른 물품 (현재 상품 제외)
  const sameSellerItems = useMemo(() => {
    if (!product?.seller?.name) return [];
    return products
      .filter(p => p.seller?.name === product.seller.name && p.id !== product.id)
      .slice(0, 10);
  }, [product]);

  // ✅ 같은 카테고리의 비슷한 물품 (현재 상품 제외)
  const sameCategoryItems = useMemo(() => {
    if (!product?.category) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 10);
  }, [product]);

  return (
    <div className="pd-wrap">
      {/* 상단바 */}
      <div className="pd-top">
        <button className="icon-btn" onClick={() => nav(-1)}>
          <FiArrowLeft size={22} />
        </button>
        <div className="pd-title">상세보기</div>
        <div className="pd-actions">
          <FiShare2 size={20} />
          <button className="icon-btn" onClick={reportPost} title="신고하기" style={{marginLeft: 10}}>
            <FaFlag size={18} />
          </button>
          <FiMoreHorizontal size={22} style={{ marginLeft: 10 }} />
        </div>
      </div>

      {/* 이미지 슬라이드 */}
      <ImageCarousel images={images} />

      {/* 본문 */}
      <div className="pd-body">
        <SellerProfile seller={product.seller} />

        <div className="pd-header">
          <div className="pd-h1">{product.title}</div>
          <div className="pd-meta">
            <span className="pd-loc"><FaMapMarkerAlt /> {product.location}</span>
            <span className="pd-dot">·</span>
            <span className="pd-time">{product.time}</span>
          </div>
          <div className="pd-price">{Number(product.price || 0).toLocaleString()}원</div>
          <div className="pd-stats">
            <span>채팅 {product.chatCount}</span>
            <span>관심 {product.likeCount + (liked ? 1 : 0)}</span>
            <span className="pd-cat">{product.category}</span>
          </div>
        </div>

        <div className="pd-actions-row">
          <button type="button" className="pd-ghost-btn">안전결제</button>
          <button type="button" className="pd-ghost-btn">가격 제안</button>
        </div>

        <div className="pd-desc">
          {product.desc || '판매자가 아직 상세 설명을 입력하지 않았어요.'}
        </div>
      </div>

      {/* ✅ 하단 연관 섹션들 */}
      <HorizontalList
        title={`${product.seller?.name || '판매자'}님의 판매 물품`}
        items={sameSellerItems}
      />
      <HorizontalList
        title={`비슷한 ${product.category} 물품`}
        items={sameCategoryItems}
      />

      {/* 하단 입력/하트 */}
      <div className="pd-bottom">
        <button className={`pd-like ${liked ? 'pd-like--on' : ''}`} onClick={toggleLike} aria-label="관심">
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="pd-input"
          placeholder="메시지 보내기"
          onKeyDown={(e)=>{ if(e.key==='Enter') sendMessage(); }}
        />
        <button className="pd-send" onClick={sendMessage}>
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}
