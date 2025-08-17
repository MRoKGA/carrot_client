import React from 'react';
import MiniProductCard from './MiniProductCard';
import '../../css/horizontalList.css';

export default function HorizontalList({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <section className="hlist-wrap">
      <div className="hlist-head">
        <h3>{title}</h3>
        {/* 필요 시 우측에 더보기 버튼 추가 가능 */}
      </div>
      <div className="hlist-row">
        {items.map(it => <MiniProductCard key={it.id} item={it} />)}
      </div>
    </section>
  );
}
