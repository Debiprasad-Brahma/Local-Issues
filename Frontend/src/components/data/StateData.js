export const stateDataBase = {
    'Odisha': {
        totalFeedback: 1254,
        positivePercentage: 71,
        urgentCases: 42,
        topCity: 'Bhubaneswar',
        sentimentTrend: [
            { month: 'Jan', Positive: 180, Negative: 100 },
            { month: 'Feb', Positive: 240, Negative: 130 },
            { month: 'Mar', Positive: 220, Negative: 120 },
            { month: 'Apr', Positive: 280, Negative: 150 },
            { month: 'May', Positive: 360, Negative: 200 },
            { month: 'Jun', Positive: 290, Negative: 160 },
            { month: 'Jul', Positive: 320, Negative: 180 }
        ],
        categories: [
            { name: 'Roads', value: 35, color: '#60A5FA' },
            { name: 'Water', value: 25, color: '#34D399' },
            { name: 'Electricity', value: 20, color: '#FBBF24' },
            { name: 'Sanitation', value: 12, color: '#F87171' },
            { name: 'Healthcare', value: 8, color: '#A78BFA' }
        ],
        urgentReports: [
            { city: 'Cuttack', issue: 'Road is full of potholes near Andheri', urgency: 'High', date: '2024-03-15' },
            { city: 'Bhubaneswar', issue: 'Water supply disrupted in Kothrud area', urgency: 'Medium', date: '2024-03-14' },
            { city: 'Rourkela', issue: 'Street lights not working for 2 days', urgency: 'Low', date: '2024-03-13' },
            { city: 'Sambalpur', issue: 'Garbage collection delayed in residential area', urgency: 'Medium', date: '2024-03-12' }
        ]
    },
    'Gujarat': {
        totalFeedback: 890,
        positivePercentage: 68,
        urgentCases: 35,
        topCity: 'Ahmedabad',
        sentimentTrend: [
            { month: 'Jan', Positive: 120, Negative: 80 },
            { month: 'Feb', Positive: 150, Negative: 90 },
            { month: 'Mar', Positive: 140, Negative: 85 },
            { month: 'Apr', Positive: 180, Negative: 100 },
            { month: 'May', Positive: 220, Negative: 120 },
            { month: 'Jun', Positive: 200, Negative: 110 },
            { month: 'Jul', Positive: 210, Negative: 115 }
        ],
        categories: [
            { name: 'Water', value: 40, color: '#34D399' },
            { name: 'Roads', value: 25, color: '#60A5FA' },
            { name: 'Electricity', value: 18, color: '#FBBF24' },
            { name: 'Sanitation', value: 10, color: '#F87171' },
            { name: 'Healthcare', value: 7, color: '#A78BFA' }
        ],
        urgentReports: [
            { city: 'Ahmedabad', issue: 'Water quality issues in Bopal area', urgency: 'High', date: '2024-03-15' },
            { city: 'Surat', issue: 'Traffic congestion at Ring Road junction', urgency: 'Medium', date: '2024-03-14' },
            { city: 'Vadodara', issue: 'Power outage in residential colony', urgency: 'High', date: '2024-03-13' },
            { city: 'Rajkot', issue: 'Hospital staff shortage reported', urgency: 'Medium', date: '2024-03-12' }
        ]
    },
    'Karnataka': {
        totalFeedback: 1156,
        positivePercentage: 73,
        urgentCases: 38,
        topCity: 'Bangalore',
        sentimentTrend: [
            { month: 'Jan', Positive: 160, Negative: 70 },
            { month: 'Feb', Positive: 190, Negative: 85 },
            { month: 'Mar', Positive: 210, Negative: 90 },
            { month: 'Apr', Positive: 250, Negative: 105 },
            { month: 'May', Positive: 280, Negative: 120 },
            { month: 'Jun', Positive: 260, Negative: 110 },
            { month: 'Jul', Positive: 290, Negative: 125 }
        ],
        categories: [
            { name: 'Roads', value: 42, color: '#60A5FA' },
            { name: 'Electricity', value: 28, color: '#FBBF24' },
            { name: 'Water', value: 15, color: '#34D399' },
            { name: 'Sanitation', value: 10, color: '#F87171' },
            { name: 'Healthcare', value: 5, color: '#A78BFA' }
        ],
        urgentReports: [
            { city: 'Bangalore', issue: 'Metro construction causing traffic issues', urgency: 'High', date: '2024-03-15' },
            { city: 'Mysore', issue: 'Frequent power cuts in IT park area', urgency: 'Medium', date: '2024-03-14' },
            { city: 'Hubli', issue: 'Water logging during monsoon', urgency: 'High', date: '2024-03-13' },
            { city: 'Mangalore', issue: 'Waste management system improved', urgency: 'Low', date: '2024-03-12' }
        ]
    },
    'Tamil Nadu': {
        totalFeedback: 967,
        positivePercentage: 65,
        urgentCases: 41,
        topCity: 'Chennai',
        sentimentTrend: [
            { month: 'Jan', Positive: 140, Negative: 90 },
            { month: 'Feb', Positive: 160, Negative: 100 },
            { month: 'Mar', Positive: 150, Negative: 95 },
            { month: 'Apr', Positive: 180, Negative: 110 },
            { month: 'May', Positive: 200, Negative: 130 },
            { month: 'Jun', Positive: 190, Negative: 120 },
            { month: 'Jul', Positive: 210, Negative: 125 }
        ],
        categories: [
            { name: 'Water', value: 45, color: '#34D399' },
            { name: 'Roads', value: 25, color: '#60A5FA' },
            { name: 'Healthcare', value: 15, color: '#A78BFA' },
            { name: 'Electricity', value: 10, color: '#FBBF24' },
            { name: 'Sanitation', value: 5, color: '#F87171' }
        ],
        urgentReports: [
            { city: 'Chennai', issue: 'Water scarcity in suburban areas', urgency: 'High', date: '2024-03-15' },
            { city: 'Coimbatore', issue: 'Road repair work completed successfully', urgency: 'Low', date: '2024-03-14' },
            { city: 'Madurai', issue: 'Hospital equipment needs maintenance', urgency: 'Medium', date: '2024-03-13' },
            { city: 'Trichy', issue: 'Street lighting installation in progress', urgency: 'Low', date: '2024-03-12' }
        ]
    },
    'Rajasthan': {
        totalFeedback: 743,
        positivePercentage: 58,
        urgentCases: 47,
        topCity: 'Jaipur',
        sentimentTrend: [
            { month: 'Jan', Positive: 100, Negative: 120 },
            { month: 'Feb', Positive: 110, Negative: 130 },
            { month: 'Mar', Positive: 105, Negative: 125 },
            { month: 'Apr', Positive: 120, Negative: 140 },
            { month: 'May', Positive: 130, Negative: 150 },
            { month: 'Jun', Positive: 125, Negative: 145 },
            { month: 'Jul', Positive: 140, Negative: 155 }
        ],
        categories: [
            { name: 'Water', value: 50, color: '#34D399' },
            { name: 'Electricity', value: 25, color: '#FBBF24' },
            { name: 'Roads', value: 15, color: '#60A5FA' },
            { name: 'Healthcare', value: 7, color: '#A78BFA' },
            { name: 'Sanitation', value: 3, color: '#F87171' }
        ],
        urgentReports: [
            { city: 'Jaipur', issue: 'Severe water shortage in Pink City area', urgency: 'High', date: '2024-03-15' },
            { city: 'Jodhpur', issue: 'Power grid failure affecting industries', urgency: 'High', date: '2024-03-14' },
            { city: 'Udaipur', issue: 'Tourism infrastructure needs upgrade', urgency: 'Medium', date: '2024-03-13' },
            { city: 'Kota', issue: 'Educational facilities require attention', urgency: 'Medium', date: '2024-03-12' }
        ]
    }
};