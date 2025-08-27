import React, { useState } from 'react';
import {
  FiImage, FiCamera, FiMapPin, FiGift, FiCreditCard, FiCalendar, FiPackage
} from 'react-icons/fi';
import '../../css/attachmentPanel.css';

// 자주 쓰는 문구 버튼형
const QuickPhrases = ({ onPick }) => {
  const items = ['안녕하세요! 혹시 판매완료일까요?', '직거래 가능할까요?', '네고 가능할까요?', '오늘 거래 가능해요.'];
  return (
    <div className="ap-quick">
      {items.map((t, i) => (
        <button key={i} className="qpill" onClick={()=>onPick(t)}>{t}</button>
      ))}
    </div>
  );
};

export default function AttachmentPanel({ open, onClose, onInsertQuickText }) {
  const [tab, setTab] = useState('grid'); // grid | quick

  return (
    <div className={`ap-wrap ${open ? 'open' : ''}`}>
      <div className="ap-grabber" onClick={onClose} />
      <div className="ap-tabs">
        <button
          className={`ap-tab ${tab==='grid'?'on':''}`}
          onClick={()=>setTab('grid')}
        >메뉴</button>
        <button
          className={`ap-tab ${tab==='quick'?'on':''}`}
          onClick={()=>setTab('quick')}
        >자주쓰는문구</button>
      </div>

      {tab === 'grid' ? (
        <div className="ap-grid">
          <GridItem icon={<FiImage />} label="앨범"    onClick={()=>alert('앨범 열기')} />
          <GridItem icon={<FiCamera />} label="카메라"  onClick={()=>alert('카메라 열기')} />
          <GridItem icon={<FiMapPin />} label="장소"    onClick={()=>alert('장소 전송')} />
          <GridItem icon={<FiCalendar />} label="약속"  onClick={()=>alert('약속 잡기')} />
          <GridItem icon={<FiCreditCard />} label="당근페이" onClick={()=>alert('결제 수단')} />
          <GridItem icon={<FiPackage />} label="편의점택배" onClick={()=>alert('택배 보내기')} />
          <GridItem icon={<FiGift />} label="선물하기" onClick={()=>alert('선물하기')} />
        </div>
      ) : (
        <QuickPhrases onPick={onInsertQuickText} />
      )}

      <div className="ap-safe" />
    </div>
  );
}

function GridItem({ icon, label, onClick }) {
  return (
    <button className="ap-item" onClick={onClick}>
      <div className="ap-ico">{icon}</div>
      <div className="ap-lab">{label}</div>
    </button>
  );
}
