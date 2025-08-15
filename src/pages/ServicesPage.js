import React from 'react';
import '../css/Services.css';
import ServicesHeader from '../components/services/ServicesHeader';
import ServicesSection from '../components/services/ServiceSection';
import {
  FaBagShopping, FaMagnifyingGlass, FaCar, FaBuilding, FaUsers, FaRegCalendarCheck,
  FaPlay, FaWonSign, FaGift, FaPersonWalking, FaStore, FaBullhorn,
  FaShirt, FaTruckMoving, FaBroom, FaHammer
} from 'react-icons/fa6';

const sections = [
  {
    title: '동네 거래',
    items: [
      { icon: <FaBagShopping />, label: '중고거래' },
      { icon: <FaMagnifyingGlass />,      label: '알바' },
      { icon: <FaBuilding />,    label: '부동산' },
      { icon: <FaCar />,         label: '중고차' },
    ],
  },
  {
    title: '동네 이야기',
    items: [
      { icon: <FaUsers />,            label: '동네생활' },
      { icon: <FaRegCalendarCheck />, label: '동네행사' },
      { icon: <FaUsers />,            label: '모임' },
      { icon: <FaPlay />,             label: '스토리' },
    ],
  },
  {
    title: '금융/혜택',
    items: [
      { icon: <FaWonSign />, label: '당근페이' },
      { icon: <FaGift />,    label: '선물가게' },
      { icon: <FaBullhorn />,label: '혜택미션' },
      { icon: <FaPersonWalking />, label: '동네걷기' },
    ],
  },
  {
    title: '나의 비즈니스',
    items: [
      { icon: <FaStore />,   label: '비즈프로필' },
      { icon: <FaBullhorn />,label: '광고' },
    ],
  },
  {
    title: '동네 전문가 찾기',
    items: [
      { icon: <FaShirt />,       label: '세탁소' },
      { icon: <FaUsers />,       label: '취미/클래스' },
      { icon: <FaTruckMoving />, label: '이사/용달' },
      { icon: <FaBroom />,       label: '청소' },
      { icon: <FaHammer />,      label: '시공' },
    ],
  },
];

export default function ServicesPage() {
  const handleItemClick = (item) => {
    // TODO: 라우팅/검색 연결
    // 예: if (item.label === '중고거래') navigate('/market');
    console.log('service click:', item.label);
  };

  return (
    <div className="services-wrap">
      <ServicesHeader />

      <div className="services-body">
        {sections.map((sec) => (
          <ServicesSection
            key={sec.title}
            title={sec.title}
            items={sec.items}
            onItemClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
}
