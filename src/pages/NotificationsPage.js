import React, { useState } from 'react';
import '../css/Notifications.css';
import NotiHeader from '../components/notifications/NotiHeader';
import NotiTabs from '../components/notifications/NotiTabs';
import ActivityList from '../components/notifications/ActivityList';
import NewPosts from '../components/notifications/NewPosts';

const chips = ['중고거래', '알바', '부동산', '중고차'];

const activityMock = [
  { id: 1, iconBg: '#FFB84D', iconEmoji: '🏆', title: '[어워즈] 4,000명이 넘는 사장님이 도전중', time: '7시간 전', moreCount: 12 },
  { id: 2, iconBg: '#FF7A00', iconEmoji: '👥', title: '드레이크님, 회기동 게이 모임 찾으시나요? 이번주의 인기 모임을 준비했어요.', time: '8일 전', moreCount: 2 },
  { id: 3, iconBg: '#FF4D4D', iconEmoji: '❤️', title: '다른 이웃이 "샤오미 미에어2" 글에 관심을 눌렀어요. 고민하는 사이 곧 팔릴지도 몰라요🥺', time: '11일 전', moreCount: 2, thumb: 'https://via.placeholder.com/60x60.png?text=IMG' },
];

export default function NotificationsPage() {
  const [tab, setTab] = useState('activity');      // 'activity' | 'new'
  const [selectedChip, setSelectedChip] = useState('중고거래');

  return (
    <div className="noti-wrap">
      <NotiHeader />

      <NotiTabs value={tab} onChange={setTab} />

      {tab === 'activity' ? (
        <ActivityList items={activityMock} />
      ) : (
        <NewPosts
          chips={chips}
          selectedChip={selectedChip}
          onSelectChip={setSelectedChip}
        />
      )}
    </div>
  );
}
