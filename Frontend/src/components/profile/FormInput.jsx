import React from 'react';

const FormInput = ({ label, type = "text", value, onChange, icon: Icon, disabled = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {disabled ? (
        <div className="flex items-center gap-2 text-gray-900">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          {value}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );
};

export default FormInput;
