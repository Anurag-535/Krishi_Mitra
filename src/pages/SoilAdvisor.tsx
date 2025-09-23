import React, { useState } from 'react';
import { Leaf, Brain, Target, AlertTriangle, CheckCircle, Loader2, Info } from 'lucide-react';

interface NPKData {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

interface NPKResponse {
  prediction: string;
  confidence?: number;
  recommendations?: string[];
  nutrient_status?: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  };
}

const SoilAdvisor: React.FC = () => {
  const [formData, setFormData] = useState<NPKData>({
    N: 0,
    P: 0,
    K: 0,
    temperature: 25,
    humidity: 65,
    ph: 6.5,
    rainfall: 200
  });

  const [response, setResponse] = useState<NPKResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof NPKData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiResponse = await fetch('https://interserver-production-c8af.up.railway.app/api/npk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        // Try to get error message from response
        let errorMessage = `API request failed with status ${apiResponse.status}`;
        try {
          const errorData = await apiResponse.text();
          if (errorData) {
            errorMessage += `: ${errorData}`;
          }
        } catch {
          // Ignore if we can't parse error response
        }
        throw new Error(errorMessage);
      }

      const data = await apiResponse.json();
      setResponse(data);
    } catch (err) {
      console.error('API Error:', err);
      
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Network error: Unable to connect to the API. This might be due to CORS restrictions or network issues. Please check your internet connection or try again later.');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred while fetching soil recommendations');
      }
      
      // For development, you can uncomment this to use mock data
      // setResponse({
      //   prediction: "Rice",
      //   confidence: 0.85,
      //   recommendations: [
      //     "Consider adding organic matter to improve soil structure",
      //     "Monitor irrigation schedule based on rainfall patterns",
      //     "Apply balanced NPK fertilizer based on soil test results"
      //   ],
      //   nutrient_status: {
      //     nitrogen: "Medium",
      //     phosphorus: "Low", 
      //     potassium: "High"
      //   }
      // });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      N: 0,
      P: 0,
      K: 0,
      temperature: 25,
      humidity: 65,
      ph: 6.5,
      rainfall: 200
    });
    setResponse(null);
    setError(null);
  };

  const loadMockData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API delay
    setTimeout(() => {
      setResponse({
        prediction: "Rice",
        confidence: 0.85,
        recommendations: [
          "Consider adding organic matter to improve soil structure",
          "Monitor irrigation schedule based on rainfall patterns", 
          "Apply balanced NPK fertilizer based on soil test results",
          "Test soil pH regularly and adjust if needed"
        ],
        nutrient_status: {
          nitrogen: "Medium",
          phosphorus: "Low",
          potassium: "High"
        }
      });
      setLoading(false);
    }, 1500);
  };

  const loadSampleData = (sampleType: string) => {
    const samples = {
      'rice': { N: 80, P: 40, K: 40, temperature: 28, humidity: 70, ph: 6.5, rainfall: 1200 },
      'wheat': { N: 120, P: 60, K: 40, temperature: 22, humidity: 60, ph: 7.0, rainfall: 600 },
      'corn': { N: 150, P: 60, K: 50, temperature: 25, humidity: 65, ph: 6.8, rainfall: 800 },
      'soybean': { N: 40, P: 80, K: 60, temperature: 24, humidity: 65, ph: 6.2, rainfall: 700 }
    };
    
    const sample = samples[sampleType as keyof typeof samples];
    if (sample) {
      setFormData(sample);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Soil Advisor</h1>
                <p className="text-gray-600 mt-1">Get intelligent crop recommendations based on soil NPK analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">AI Powered</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Soil Analysis Input</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NPK Values */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nitrogen (N)
                  </label>
                  <input
                    type="number"
                    value={formData.N}
                    onChange={(e) => handleInputChange('N', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="mg/kg"
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phosphorus (P)
                  </label>
                  <input
                    type="number"
                    value={formData.P}
                    onChange={(e) => handleInputChange('P', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="mg/kg"
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potassium (K)
                  </label>
                  <input
                    type="number"
                    value={formData.K}
                    onChange={(e) => handleInputChange('K', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="mg/kg"
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>

              {/* Environmental Factors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.1"
                    min="-10"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    pH Level
                  </label>
                  <input
                    type="number"
                    value={formData.ph}
                    onChange={(e) => handleInputChange('ph', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    step="0.1"
                    min="0"
                    max="14"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    value={formData.rainfall}
                    onChange={(e) => handleInputChange('rainfall', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      <span>Get AI Recommendations</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Sample Data Buttons */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Test with Sample Data:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => loadSampleData('rice')}
                    className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    🌾 Rice Conditions
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleData('wheat')}
                    className="text-xs bg-yellow-50 text-yellow-700 px-3 py-2 rounded border border-yellow-200 hover:bg-yellow-100 transition-colors"
                  >
                    🌾 Wheat Conditions
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleData('corn')}
                    className="text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded border border-orange-200 hover:bg-orange-100 transition-colors"
                  >
                    🌽 Corn Conditions
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleData('soybean')}
                    className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded border border-purple-200 hover:bg-purple-100 transition-colors"
                  >
                    🌱 Soybean Conditions
                  </button>
                </div>
              </div>

              {/* Development/Demo Button */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={loadMockData}
                  disabled={loading}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  🧪 Try with Mock Data (Demo)
                </button>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Use this if the API is not accessible due to CORS or network issues
                </p>
              </div>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
            </div>

            {!response && !error && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Enter your soil analysis data to get AI-powered crop recommendations</p>
                <p className="text-sm text-gray-400">Fill in the form and click "Get AI Recommendations" to start</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-red-800 mb-2">Connection Error</h3>
                    <p className="text-red-700 text-sm mb-3">{error}</p>
                    
                    <div className="bg-red-100 rounded-lg p-3 mb-3">
                      <h4 className="font-medium text-red-800 text-sm mb-2">Possible Solutions:</h4>
                      <ul className="text-red-700 text-xs space-y-1 list-disc list-inside">
                        <li>Check your internet connection</li>
                        <li>The API server might be temporarily unavailable</li>
                        <li>CORS restrictions may be blocking the request</li>
                        <li>Try using the "Mock Data" button below for demonstration</li>
                      </ul>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setError(null)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={loadMockData}
                        className="text-red-600 hover:text-red-800 text-sm font-medium border-l border-red-300 pl-2"
                      >
                        Try Mock Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {response && (
              <div className="space-y-6">
                {/* Main Prediction */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Recommended Crop</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700 mb-2">{response.prediction}</p>
                  {response.confidence && (
                    <p className="text-sm text-gray-600">Confidence: {(response.confidence * 100).toFixed(1)}%</p>
                  )}
                </div>

                {/* Nutrient Status */}
                {response.nutrient_status && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Nutrient Analysis</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-700">Nitrogen</p>
                        <p className="text-lg font-bold text-green-600">{response.nutrient_status.nitrogen}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-700">Phosphorus</p>
                        <p className="text-lg font-bold text-orange-600">{response.nutrient_status.phosphorus}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-700">Potassium</p>
                        <p className="text-lg font-bold text-purple-600">{response.nutrient_status.potassium}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {response.recommendations && response.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Additional Recommendations</h4>
                    <div className="space-y-2">
                      {response.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Raw Response (for debugging) */}
                <details className="mt-6">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    View Raw API Response
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">NPK Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Enter your soil's Nitrogen, Phosphorus, and Potassium levels from recent soil testing for accurate crop recommendations.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Environmental Factors</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Climate conditions like temperature, humidity, and rainfall significantly impact crop selection and growth potential.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">AI Insights</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Our AI model analyzes all factors to recommend the most suitable crops for your specific soil and environmental conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAdvisor;