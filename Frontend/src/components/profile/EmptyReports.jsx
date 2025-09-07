import React from 'react';
import { AlertCircle } from 'lucide-react';

const EmptyReports = () => {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No reports submitted yet</h3>
      <p className="text-gray-600">Start reporting local issues to help improve your community.</p>
    </div>
  );
};

export default EmptyReports;
