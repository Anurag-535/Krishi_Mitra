# Soil Advisor Feature Documentation

## Overview

The Soil Advisor is a new AI-powered feature in the Krishi Mitra application that provides intelligent crop recommendations based on soil NPK analysis and environmental factors.

## Features

### 🌱 NPK Analysis Input
- **Nitrogen (N)**: Input soil nitrogen levels in mg/kg
- **Phosphorus (P)**: Input soil phosphorus levels in mg/kg  
- **Potassium (K)**: Input soil potassium levels in mg/kg

### 🌡️ Environmental Factors
- **Temperature**: Current temperature in Celsius
- **Humidity**: Relative humidity percentage
- **pH Level**: Soil pH value (0-14 scale)
- **Rainfall**: Annual rainfall in millimeters

### 🤖 AI-Powered Recommendations
- **Crop Prediction**: Best suited crop for given conditions
- **Confidence Score**: AI model confidence percentage
- **Nutrient Status**: Analysis of N, P, K levels
- **Additional Recommendations**: Farming tips and suggestions

## API Integration

### Endpoint
```
POST https://interserver-production-c8af.up.railway.app/api/npk
```

### Request Format
```json
{
  "N": 0,
  "P": 0,
  "K": 0,
  "temperature": 25,
  "humidity": 65,
  "ph": 6.5,
  "rainfall": 200
}
```

### Response Format
```json
{
  "prediction": "rice",
  "confidence": 0.85,
  "recommendations": [
    "Consider organic fertilizers",
    "Monitor irrigation schedule"
  ],
  "nutrient_status": {
    "nitrogen": "Low",
    "phosphorus": "Medium",
    "potassium": "High"
  }
}
```

## User Interface

### Layout
- **Left Panel**: Input form with all soil and environmental parameters
- **Right Panel**: AI recommendations and analysis results
- **Bottom Section**: Information cards explaining NPK analysis, environmental factors, and AI insights

### Form Validation
- All numeric inputs with appropriate min/max values
- Step values for precise measurements
- Required field validation
- Real-time input feedback

### Loading States
- Animated loading spinner during API calls
- Disabled form submission during processing
- Clear error messaging for failed requests

### Results Display
- **Main Prediction**: Prominently displayed recommended crop
- **Confidence Score**: Visual confidence percentage
- **Nutrient Analysis**: Color-coded N, P, K status grid
- **Recommendations**: Bulleted list of actionable advice
- **Raw Response**: Collapsible debug information

## Navigation Integration

The Soil Advisor has been added to the main navigation with:
- **Icon**: Leaf icon representing agricultural focus
- **Position**: Third item in navigation (after Field Explorer)
- **Label**: "Soil Advisor"
- **Route ID**: 'soil-advisor'

## Files Created/Modified

### New Files
- `src/pages/SoilAdvisor.tsx` - Main component with full functionality
- `SOIL_ADVISOR_DOCS.md` - This documentation file

### Modified Files
- `src/components/Navigation.tsx` - Added Soil Advisor navigation item
- `src/App.tsx` - Added routing for Soil Advisor page

## Usage Instructions

1. **Navigate to Soil Advisor**: Click the "Soil Advisor" tab in the navigation
2. **Enter Soil Data**: Fill in NPK values from soil testing results
3. **Add Environmental Data**: Input current temperature, humidity, pH, and rainfall
4. **Get Recommendations**: Click "Get AI Recommendations" button
5. **Review Results**: Analyze the recommended crop and additional advice
6. **Reset if Needed**: Use "Reset" button to clear form and start over

## Error Handling

- **Network Errors**: Graceful handling of API connection issues
- **Invalid Responses**: Error messages for malformed API responses
- **Validation Errors**: Real-time feedback for invalid input values
- **Loading States**: Clear indication when requests are processing

## Styling & Design

- **Gradient Backgrounds**: Modern green-to-blue gradients
- **Card-based Layout**: Clean, organized information display
- **Responsive Design**: Works on desktop and mobile devices
- **Professional Icons**: Lucide React icons throughout
- **Color Coding**: Intuitive colors for different nutrient levels

## Future Enhancements

- **Historical Data**: Store and compare previous soil analyses
- **Field-specific Recommendations**: Integration with Field Explorer data
- **Seasonal Adjustments**: Time-based crop recommendations
- **Export Functionality**: PDF reports of recommendations
- **Multi-language Support**: Localization for different regions
- **Offline Mode**: Cached recommendations for limited connectivity

## Technical Notes

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Calls**: Native fetch with proper error handling
- **State Management**: React useState hooks
- **Form Handling**: Controlled components with validation

The Soil Advisor feature provides farmers with data-driven insights to optimize crop selection and improve agricultural outcomes through AI-powered analysis of soil conditions and environmental factors.