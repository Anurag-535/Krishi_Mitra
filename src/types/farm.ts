export interface Farm {
  id: string;
  name: string;
  totalArea: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Field {
  id: string;
  name: string;
  area: number;
  crop: string;
  plantingDate: string;
  healthScore: number;
  status: 'healthy' | 'caution' | 'critical';
  zones: Zone[];
  spectralData: SpectralData;
  environmentalData: EnvironmentalData;
  aiPredictions: AIPredictions;
}

export interface Zone {
  id: string;
  name: string;
  status: 'healthy' | 'caution' | 'critical';
  waterStress: number;
  pestRisk: number;
  soilMoisture: number;
  coordinates: [number, number][];
  spectralIndices: SpectralIndices;
}

export interface SpectralData {
  ndvi: number; // Normalized Difference Vegetation Index
  evi: number;  // Enhanced Vegetation Index
  savi: number; // Soil Adjusted Vegetation Index
  msavi: number; // Modified Soil Adjusted Vegetation Index
  chlorophyllContent: number;
  waterContent: number;
  nitrogenContent: number;
  lastUpdated: Date;
  anomalies: SpectralAnomaly[];
}

export interface SpectralIndices {
  ndvi: number;
  evi: number;
  savi: number;
  lai: number; // Leaf Area Index
  chlorophyll: number;
  stress: number;
}

export interface SpectralAnomaly {
  id: string;
  type: 'disease' | 'pest' | 'nutrient_deficiency' | 'water_stress';
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  location: [number, number];
  timestamp: Date;
  description: string;
}

export interface EnvironmentalData {
  soilMoisture: number;
  soilTemperature: number;
  airTemperature: number;
  humidity: number;
  leafWetness: number;
  windSpeed: number;
  windDirection: number;
  solarRadiation: number;
  precipitation: number;
  lastUpdated: Date;
  sensors: SensorReading[];
}

export interface SensorReading {
  id: string;
  type: 'soil_moisture' | 'temperature' | 'humidity' | 'leaf_wetness' | 'ph' | 'nutrients';
  value: number;
  unit: string;
  location: [number, number];
  timestamp: Date;
  status: 'active' | 'inactive' | 'error';
}

export interface AIPredictions {
  cropStressPrediction: {
    probability: number;
    type: 'water' | 'nutrient' | 'disease' | 'pest';
    timeframe: '24h' | '48h' | '7d';
    confidence: number;
  };
  yieldPrediction: {
    estimatedYield: number;
    confidence: number;
    factors: string[];
  };
  pestOutbreakRisk: {
    probability: number;
    pestType: string;
    riskFactors: string[];
    recommendedAction: string;
  };
  diseaseRisk: {
    probability: number;
    diseaseType: string;
    symptoms: string[];
    preventiveMeasures: string[];
  };
  lastUpdated: Date;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  field: string;
  zone?: string;
  timestamp: Date;
  resolved: boolean;
  type: 'spectral_anomaly' | 'environmental' | 'ai_prediction' | 'sensor_malfunction';
  actionRequired: boolean;
  recommendedActions: string[];
}

export interface WeatherData {
  date: string;
  temperature: {
    high: number;
    low: number;
  };
  condition: string;
  icon: string;
  precipitation: number;
}

export interface Sensor {
  id: string;
  name: string;
  type: 'soil_moisture' | 'temperature' | 'humidity' | 'ph';
  status: 'online' | 'offline' | 'low_battery';
  value: number;
  unit: string;
  location: {
    lat: number;
    lng: number;
  };
}