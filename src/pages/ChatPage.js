import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiPlus, FiPhone, FiMoreVertical } from 'react-icons/fi'; // ✅ 추가
import '../css/chat.css';

import ChatBubble from '../components/chat/ChatBubble';
import AttachmentPanel from '../components/chat/AttachmentPanel';
import ChatHeaderProduct from '../components/chat/ChatHeaderProduct';
import products from '../assets/data/products';

import ActionSheet from '../components/chat/ActionSheet'; // ✅ 추가

export default function ChatPage() {
  const nav = useNavigate();
  const { state } = useLocation();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState(state?.initMsg || '');
  const [panelOpen, setPanelOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);   // ✅ 액션시트

  const listRef = useRef(null);

  const peer = useMemo(() => {
    return state?.seller || { name: '상대방', temp: 36.5, avatar: 'avatar-default.jpg' };
  }, [state]);

  const headerProduct = useMemo(() => {
    if (!state?.productId) return null;
    return products.find(p => String(p.id) === String(state.productId)) || null;
  }, [state]);

  useEffect(() => {
    if (state?.initMsg) {
      setMessages(prev => [...prev, { id: Date.now(), mine: true, text: state.initMsg }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = () => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), mine: true, text }]);
    setText('');
    setPanelOpen(false);
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, panelOpen, headerProduct]);

  // ✅ 전화 걸기: 모바일에서 tel: 링크로 동작
  const PHONE_NUMBER = '01076294088';

  return (
    <div className="chat-wrap">
      {/* 상단바 */}
      <div className="chat-top">
        <button className="icon-btn" onClick={() => nav(-1)} aria-label="뒤로가기">
          <FiArrowLeft size={22} />
        </button>

        <div className="chat-title">
          <div className="ct-name">{peer.name}</div>
          <span className="ct-badge">
            {peer.temp?.toFixed ? `${peer.temp.toFixed(1)}°C` : '36.5°C'}
          </span>
        </div>

        <div className="chat-top-actions">
          {/* ✅ 전화: 모바일에서 바로 통화 */}
          <a
            className="icon-btn"
            href={`tel:${PHONE_NUMBER}`}
            aria-label="전화하기"
          >
            <FiPhone size={20} />
          </a>

          {/* ✅ 목록: 액션시트 열기 */}
          <button
            className="icon-btn"
            aria-label="더보기"
            onClick={() => setSheetOpen(true)}
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* 상품 정보 바 */}
      {headerProduct && <ChatHeaderProduct product={headerProduct} />}

      {/* 메시지 리스트 */}
      <div className="chat-list" ref={listRef}>
        {messages.map(m => (
          <ChatBubble
            key={m.id}
            mine={m.mine}
            text={m.text}
            seller={!m.mine ? peer : null}
          />
        ))}
      </div>

      {/* 하단 입력 + 패널 */}
      <div className={`chat-bottom ${panelOpen ? 'with-panel' : ''}`}>
        <div className="chat-input-row">
          <button
            className={`circle-btn ${panelOpen ? 'on' : ''}`}
            onClick={() => setPanelOpen(v => !v)}
            aria-label="더보기"
          >
            <FiPlus size={20} />
          </button>

          <input
            className="chat-input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="메시지 보내기"
            onFocus={() => setPanelOpen(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          />

          <button className="send-btn" onClick={send} aria-label="보내기">
            <FiSend size={18} />
          </button>
        </div>

        <AttachmentPanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          onInsertQuickText={(t)=> setText(prev => (prev ? prev + ' ' : '') + t)}
        />
      </div>

      {/* ✅ 액션시트 */}
      <ActionSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onLeave={() => {
          setSheetOpen(false);
          // TODO: 채팅방 나가기 처리
          alert('채팅방에서 나갔습니다.');
        }}
      />
    </div>
  );
}
