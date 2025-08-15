import React from 'react';
import ActivityItem from './ActivityItem';

const ActivityList = ({ items }) => {
  return (
    <div className="activity-list">
      {items.map((a) => (
        <ActivityItem key={a.id} item={a} />
      ))}
    </div>
  );
};

export default ActivityList;
