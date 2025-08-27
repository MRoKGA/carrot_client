import React, { useEffect } from 'react';
import {
  FiSmile, FiSlash, FiFlag, FiSearch, FiBellOff, FiTrash2
} from 'react-icons/fi';
import '../../css/actionSheet.css';

export default function ActionSheet({ open, onClose, onLeave }) {
  // 바텀시트 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="sheet-dim" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div className="sheet-group">
          <SheetItem icon={<FiSmile />}   label="매너 평가하기" onClick={()=>alert('매너 평가')} />
          <SheetItem icon={<FiSlash />}   label="차단하기"     onClick={()=>alert('차단되었습니다')} />
          <SheetItem icon={<FiFlag />}    label="신고하기"     onClick={()=>alert('신고 접수')} />
        </div>

        <div className="sheet-group">
          <SheetItem icon={<FiSearch />}  label="검색하기"     onClick={()=>alert('채팅 검색')} />
          <SheetItem icon={<FiBellOff />} label="알림끄기"     onClick={()=>alert('알림 끔')} />
          <SheetItem
            danger
            icon={<FiTrash2 />}
            label="채팅방 나가기"
            onClick={onLeave}
          />
        </div>

        <button className="sheet-cancel" onClick={onClose}>취소</button>
      </div>
    </div>
  );
}

function SheetItem({ icon, label, onClick, danger }) {
  return (
    <button className={`sheet-item ${danger ? 'danger' : ''}`} onClick={onClick}>
      <span className="sheet-ico">{icon}</span>
      <span className="sheet-lab">{label}</span>
    </button>
  );
}
