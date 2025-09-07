import React from 'react';
import ReportCard from './ReportCard';
import EmptyReports from './EmptyReports';

const ReportsList = ({ reports }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Reports</h2>
            <p className="text-sm text-gray-600">{reports.length} reports submitted</p>
          </div>
        </div>
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))
          ) : (
            <EmptyReports />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsList;
