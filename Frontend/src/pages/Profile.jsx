import React, { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInformation from '../components/profile/ProfileInformation';
import ReportsList from '../components/profile/ReportsList';
import { userData, reportsData } from '../components/data/userData';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(userData);
  const [tempUserInfo, setTempUserInfo] = useState(userData);
  const [reports] = useState(reportsData);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <ProfileHeader />
        
        <ProfileInformation
          userInfo={userInfo}
          tempUserInfo={tempUserInfo}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onInputChange={handleInputChange}
        />
        
        <ReportsList reports={reports} />
      </div>
    </div>
  );
}
