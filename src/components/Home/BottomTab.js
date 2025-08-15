import React, { useState } from 'react';
import {
  FiHome,
  FiAlertCircle,
  FiMapPin,
  FiMessageSquare,
  FiUser
} from 'react-icons/fi';
import { GoHomeFill } from "react-icons/go";
import { IoChatbubbleEllipsesSharp, IoLocationSharp  } from "react-icons/io5";
import { SiLibreofficewriter } from "react-icons/si";
import { MdPerson } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import '../../css/bottomTab.css';

const BottomTab = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const tabs = [
    { id: 'home', icon: <GoHomeFill />, label: '홈' },
    { id: 'life', icon: <SiLibreofficewriter />, label: '동네생활' },
    { id: 'near', icon: <IoLocationSharp />, label: '내 근처' },
    { id: 'chat', icon: <IoChatbubbleEllipsesSharp />, label: '채팅' },
    { id: 'user', icon: <FaUser />, label: '나의 당근' }
  ];

  return (
    <div className="bottom-tab">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
          onClick={() => setSelectedTab(tab.id)}
        >
          <div className="icon">{tab.icon}</div>
          <div className="label">{tab.label}</div>
        </button>
      ))}
    </div>
  );
};

export default BottomTab;
