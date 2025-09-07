import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import streamlit as st
from datetime import datetime, timedelta
import random
import time

# Set page config
st.set_page_config(page_title="Feedback Dashboard", layout="wide")

# Generate demo dataset
@st.cache_data
def generate_demo_data():
    # Indian states
    states = ['Maharashtra', 'Gujarat', 'Kerala', 'Rajasthan', 'Tamil Nadu', 
              'Karnataka', 'West Bengal', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar']
    
    # Cities for each state
    cities_map = {
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
        'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
        'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
        'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
        'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
        'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
        'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
        'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur']
    }
    
    categories = ['Roads', 'Water', 'Electricity', 'Sanitation', 'Healthcare']
    sentiments = ['Positive', 'Negative', 'Neutral']
    urgency_levels = ['Low', 'Medium', 'High']
    
    # Generate feedback data
    data = []
    for _ in range(1254):  # Total feedback count from the image
        state = random.choice(states)
        city = random.choice(cities_map[state])
        category = random.choice(categories)
        sentiment = random.choice(sentiments)
        urgency = random.choice(urgency_levels)
        
        # Generate date within last 7 months
        start_date = datetime.now() - timedelta(days=210)
        random_days = random.randint(0, 210)
        date = start_date + timedelta(days=random_days)
        
        # Generate issue summary based on category
        issue_summaries = {
            'Roads': ['Road is full of potholes', 'Street lights not working', 'Traffic congestion issue'],
            'Water': ['Water supply has improved', 'No water for 3 days', 'Water quality is poor'],
            'Electricity': ['Power outage in the neighborhood', 'Frequent power cuts', 'New transformer installed'],
            'Sanitation': ['Garbage not collected for 3 days', 'Clean streets maintained well', 'Sewage overflow problem'],
            'Healthcare': ['New clinic opened nearby', 'Doctor unavailable', 'Medicine shortage at hospital']
        }
        
        issue = random.choice(issue_summaries[category])
        
        data.append({
            'state': state,
            'city': city,
            'category': category,
            'sentiment': sentiment,
            'urgency': urgency,
            'date': date,
            'issue_summary': issue,
            'month': date.strftime('%b')
        })
    
    return pd.DataFrame(data)

# Load data
df = generate_demo_data()
print(f"Generated {len(df)} records of feedback data." ,df)

# Sidebar filters
st.sidebar.header("Filters")

# State filter
selected_states = st.sidebar.multiselect(
    "Select States",
    options=df['state'].unique(),
    default=df['state'].unique()
)

# Date range filter
min_date = df['date'].min().date()
max_date = df['date'].max().date()
date_range = st.sidebar.date_input(
    "Select Date Range",
    value=(min_date, max_date),
    min_value=min_date,
    max_value=max_date
)

# Sentiment filter
selected_sentiments = st.sidebar.multiselect(
    "Select Sentiment",
    options=['Positive', 'Negative', 'Neutral'],
    default=['Positive', 'Negative', 'Neutral']
)

# Filter data based on selections
filtered_df = df[
    (df['state'].isin(selected_states)) &
    (df['date'].dt.date >= date_range[0]) &
    (df['date'].dt.date <= date_range[1]) &
    (df['sentiment'].isin(selected_sentiments))
]

# Dashboard Title
st.title("📊 Feedback Dashboard")
st.markdown("---")

# Top metrics row
col1, col2, col3, col4 = st.columns(4)

with col1:
    total_feedback = len(filtered_df)
    st.metric("Total Feedback", f"{total_feedback:,}")

with col2:
    pos_count = len(filtered_df[filtered_df['sentiment'] == 'Positive'])
    neg_count = len(filtered_df[filtered_df['sentiment'] == 'Negative'])
    if total_feedback > 0:
        pos_ratio = pos_count / (pos_count + neg_count) if (pos_count + neg_count) > 0 else 0
        st.metric("Positive / Negative", f"{pos_ratio:.1%}")
    else:
        st.metric("Positive / Negative", "0%")

with col3:
    urgent_cases = len(filtered_df[filtered_df['urgency'] == 'High'])
    urgent_percentage = (urgent_cases / total_feedback * 100) if total_feedback > 0 else 0
    st.metric("Urgent Cases", f"{urgent_percentage:.0f}%")

with col4:
    if total_feedback > 0:
        top_state = filtered_df['state'].value_counts().index[0]
        st.metric("Top State", top_state)
    else:
        st.metric("Top State", "N/A")

st.markdown("---")

# Main dashboard row
col1, col2 = st.columns([1, 1])

with col1:
    st.subheader("State-wise Sentiment & Urgency")
    
    # Create state-wise summary
    state_summary = filtered_df.groupby(['state', 'sentiment']).size().unstack(fill_value=0)
    state_urgency = filtered_df.groupby(['state', 'urgency']).size().unstack(fill_value=0)
    
    # Create a combined view
    if not state_summary.empty:
        # Sentiment map (simplified representation)
        fig_map = go.Figure()
        
        for state in filtered_df['state'].unique():
            state_data = filtered_df[filtered_df['state'] == state]
            total_state = len(state_data)
            positive = len(state_data[state_data['sentiment'] == 'Positive'])
            negative = len(state_data[state_data['sentiment'] == 'Negative'])
            urgent = len(state_data[state_data['urgency'] == 'High'])
            
            # Create bar chart for states
            fig_map.add_trace(go.Bar(
                name=state,
                x=[state],
                y=[total_state],
                text=f"P:{positive} N:{negative} U:{urgent}",
                textposition='auto',
                hovertemplate=f"<b>{state}</b><br>Total: {total_state}<br>Positive: {positive}<br>Negative: {negative}<br>Urgent: {urgent}<extra></extra>"
            ))
        
        fig_map.update_layout(
            title="Feedback Distribution by State",
            xaxis_title="States",
            yaxis_title="Number of Feedbacks",
            showlegend=False,
            height=400
        )
        
        st.plotly_chart(fig_map, use_container_width=True)

