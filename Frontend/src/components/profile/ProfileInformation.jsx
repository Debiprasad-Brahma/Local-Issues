import React from 'react';
import { Edit2, Save, X, MapPin, Mail, User } from 'lucide-react';
import FormInput from './FormInput';


const ProfileInformation = ({ userInfo, tempUserInfo, isEditing, onEdit, onSave, onCancel, onInputChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <FormInput
              label="Full Name"
              value={isEditing ? tempUserInfo.name : userInfo.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              icon={User}
              disabled={!isEditing}
            />
            <FormInput
              label="Email Address"
              type="email"
              value={isEditing ? tempUserInfo.email : userInfo.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              icon={Mail}
              disabled={!isEditing}
            />
            <FormInput
              label="Phone Number"
              type="tel"
              value={isEditing ? tempUserInfo.phone : userInfo.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          {/* Location Info */}
          <div className="space-y-4">
            <FormInput
              label="Country"
              value={isEditing ? tempUserInfo.country : userInfo.country}
              onChange={(e) => onInputChange('country', e.target.value)}
              disabled={!isEditing}
            />
            <FormInput
              label="State"
              value={isEditing ? tempUserInfo.state : userInfo.state}
              onChange={(e) => onInputChange('state', e.target.value)}
              disabled={!isEditing}
            />
            <FormInput
              label="District"
              value={isEditing ? tempUserInfo.district : userInfo.district}
              onChange={(e) => onInputChange('district', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          {/* Address Info - Full Width */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="City"
              value={isEditing ? tempUserInfo.city : userInfo.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              disabled={!isEditing}
            />
            <FormInput
              label="ZIP Code"
              value={isEditing ? tempUserInfo.zipCode : userInfo.zipCode}
              onChange={(e) => onInputChange('zipCode', e.target.value)}
              disabled={!isEditing}
            />
            <FormInput
              label="Street Address"
              value={isEditing ? tempUserInfo.address : userInfo.address}
              onChange={(e) => onInputChange('address', e.target.value)}
              icon={MapPin}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
