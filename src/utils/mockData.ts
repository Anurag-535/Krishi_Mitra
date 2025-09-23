import { Farm, Field, Alert, WeatherData, Sensor } from '../types/farm';

export const mockFarm: Farm = {
  id: '1',
  name: 'Green Valley Farm',
  totalArea: 850,
  location: { lat: 40.7128, lng: -74.0060 }
};

export const mockFields: Field[] = [
  {
    id: '1',
    name: 'North Field',
    area: 120,
    crop: 'Corn',
    plantingDate: '2024-04-15',
    healthScore: 85,
    status: 'healthy',
    zones: [
      { id: '1a', name: 'Zone A', status: 'healthy', waterStress: 20, pestRisk: 10, soilMoisture: 75 },
      { id: '1b', name: 'Zone B', status: 'caution', waterStress: 45, pestRisk: 25, soilMoisture: 45 }
    ]
  },
  {
    id: '2',
    name: 'West Field',
    area: 95,
    crop: 'Soybeans',
    plantingDate: '2024-05-01',
    healthScore: 72,
    status: 'caution',
    zones: [
      { id: '2a', name: 'Zone A', status: 'healthy', waterStress: 30, pestRisk: 15, soilMoisture: 65 },
      { id: '2b', name: 'Zone B', status: 'critical', waterStress: 75, pestRisk: 60, soilMoisture: 25 }
    ]
  },
  {
    id: '3',
    name: 'South Field',
    area: 180,
    crop: 'Wheat',
    plantingDate: '2024-03-20',
    healthScore: 91,
    status: 'healthy',
    zones: [
      { id: '3a', name: 'Zone A', status: 'healthy', waterStress: 15, pestRisk: 8, soilMoisture: 80 },
      { id: '3b', name: 'Zone B', status: 'healthy', waterStress: 18, pestRisk: 12, soilMoisture: 78 }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'Low Soil Moisture',
    description: 'Low soil moisture detected in West Field, Zone B',
    field: 'West Field',
    zone: 'Zone B',
    timestamp: new Date('2024-12-21T08:30:00'),
    resolved: false
  },
  {
    id: '2',
    severity: 'warning',
    title: 'Pest Risk Elevated',
    description: 'Increased pest activity detected in West Field',
    field: 'West Field',
    timestamp: new Date('2024-12-21T07:15:00'),
    resolved: false
  },
  {
    id: '3',
    severity: 'info',
    title: 'Sensor Maintenance',
    description: 'Soil sensor #3 battery at 15%',
    field: 'North Field',
    timestamp: new Date('2024-12-20T16:45:00'),
    resolved: false
  }
];

export const mockWeather: WeatherData[] = [
  {
    date: 'Today',
    temperature: { high: 72, low: 58 },
    condition: 'Partly Cloudy',
    icon: '⛅',
    precipitation: 10
  },
  {
    date: 'Tomorrow',
    temperature: { high: 75, low: 61 },
    condition: 'Sunny',
    icon: '☀️',
    precipitation: 0
  },
  {
    date: 'Wed',
    temperature: { high: 68, low: 55 },
    condition: 'Rain',
    icon: '🌧️',
    precipitation: 85
  },
  {
    date: 'Thu',
    temperature: { high: 70, low: 56 },
    condition: 'Cloudy',
    icon: '☁️',
    precipitation: 20
  },
  {
    date: 'Fri',
    temperature: { high: 73, low: 59 },
    condition: 'Sunny',
    icon: '☀️',
    precipitation: 5
  }
];

export const mockSensors: Sensor[] = [
  {
    id: '1',
    name: 'Soil Sensor #1',
    type: 'soil_moisture',
    status: 'online',
    value: 75,
    unit: '%',
    location: { lat: 40.7130, lng: -74.0058 }
  },
  {
    id: '2',
    name: 'Temp Sensor #2',
    type: 'temperature',
    status: 'online',
    value: 68,
    unit: '°F',
    location: { lat: 40.7125, lng: -74.0065 }
  },
  {
    id: '3',
    name: 'Soil Sensor #3',
    type: 'soil_moisture',
    status: 'low_battery',
    value: 45,
    unit: '%',
    location: { lat: 40.7135, lng: -74.0055 }
  }
];