with col2:
    st.subheader("Sentiment Trend")
    
    # Monthly sentiment trend
    if not filtered_df.empty:
        monthly_sentiment = filtered_df.groupby(['month', 'sentiment']).size().unstack(fill_value=0)
        
        fig_trend = go.Figure()
        
        months_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        
        if 'Positive' in monthly_sentiment.columns:
            fig_trend.add_trace(go.Scatter(
                x=months_order,
                y=[monthly_sentiment.loc[m, 'Positive'] if m in monthly_sentiment.index else 0 for m in months_order],
                mode='lines+markers',
                name='Positive',
                line=dict(color='#10B981', width=3),
                marker=dict(size=8)
            ))
        
        if 'Negative' in monthly_sentiment.columns:
            fig_trend.add_trace(go.Scatter(
                x=months_order,
                y=[monthly_sentiment.loc[m, 'Negative'] if m in monthly_sentiment.index else 0 for m in months_order],
                mode='lines+markers',
                name='Negative',
                line=dict(color='#F97316', width=3),
                marker=dict(size=8)
            ))
        
        fig_trend.update_layout(
            title="Monthly Sentiment Trend",
            xaxis_title="Month",
            yaxis_title="Number of Feedbacks",
            height=400,
            hovermode='x unified'
        )
        
        st.plotly_chart(fig_trend, use_container_width=True)

# Second row
col1, col2 = st.columns([1, 1])

