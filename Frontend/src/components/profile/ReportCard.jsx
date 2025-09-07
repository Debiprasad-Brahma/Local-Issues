import React from 'react';
import { MapPin, Calendar, Eye } from 'lucide-react';
import ReportStatus from './ReportStatus';
import PriorityBadge from './PriorityBadge';

const ReportCard = ({ report }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            {report.location}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <ReportStatus status={report.status} />
          <PriorityBadge priority={report.priority} />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">{report.category}</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(report.dateSubmitted).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {report.views} views
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
