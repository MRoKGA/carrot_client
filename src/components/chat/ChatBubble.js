import React from 'react';
import '../../css/chat.css';

export default function ChatBubble({ mine, text, seller }) {
  const avatarSrc = (() => {
    try {
      return require(`../../assets/images/${seller?.avatar || 'avatar-default.jpg'}`);
    } catch {
      return require(`../../assets/images/avatar-default.jpg`);
    }
  })();

  return (
    <div className={`bubble-row ${mine ? 'mine' : ''}`}>
      {!mine && <img className="bubble-avatar" src={avatarSrc} alt={seller?.name || '상대방'} />}
      <div>
        {!mine && <div className="bubble-name">{seller?.name || '상대방'}</div>}
        <div className="bubble">{text}</div>
        <div className="time">오후 4:46</div>
      </div>
    </div>
  );
}
