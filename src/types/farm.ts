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
}

export interface Zone {
  id: string;
  name: string;
  status: 'healthy' | 'caution' | 'critical';
  waterStress: number;
  pestRisk: number;
  soilMoisture: number;
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