with col1:
    st.subheader("Top Categories")
    
    if not filtered_df.empty:
        category_counts = filtered_df['category'].value_counts()
        
        # Create donut chart
        fig_donut = go.Figure(data=[go.Pie(
            labels=category_counts.index,
            values=category_counts.values,
            hole=.3,
            marker_colors=['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        )])
        
        fig_donut.update_layout(
            title="Feedback Distribution by Category",
            height=400,
            showlegend=True,
            legend=dict(orientation="v", yanchor="middle", y=0.5, xanchor="left", x=1.02)
        )
        
        st.plotly_chart(fig_donut, use_container_width=True)

with col2:
    st.subheader("Recent Urgent Reports")
    
    # Filter urgent cases and sort by date
    urgent_reports = filtered_df[filtered_df['urgency'] == 'High'].sort_values('date', ascending=False).head(10)
    
    if not urgent_reports.empty:
        # Create a styled dataframe
        display_df = urgent_reports[['state', 'city', 'issue_summary', 'urgency', 'date']].copy()
        display_df['date'] = display_df['date'].dt.strftime('%Y-%m-%d')
        display_df.columns = ['State', 'City', 'Issue Summary', 'Urgency Level', 'Date']
        
        # Style the dataframe
        def highlight_urgency(val):
            if val == 'High':
                return 'background-color: #FEE2E2; color: #DC2626'
            elif val == 'Medium':
                return 'background-color: #FEF3C7; color: #D97706'
            else:
                return 'background-color: #ECFDF5; color: #059669'
        
        styled_df = display_df.style.applymap(highlight_urgency, subset=['Urgency Level'])
        st.dataframe(styled_df, use_container_width=True, height=400)
    else:
        st.info("No urgent reports found for the selected filters.")

# Additional insights section
st.markdown("---")
st.subheader("📈 Key Insights")

col1, col2, col3 = st.columns(3)

with col1:
    if not filtered_df.empty:
        # Most common issue category
        top_category = filtered_df['category'].value_counts().index[0]
        top_category_count = filtered_df['category'].value_counts().iloc[0]
        st.info(f"**Most Reported Issue:** {top_category} ({top_category_count} reports)")

with col2:
    if not filtered_df.empty:
        # Sentiment distribution
        sentiment_dist = filtered_df['sentiment'].value_counts()
        if 'Positive' in sentiment_dist.index and 'Negative' in sentiment_dist.index:
            pos_pct = sentiment_dist['Positive'] / (sentiment_dist['Positive'] + sentiment_dist['Negative']) * 100
            if pos_pct >= 60:
                st.success(f"**Overall Sentiment:** Positive ({pos_pct:.1f}%)")
            elif pos_pct <= 40:
                st.error(f"**Overall Sentiment:** Negative ({100-pos_pct:.1f}%)")
            else:
                st.warning(f"**Overall Sentiment:** Mixed ({pos_pct:.1f}% positive)")

with col3:
    if not filtered_df.empty:
        # Urgency distribution
        high_urgency_pct = len(filtered_df[filtered_df['urgency'] == 'High']) / len(filtered_df) * 100
        if high_urgency_pct >= 30:
            st.error(f"**High Urgency Cases:** {high_urgency_pct:.1f}% (Action needed!)")
        elif high_urgency_pct >= 15:
            st.warning(f"**High Urgency Cases:** {high_urgency_pct:.1f}% (Monitor closely)")
        else:
            st.success(f"**High Urgency Cases:** {high_urgency_pct:.1f}% (Under control)")

# Detailed analytics section
with st.expander("🔍 Detailed Analytics"):
    tab1, tab2, tab3 = st.tabs(["State Analysis", "Category Analysis", "Time Analysis"])
    
    with tab1:
        st.subheader("State-wise Detailed Breakdown")
        state_analysis = filtered_df.groupby('state').agg({
            'sentiment': lambda x: (x == 'Positive').sum(),
            'urgency': lambda x: (x == 'High').sum(),
            'category': 'count'
        }).rename(columns={'sentiment': 'positive_count', 'urgency': 'urgent_count', 'category': 'total_count'})
        
        state_analysis['positive_rate'] = (state_analysis['positive_count'] / state_analysis['total_count'] * 100).round(1)
        state_analysis['urgent_rate'] = (state_analysis['urgent_count'] / state_analysis['total_count'] * 100).round(1)
        
        st.dataframe(state_analysis, use_container_width=True)
    
    with tab2:
        st.subheader("Category Performance")
        
        category_analysis = filtered_df.groupby('category').agg({
            'sentiment': lambda x: (x == 'Positive').sum() / len(x) * 100,
            'urgency': lambda x: (x == 'High').sum() / len(x) * 100,
            'state': 'count'
        }).round(1)
        category_analysis.columns = ['Positive Rate (%)', 'High Urgency Rate (%)', 'Total Reports']
        
        st.dataframe(category_analysis, use_container_width=True)
        
        # Category performance chart
        fig_cat = px.scatter(
            category_analysis.reset_index(),
            x='Positive Rate (%)',
            y='High Urgency Rate (%)',
            size='Total Reports',
            color='category',
            title="Category Performance Matrix",
            labels={'category': 'Category'}
        )
        fig_cat.update_layout(height=400)
        st.plotly_chart(fig_cat, use_container_width=True)
    
    with tab3:
        st.subheader("Time-based Analysis")
        
        # Daily trend
        daily_counts = filtered_df.groupby(filtered_df['date'].dt.date).size()
        fig_daily = px.line(
            x=daily_counts.index,
            y=daily_counts.values,
            title="Daily Feedback Volume",
            labels={'x': 'Date', 'y': 'Number of Feedbacks'}
        )
        fig_daily.update_layout(height=300)
        st.plotly_chart(fig_daily, use_container_width=True)
        
        # Weekly patterns
        filtered_df['weekday'] = filtered_df['date'].dt.day_name()
        weekday_counts = filtered_df['weekday'].value_counts()
        weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        weekday_counts = weekday_counts.reindex(weekday_order, fill_value=0)
        
        fig_weekday = px.bar(
            x=weekday_counts.index,
            y=weekday_counts.values,
            title="Feedback by Day of Week",
            labels={'x': 'Day of Week', 'y': 'Number of Feedbacks'}
        )
        fig_weekday.update_layout(height=300)
        st.plotly_chart(fig_weekday, use_container_width=True)

# Raw data section
with st.expander("📋 View Raw Data"):
    st.subheader("Filtered Dataset")
    
    # Display columns for raw data
    display_columns = ['state', 'city', 'category', 'sentiment', 'urgency', 'issue_summary', 'date']
    raw_data_display = filtered_df[display_columns].copy()
    raw_data_display['date'] = raw_data_display['date'].dt.strftime('%Y-%m-%d %H:%M')
    
    st.dataframe(raw_data_display, use_container_width=True)
    
    # Download button
    csv = filtered_df.to_csv(index=False)
    st.download_button(
        label="📥 Download filtered data as CSV",
        data=csv,
        file_name=f"feedback_data_{datetime.now().strftime('%Y%m%d_%H%M')}.csv",
        mime="text/csv"
    )

# Auto-refresh option
st.sidebar.markdown("---")
auto_refresh = st.sidebar.checkbox("Auto-refresh every 30 seconds")

if auto_refresh:
    time.sleep(30)
    st.experimental_rerun()

# Footer with data info
st.markdown("---")
st.caption(f"Dashboard last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Total records in dataset: {len(df):,}")

# Custom CSS for better styling
st.markdown("""
<style>
.metric-container {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    border-left: 4px solid #007bff;
}
</style>
""", unsafe_allow_html=True)



# import pandas as pd
# import numpy as np
# import plotly.graph_objects as go
# import plotly.express as px
# from plotly.subplots import make_subplots
# import streamlit as st
# from datetime import datetime, timedelta
# import random
# import json

# # Set page config
# st.set_page_config(page_title="Feedback Dashboard", layout="wide")

# # State coordinates for map visualization
# @st.cache_data
# def get_state_coordinates():
#     return {
#         'Maharashtra': {'lat': 19.7515, 'lon': 75.7139, 'code': 'MH'},
#         'Gujarat': {'lat': 22.2587, 'lon': 71.1924, 'code': 'GJ'},
#         'Kerala': {'lat': 10.8505, 'lon': 76.2711, 'code': 'KL'},
#         'Rajasthan': {'lat': 27.0238, 'lon': 74.2179, 'code': 'RJ'},
#         'Tamil Nadu': {'lat': 11.1271, 'lon': 78.6569, 'code': 'TN'},
#         'Karnataka': {'lat': 15.3173, 'lon': 75.7139, 'code': 'KA'},
#         'West Bengal': {'lat': 22.9868, 'lon': 87.8550, 'code': 'WB'},
#         'Uttar Pradesh': {'lat': 26.8467, 'lon': 80.9462, 'code': 'UP'},
#         'Madhya Pradesh': {'lat': 22.9734, 'lon': 78.6569, 'code': 'MP'},
#         'Bihar': {'lat': 25.0961, 'lon': 85.3131, 'code': 'BR'},
#         'Delhi': {'lat': 28.7041, 'lon': 77.1025, 'code': 'DL'},
#         'Punjab': {'lat': 31.1471, 'lon': 75.3412, 'code': 'PB'},
#         'Haryana': {'lat': 29.0588, 'lon': 76.0856, 'code': 'HR'},
#         'Himachal Pradesh': {'lat': 31.1048, 'lon': 77.1734, 'code': 'HP'},
#         'Jammu and Kashmir': {'lat': 34.0837, 'lon': 74.7973, 'code': 'JK'},
#         'Uttarakhand': {'lat': 30.0668, 'lon': 79.0193, 'code': 'UK'},
#         'Jharkhand': {'lat': 23.6102, 'lon': 85.2799, 'code': 'JH'},
#         'Odisha': {'lat': 20.9517, 'lon': 85.0985, 'code': 'OR'},
#         'Chhattisgarh': {'lat': 21.2787, 'lon': 81.8661, 'code': 'CG'},
#         'Assam': {'lat': 26.2006, 'lon': 92.9376, 'code': 'AS'},
#         'Andhra Pradesh': {'lat': 15.9129, 'lon': 79.7400, 'code': 'AP'},
#         'Telangana': {'lat': 18.1124, 'lon': 79.0193, 'code': 'TG'},
#         'Goa': {'lat': 15.2993, 'lon': 74.1240, 'code': 'GA'},
#         'Manipur': {'lat': 24.6637, 'lon': 93.9063, 'code': 'MN'},
#         'Meghalaya': {'lat': 25.4670, 'lon': 91.3662, 'code': 'ML'},
#         'Tripura': {'lat': 23.9408, 'lon': 91.9882, 'code': 'TR'},
#         'Nagaland': {'lat': 26.1584, 'lon': 94.5624, 'code': 'NL'},
#         'Mizoram': {'lat': 23.1645, 'lon': 92.9376, 'code': 'MZ'},
#         'Arunachal Pradesh': {'lat': 28.2180, 'lon': 94.7278, 'code': 'AR'},
#         'Sikkim': {'lat': 27.5330, 'lon': 88.5122, 'code': 'SK'}
#     }

# # Generate demo dataset
# @st.cache_data
# def generate_demo_data():
#     # Indian states (expanded list)
#     states = ['Maharashtra', 'Gujarat', 'Kerala', 'Rajasthan', 'Tamil Nadu', 
#               'Karnataka', 'West Bengal', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar',
#               'Delhi', 'Punjab', 'Haryana', 'Andhra Pradesh', 'Telangana', 'Odisha',
#               'Jharkhand', 'Chhattisgarh', 'Assam', 'Himachal Pradesh']
    
#     # Cities for each state
#     cities_map = {
#         'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
#         'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
#         'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
#         'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
#         'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
#         'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
#         'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
#         'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
#         'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
#         'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
#         'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Karol Bagh'],
#         'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar'],
#         'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Karnal'],
#         'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
#         'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
#         'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'],
#         'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
#         'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur'],
#         'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'],
#         'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi']
#     }
    
#     categories = ['Roads', 'Water', 'Electricity', 'Sanitation', 'Healthcare']
#     sentiments = ['Positive', 'Negative', 'Neutral']
#     urgency_levels = ['Low', 'Medium', 'High']
    
#     # Generate feedback data
#     data = []
#     for _ in range(1254):  # Total feedback count from the image
#         state = random.choice(states)
#         city = random.choice(cities_map[state])
#         category = random.choice(categories)
#         sentiment = random.choice(sentiments)
#         urgency = random.choice(urgency_levels)
        
#         # Generate date within last 7 months
#         start_date = datetime.now() - timedelta(days=210)
#         random_days = random.randint(0, 210)
#         date = start_date + timedelta(days=random_days)
        
#         # Generate issue summary based on category
#         issue_summaries = {
#             'Roads': ['Road is full of potholes', 'Street lights not working', 'Traffic congestion issue'],
#             'Water': ['Water supply has improved', 'No water for 3 days', 'Water quality is poor'],
#             'Electricity': ['Power outage in the neighborhood', 'Frequent power cuts', 'New transformer installed'],
#             'Sanitation': ['Garbage not collected for 3 days', 'Clean streets maintained well', 'Sewage overflow problem'],
#             'Healthcare': ['New clinic opened nearby', 'Doctor unavailable', 'Medicine shortage at hospital']
#         }
        
#         issue = random.choice(issue_summaries[category])
        
#         data.append({
#             'state': state,
#             'city': city,
#             'category': category,
#             'sentiment': sentiment,
#             'urgency': urgency,
#             'date': date,
#             'issue_summary': issue,
#             'month': date.strftime('%b')
#         })
    
#     return pd.DataFrame(data)

# # Load data
# df = generate_demo_data()

# # Sidebar filters
# st.sidebar.header("Filters")

# # State filter
# selected_states = st.sidebar.multiselect(
#     "Select States",
#     options=df['state'].unique(),
#     default=df['state'].unique()
# )

# # Date range filter
# min_date = df['date'].min().date()
# max_date = df['date'].max().date()
# date_range = st.sidebar.date_input(
#     "Select Date Range",
#     value=(min_date, max_date),
#     min_value=min_date,
#     max_value=max_date
# )

# # Sentiment filter
# selected_sentiments = st.sidebar.multiselect(
#     "Select Sentiment",
#     options=['Positive', 'Negative', 'Neutral'],
#     default=['Positive', 'Negative', 'Neutral']
# )

# # Filter data based on selections
# filtered_df = df[
#     (df['state'].isin(selected_states)) &
#     (df['date'].dt.date >= date_range[0]) &
#     (df['date'].dt.date <= date_range[1]) &
#     (df['sentiment'].isin(selected_sentiments))
# ]

# # Dashboard Title
# st.title("📊 Feedback Dashboard")
# st.markdown("---")

# # Top metrics row
# col1, col2, col3, col4 = st.columns(4)

# with col1:
#     total_feedback = len(filtered_df)
#     st.metric("Total Feedback", f"{total_feedback:,}")

# with col2:
#     pos_count = len(filtered_df[filtered_df['sentiment'] == 'Positive'])
#     neg_count = len(filtered_df[filtered_df['sentiment'] == 'Negative'])
#     if total_feedback > 0:
#         pos_ratio = pos_count / (pos_count + neg_count) if (pos_count + neg_count) > 0 else 0
#         st.metric("Positive / Negative", f"{pos_ratio:.1%}")
#     else:
#         st.metric("Positive / Negative", "0%")

# with col3:
#     urgent_cases = len(filtered_df[filtered_df['urgency'] == 'High'])
#     urgent_percentage = (urgent_cases / total_feedback * 100) if total_feedback > 0 else 0
#     st.metric("Urgent Cases", f"{urgent_percentage:.0f}%")

# with col4:
#     if total_feedback > 0:
#         top_state = filtered_df['state'].value_counts().index[0]
#         st.metric("Top State", top_state)
#     else:
#         st.metric("Top State", "N/A")

# st.markdown("---")

# # Main dashboard row
# col1, col2 = st.columns([2, 1])

# with col1:
#     st.subheader("🗺️ Interactive India Map - Feedback Distribution")
    
#     # Prepare map data
#     if not filtered_df.empty:
#         # Get state coordinates
#         state_coords = get_state_coordinates()
        
#         # Create state-wise aggregated data
#         map_data = []
#         for state in filtered_df['state'].unique():
#             if state in state_coords:
#                 state_data = filtered_df[filtered_df['state'] == state]
#                 total_feedback = len(state_data)
#                 positive_feedback = len(state_data[state_data['sentiment'] == 'Positive'])
#                 negative_feedback = len(state_data[state_data['sentiment'] == 'Negative'])
#                 urgent_feedback = len(state_data[state_data['urgency'] == 'High'])
                
#                 # Calculate rates
#                 positive_rate = (positive_feedback / total_feedback * 100) if total_feedback > 0 else 0
#                 urgent_rate = (urgent_feedback / total_feedback * 100) if total_feedback > 0 else 0
                
#                 # Determine color based on sentiment
#                 if positive_rate >= 60:
#                     color = '#10B981'  # Green for positive
#                     sentiment_status = 'Positive'
#                 elif positive_rate <= 40:
#                     color = '#EF4444'  # Red for negative
#                     sentiment_status = 'Negative'
#                 else:
#                     color = '#F59E0B'  # Yellow for neutral
#                     sentiment_status = 'Mixed'
                
#                 # Determine size based on total feedback
#                 size = min(max(total_feedback / 5, 10), 50)  # Scale between 10-50
                
#                 map_data.append({
#                     'state': state,
#                     'lat': state_coords[state]['lat'],
#                     'lon': state_coords[state]['lon'],
#                     'total_feedback': total_feedback,
#                     'positive_feedback': positive_feedback,
#                     'negative_feedback': negative_feedback,
#                     'urgent_feedback': urgent_feedback,
#                     'positive_rate': positive_rate,
#                     'urgent_rate': urgent_rate,
#                     'color': color,
#                     'sentiment_status': sentiment_status,
#                     'size': size
#                 })
        
#         map_df = pd.DataFrame(map_data)
        
#         if not map_df.empty:
#             # Create the map
#             fig_map = go.Figure()
            
#             # Add state markers
#             fig_map.add_trace(go.Scattermapbox(
#                 lat=map_df['lat'],
#                 lon=map_df['lon'],
#                 mode='markers',
#                 marker=dict(
#                     size=map_df['size'],
#                     color=map_df['color'],
#                     opacity=0.8,
#                     sizemode='diameter'
#                 ),
#                 text=map_df['state'],
#                 hovertemplate=(
#                     "<b>%{text}</b><br>" +
#                     "Total Feedback: %{customdata[0]}<br>" +
#                     "Positive: %{customdata[1]} (%{customdata[4]:.1f}%)<br>" +
#                     "Negative: %{customdata[2]}<br>" +
#                     "Urgent: %{customdata[3]} (%{customdata[5]:.1f}%)<br>" +
#                     "Overall: %{customdata[6]}<br>" +
#                     "<extra></extra>"
#                 ),
#                 customdata=map_df[['total_feedback', 'positive_feedback', 'negative_feedback', 
#                                  'urgent_feedback', 'positive_rate', 'urgent_rate', 'sentiment_status']].values,
#                 name="States"
#             ))
            
#             # Update layout for map
#             fig_map.update_layout(
#                 mapbox=dict(
#                     style="open-street-map",
#                     center=dict(lat=20.5937, lon=78.9629),  # Center of India
#                     zoom=4
#                 ),
#                 height=600,
#                 margin=dict(l=0, r=0, t=30, b=0),
#                 title={
#                     'text': "State-wise Feedback Distribution",
#                     'x': 0.5,
#                     'xanchor': 'center'
#                 }
#             )
            
#             st.plotly_chart(fig_map, use_container_width=True)
            
#             # Add map legend
#             st.markdown("""
#             **Map Legend:**
#             - 🟢 **Green**: Positive sentiment (≥60% positive feedback)
#             - 🟡 **Yellow**: Mixed sentiment (40-60% positive feedback)  
#             - 🔴 **Red**: Negative sentiment (≤40% positive feedback)
#             - **Size**: Proportional to total feedback volume
#             """)
#         else:
#             st.info("No data available for map visualization with current filters.")
#     else:
#         st.info("No data available. Please adjust your filters.")

# with col2:
#     st.subheader("📊 State Rankings")
    
#     if not filtered_df.empty:
#         # Create state ranking
#         state_ranking = filtered_df.groupby('state').agg({
#             'sentiment': lambda x: len(x),
#             'urgency': lambda x: (x == 'High').sum()
#         }).rename(columns={'sentiment': 'total', 'urgency': 'urgent'})
        
#         # Calculate positive feedback
#         positive_by_state = filtered_df[filtered_df['sentiment'] == 'Positive'].groupby('state').size()
#         state_ranking['positive'] = state_ranking.index.map(positive_by_state).fillna(0)
#         state_ranking['positive_rate'] = (state_ranking['positive'] / state_ranking['total'] * 100).round(1)
#         state_ranking['urgent_rate'] = (state_ranking['urgent'] / state_ranking['total'] * 100).round(1)
        
#         # Sort by total feedback
#         state_ranking = state_ranking.sort_values('total', ascending=False)
        
#         # Display top states
#         st.markdown("**Top States by Feedback Volume:**")
#         for i, (state, row) in enumerate(state_ranking.head(8).iterrows(), 1):
#             # Determine emoji based on positive rate
#             if row['positive_rate'] >= 60:
#                 emoji = "🟢"
#             elif row['positive_rate'] <= 40:
#                 emoji = "🔴"
#             else:
#                 emoji = "🟡"
            
#             st.markdown(f"""
#             **{i}. {emoji} {state}**
#             - Total: {int(row['total'])} | Positive: {row['positive_rate']:.1f}%
#             - Urgent: {int(row['urgent'])} ({row['urgent_rate']:.1f}%)
#             """)
        
#         # Additional metrics
#         st.markdown("---")
#         st.subheader("🎯 Quick Stats")
        
#         # Best performing state
#         best_state = state_ranking.loc[state_ranking['positive_rate'].idxmax()]
#         st.success(f"**Best Sentiment:** {best_state.name} ({best_state['positive_rate']:.1f}% positive)")
        
#         # Most urgent state
#         worst_urgent = state_ranking.loc[state_ranking['urgent_rate'].idxmax()]
#         st.error(f"**Most Urgent:** {worst_urgent.name} ({worst_urgent['urgent_rate']:.1f}% urgent cases)")
        
#         # Highest volume state
#         highest_volume = state_ranking.iloc[0]
#         st.info(f"**Highest Volume:** {highest_volume.name} ({int(highest_volume['total'])} reports)")

# # Second row - Trend Analysis
# st.markdown("---")
# col1, col2 = st.columns([1, 1])

# with col1:
#     st.subheader("📈 Sentiment Trend Over Time")
    
#     # Monthly sentiment trend
#     if not filtered_df.empty:
#         monthly_sentiment = filtered_df.groupby(['month', 'sentiment']).size().unstack(fill_value=0)
        
#         fig_trend = go.Figure()
        
#         months_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
#         available_months = [m for m in months_order if m in filtered_df['month'].unique()]
        
#         if 'Positive' in monthly_sentiment.columns:
#             fig_trend.add_trace(go.Scatter(
#                 x=available_months,
#                 y=[monthly_sentiment.loc[m, 'Positive'] if m in monthly_sentiment.index else 0 for m in available_months],
#                 mode='lines+markers',
#                 name='Positive',
#                 line=dict(color='#10B981', width=3),
#                 marker=dict(size=8),
#                 fill='tonexty'
#             ))
        
#         if 'Negative' in monthly_sentiment.columns:
#             fig_trend.add_trace(go.Scatter(
#                 x=available_months,
#                 y=[monthly_sentiment.loc[m, 'Negative'] if m in monthly_sentiment.index else 0 for m in available_months],
#                 mode='lines+markers',
#                 name='Negative',
#                 line=dict(color='#EF4444', width=3),
#                 marker=dict(size=8)
#             ))
        
#         if 'Neutral' in monthly_sentiment.columns:
#             fig_trend.add_trace(go.Scatter(
#                 x=available_months,
#                 y=[monthly_sentiment.loc[m, 'Neutral'] if m in monthly_sentiment.index else 0 for m in available_months],
#                 mode='lines+markers',
#                 name='Neutral',
#                 line=dict(color='#6B7280', width=2),
#                 marker=dict(size=6)
#             ))
        
#         fig_trend.update_layout(
#             title="Monthly Sentiment Distribution",
#             xaxis_title="Month",
#             yaxis_title="Number of Feedbacks",
#             height=400,
#             hovermode='x unified',
#             legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
#         )
        
#         st.plotly_chart(fig_trend, use_container_width=True)

# # Third row - Category Analysis and Urgent Reports
# col1, col2 = st.columns([1, 1])

# with col1:
#     st.subheader("🏷️ Top Categories Distribution")
    
#     if not filtered_df.empty:
#         category_counts = filtered_df['category'].value_counts()
        
#         # Create donut chart with better colors
#         colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        
#         fig_donut = go.Figure(data=[go.Pie(
#             labels=category_counts.index,
#             values=category_counts.values,
#             hole=.4,
#             marker=dict(colors=colors, line=dict(color='#FFFFFF', width=2)),
#             textinfo='label+percent',
#             textposition='outside'
#         )])
        
#         fig_donut.update_layout(
#             title="Feedback Distribution by Category",
#             height=400,
#             showlegend=True,
#             legend=dict(orientation="v", yanchor="middle", y=0.5, xanchor="left", x=1.05),
#             annotations=[dict(text=f'Total<br>{category_counts.sum()}', x=0.5, y=0.5, 
#                             font_size=16, showarrow=False)]
#         )
        
#         st.plotly_chart(fig_donut, use_container_width=True)
        
#         # Category performance metrics
#         st.markdown("**Category Performance:**")
#         for category in category_counts.index[:5]:
#             cat_data = filtered_df[filtered_df['category'] == category]
#             pos_rate = len(cat_data[cat_data['sentiment'] == 'Positive']) / len(cat_data) * 100
#             urgent_rate = len(cat_data[cat_data['urgency'] == 'High']) / len(cat_data) * 100
            
#             if pos_rate >= 60:
#                 status_emoji = "🟢"
#             elif pos_rate <= 40:
#                 status_emoji = "🔴"
#             else:
#                 status_emoji = "🟡"
            
#             st.markdown(f"{status_emoji} **{category}**: {category_counts[category]} reports | {pos_rate:.1f}% positive | {urgent_rate:.1f}% urgent")

# with col2:
#     st.subheader("⚠️ Recent Urgent Reports")
    
#     # Filter urgent cases and sort by date
#     urgent_reports = filtered_df[filtered_df['urgency'] == 'High'].sort_values('date', ascending=False).head(8)
    
#     if not urgent_reports.empty:
#         # Create a more visual display
#         for idx, (_, report) in enumerate(urgent_reports.iterrows()):
#             # Color coding based on sentiment
#             if report['sentiment'] == 'Positive':
#                 border_color = "#10B981"
#                 bg_color = "#ECFDF5"
#             elif report['sentiment'] == 'Negative':
#                 border_color = "#EF4444" 
#                 bg_color = "#FEF2F2"
#             else:
#                 border_color = "#F59E0B"
#                 bg_color = "#FFFBEB"
            
#             st.markdown(f"""
#             <div style="
#                 border-left: 4px solid {border_color};
#                 background-color: {bg_color};
#                 padding: 10px;
#                 margin: 8px 0;
#                 border-radius: 5px;
#             ">
#                 <strong>📍 {report['state']}, {report['city']}</strong><br>
#                 <strong>🏷️ {report['category']}</strong> | 
#                 <strong>⚠️ {report['urgency']}</strong><br>
#                 📝 {report['issue_summary']}<br>
#                 📅 <small>{report['date'].strftime('%Y-%m-%d')}</small>
#             </div>
#             """, unsafe_allow_html=True)
            
#     else:
#         st.info("No urgent reports found for the selected filters.")
        
#     # Quick action buttons
#     st.markdown("---")
#     col_a, col_b = st.columns(2)
#     with col_a:
#         if st.button("🚨 View All Urgent", use_container_width=True):
#             st.session_state.show_urgent = True
#     with col_b:
#         if st.button("📊 Export Report", use_container_width=True):
#             csv = filtered_df.to_csv(index=False)
#             st.download_button(
#                 label="📥 Download CSV",
#                 data=csv,
#                 file_name=f"urgent_reports_{datetime.now().strftime('%Y%m%d')}.csv",
#                 mime="text/csv",
#                 use_container_width=True
#             ) 
#             display_df.style.applymap(highlight_urgency, subset=['Urgency Level'])
#             st.dataframe(styled_df, use_container_width=True, height=400)
#         else:
#             st.info("No urgent reports found for the selected filters.")

# # Additional insights section
# st.markdown("---")
# st.subheader("📈 Key Insights")

# col1, col2, col3 = st.columns(3)

# with col1:
#     if not filtered_df.empty:
#         # Most common issue category
#         top_category = filtered_df['category'].value_counts().index[0]
#         top_category_count = filtered_df['category'].value_counts().iloc[0]
#         st.info(f"**Most Reported Issue:** {top_category} ({top_category_count} reports)")

# with col2:
#     if not filtered_df.empty:
#         # Sentiment distribution
#         sentiment_dist = filtered_df['sentiment'].value_counts()
#         if 'Positive' in sentiment_dist.index and 'Negative' in sentiment_dist.index:
#             pos_pct = sentiment_dist['Positive'] / (sentiment_dist['Positive'] + sentiment_dist['Negative']) * 100
#             if pos_pct >= 60:
#                 st.success(f"**Overall Sentiment:** Positive ({pos_pct:.1f}%)")
#             elif pos_pct <= 40:
#                 st.error(f"**Overall Sentiment:** Negative ({100-pos_pct:.1f}%)")
#             else:
#                 st.warning(f"**Overall Sentiment:** Mixed ({pos_pct:.1f}% positive)")

# with col3:
#     if not filtered_df.empty:
#         # Urgency distribution
#         high_urgency_pct = len(filtered_df[filtered_df['urgency'] == 'High']) / len(filtered_df) * 100
#         if high_urgency_pct >= 30:
#             st.error(f"**High Urgency Cases:** {high_urgency_pct:.1f}% (Action needed!)")
#         elif high_urgency_pct >= 15:
#             st.warning(f"**High Urgency Cases:** {high_urgency_pct:.1f}% (Monitor closely)")
#         else:
#             st.success(f"**High Urgency Cases:** {high_urgency_pct:.1f}% (Under control)")

# # Detailed analytics section
# with st.expander("🔍 Detailed Analytics"):
#     tab1, tab2, tab3 = st.tabs(["State Analysis", "Category Analysis", "Time Analysis"])
    
#     with tab1:
#         st.subheader("State-wise Detailed Breakdown")
#         state_analysis = filtered_df.groupby('state').agg({
#             'sentiment': lambda x: (x == 'Positive').sum(),
#             'urgency': lambda x: (x == 'High').sum(),
#             'category': 'count'
#         }).rename(columns={'sentiment': 'positive_count', 'urgency': 'urgent_count', 'category': 'total_count'})
        
#         state_analysis['positive_rate'] = (state_analysis['positive_count'] / state_analysis['total_count'] * 100).round(1)
#         state_analysis['urgent_rate'] = (state_analysis['urgent_count'] / state_analysis['total_count'] * 100).round(1)
        
#         st.dataframe(state_analysis, use_container_width=True)
    
#     with tab2:
#         st.subheader("Category Performance")
        
#         category_analysis = filtered_df.groupby('category').agg({
#             'sentiment': lambda x: (x == 'Positive').sum() / len(x) * 100,
#             'urgency': lambda x: (x == 'High').sum() / len(x) * 100,
#             'state': 'count'
#         }).round(1)
#         category_analysis.columns = ['Positive Rate (%)', 'High Urgency Rate (%)', 'Total Reports']
        
#         st.dataframe(category_analysis, use_container_width=True)
        
#         # Category performance chart
#         fig_cat = px.scatter(
#             category_analysis.reset_index(),
#             x='Positive Rate (%)',
#             y='High Urgency Rate (%)',
#             size='Total Reports',
#             color='category',
#             title="Category Performance Matrix",
#             labels={'category': 'Category'}
#         )
#         fig_cat.update_layout(height=400)
#         st.plotly_chart(fig_cat, use_container_width=True)
    
#     with tab3:
#         st.subheader("Time-based Analysis")
        
#         # Daily trend
#         daily_counts = filtered_df.groupby(filtered_df['date'].dt.date).size()
#         fig_daily = px.line(
#             x=daily_counts.index,
#             y=daily_counts.values,
#             title="Daily Feedback Volume",
#             labels={'x': 'Date', 'y': 'Number of Feedbacks'}
#         )
#         fig_daily.update_layout(height=300)
#         st.plotly_chart(fig_daily, use_container_width=True)
        
#         # Weekly patterns
#         filtered_df['weekday'] = filtered_df['date'].dt.day_name()
#         weekday_counts = filtered_df['weekday'].value_counts()
#         weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
#         weekday_counts = weekday_counts.reindex(weekday_order, fill_value=0)
        
#         fig_weekday = px.bar(
#             x=weekday_counts.index,
#             y=weekday_counts.values,
#             title="Feedback by Day of Week",
#             labels={'x': 'Day of Week', 'y': 'Number of Feedbacks'}
#         )
#         fig_weekday.update_layout(height=300)
#         st.plotly_chart(fig_weekday, use_container_width=True)

# # Raw data section
# with st.expander("📋 View Raw Data"):
#     st.subheader("Filtered Dataset")
    
#     # Display columns for raw data
#     display_columns = ['state', 'city', 'category', 'sentiment', 'urgency', 'issue_summary', 'date']
#     raw_data_display = filtered_df[display_columns].copy()
#     raw_data_display['date'] = raw_data_display['date'].dt.strftime('%Y-%m-%d %H:%M')
    
#     st.dataframe(raw_data_display, use_container_width=True)
    
#     # Download button
#     csv = filtered_df.to_csv(index=False)
#     st.download_button(
#         label="📥 Download filtered data as CSV",
#         data=csv,
#         file_name=f"feedback_data_{datetime.now().strftime('%Y%m%d_%H%M')}.csv",
#         mime="text/csv"
#     )

# # Auto-refresh option
# st.sidebar.markdown("---")
# auto_refresh = st.sidebar.checkbox("Auto-refresh every 30 seconds")

# if auto_refresh:
#     time.sleep(30)
#     st.experimental_rerun()

# # Footer with data info
# st.markdown("---")
# st.caption(f"Dashboard last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Total records in dataset: {len(df):,}")

# # Custom CSS for better styling
# st.markdown("""
# <style>
# .metric-container {
#     background-color: #f8f9fa;
#     padding: 1rem;
#     border-radius: 0.5rem;
#     border-left: 4px solid #007bff;
# }
# </style>
# """, unsafe_allow_html=True)