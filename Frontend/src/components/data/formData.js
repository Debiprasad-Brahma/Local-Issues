export const categories = [
    { value: 'roads', label: 'Roads & Transportation', icon: '🛣️' },
    { value: 'water', label: 'Water Supply', icon: '💧' },
    { value: 'electricity', label: 'Electricity', icon: '⚡' },
    { value: 'sanitation', label: 'Sanitation & Waste', icon: '🗑️' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'education', label: 'Education', icon: '🏫' },
    { value: 'safety', label: 'Public Safety', icon: '🚨' },
    { value: 'environment', label: 'Environment', icon: '🌱' },
    { value: 'other', label: 'Other', icon: '📋' }
];

export const priorityLevels = [
    {
        value: 'low',
        label: 'Low',
        color: 'bg-green-100 text-green-800',
        description: 'Non-urgent, can wait'
    },
    {
        value: 'medium',
        label: 'Medium',
        color: 'bg-yellow-100 text-yellow-800',
        description: 'Needs attention soon'
    },
    {
        value: 'high',
        label: 'High',
        color: 'bg-red-100 text-red-800',
        description: 'Urgent, immediate attention'
    },
    {
        value: 'critical',
        label: 'Critical',
        color: 'bg-red-200 text-red-900',
        description: 'Emergency situation'
    }
];

export const initialFormData = {
    category: '',
    priority: '',
    description: '',
    location: '',
    images: []
};
