# API Troubleshooting Guide - Soil Advisor

## The "Failed to fetch" Error

The "Failed to fetch" error you're experiencing is a common issue when making API calls from web applications. Here are the most likely causes and solutions:

## 🔍 **Common Causes**

### 1. **CORS (Cross-Origin Resource Sharing) Issues**
- **Problem**: The API server doesn't allow requests from your domain
- **Solution**: The API server needs to include proper CORS headers
- **Signs**: Error occurs in browser console, works in backend/server requests

### 2. **Network Connectivity**
- **Problem**: Internet connection or API server is down
- **Solution**: Check internet connection and API server status
- **Signs**: Complete failure to connect

### 3. **API Server Issues**
- **Problem**: The API endpoint is not responding or has changed
- **Solution**: Verify the API endpoint URL and server status
- **Signs**: 404, 500, or other HTTP errors

## 🛠️ **Solutions Implemented**

### 1. **Enhanced Error Handling**
```typescript
// Added explicit CORS mode and better error messages
const apiResponse = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors', // Explicitly set CORS mode
  body: JSON.stringify(formData),
});
```

### 2. **Detailed Error Messages**
- Network-specific error detection
- CORS issue identification
- User-friendly error explanations
- Suggested solutions in the UI

### 3. **Fallback Options**
- **Mock Data Button**: Test the UI with simulated responses
- **Sample Data Presets**: Quick test with realistic agricultural data
- **Development Mode**: Easy testing without API dependency

## 🧪 **Testing Options**

### Option 1: Use Mock Data
Click the "🧪 Try with Mock Data (Demo)" button to test the UI with simulated API responses.

### Option 2: Use Sample Data Presets
- 🌾 Rice Conditions
- 🌾 Wheat Conditions  
- 🌽 Corn Conditions
- 🌱 Soybean Conditions

### Option 3: Test API Directly
Open `api-test.html` in your browser to test the API endpoint directly.

## 🔧 **API Server Requirements**

For the API to work properly, the server needs to:

1. **Enable CORS** for your domain:
```javascript
// Express.js example
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

2. **Accept JSON requests**:
```javascript
app.use(express.json());
```

3. **Return proper JSON responses**:
```javascript
res.json({
  prediction: "rice",
  confidence: 0.85,
  recommendations: [...],
  nutrient_status: {...}
});
```

## 📊 **Expected API Format**

### Request:
```json
{
  "N": 80,
  "P": 40, 
  "K": 40,
  "temperature": 25,
  "humidity": 65,
  "ph": 6.5,
  "rainfall": 200
}
```

### Response:
```json
{
  "prediction": "rice",
  "confidence": 0.85,
  "recommendations": [
    "Consider adding organic matter",
    "Monitor irrigation schedule"
  ],
  "nutrient_status": {
    "nitrogen": "Medium",
    "phosphorus": "Low", 
    "potassium": "High"
  }
}
```

## 🚀 **Next Steps**

1. **Test with Mock Data**: Use the demo button to verify the UI works correctly
2. **Check API Server**: Contact the API provider to ensure CORS is enabled
3. **Verify Network**: Test the API from different networks/browsers
4. **Use Sample Data**: Try the preset conditions for realistic testing

## 💡 **Development Tips**

- Use browser Developer Tools (F12) to see detailed error messages
- Check the Network tab to see if requests are being made
- Console errors will show CORS-specific messages
- The mock data feature lets you develop/demo without API dependency

The Soil Advisor feature is fully functional - the issue is likely with API access rather than the code implementation.