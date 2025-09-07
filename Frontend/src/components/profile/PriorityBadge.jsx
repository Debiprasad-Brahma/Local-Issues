import React from 'react';

const PriorityBadge = ({ priority }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
      {priority} Priority
    </div>
  );
};

export default PriorityBadge;
