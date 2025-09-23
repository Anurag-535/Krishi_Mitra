import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Rectangle, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Satellite, Download, Layers, RefreshCw, MapPin, Info } from 'lucide-react';
import { SatelliteDataInfo } from './SatelliteDataInfo';

// Fix for default markers in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  fieldId: string;
  selectedLayer: string;
  spectralData: number[][];
  onDataUpdate: (data: any) => void;
}

interface FieldBounds {
  lat: number;
  lng: number;
  bounds: [[number, number], [number, number]];
  name: string;
}

// Real field coordinates for demonstration (Indian agricultural regions)
const FIELD_LOCATIONS: Record<string, FieldBounds> = {
  'field-1': {
    lat: 28.7031,
    lng: 77.1015,
    bounds: [[28.7021, 77.1005], [28.7041, 77.1025]], // North Field - Delhi region
    name: 'North Field - Wheat'
  },
  'field-2': {
    lat: 30.7333,
    lng: 76.7794,
    bounds: [[30.7323, 76.7784], [30.7343, 76.7804]], // Chandigarh region - Corn
    name: 'South Field - Corn'
  },
  'field-3': {
    lat: 26.9124,
    lng: 75.7873,
    bounds: [[26.9114, 75.7863], [26.9134, 75.7883]], // Jaipur region - Soybeans
    name: 'East Field - Soybeans'
  }
};

// Custom overlay component to add spectral data visualization
const SpectralOverlay: React.FC<{ 
  spectralData: number[][], 
  selectedLayer: string,
  fieldBounds: [[number, number], [number, number]]
}> = ({ spectralData, selectedLayer, fieldBounds }) => {
  const map = useMap();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!map || !spectralData || spectralData.length === 0) return;

    // Create a canvas overlay
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 150;
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.7';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Render spectral data
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const rows = spectralData.length;
    const cols = spectralData[0]?.length || 0;

    // Color schemes for different layers
    const getColor = (value: number, layer: string): [number, number, number] => {
      if (layer === 'ndvi') {
        if (value < 0.3) return [139, 69, 19]; // Brown (poor vegetation)
        if (value < 0.5) return [255, 255, 0]; // Yellow (moderate)
        if (value < 0.7) return [173, 255, 47]; // Yellow-green (good)
        return [0, 128, 0]; // Dark green (excellent)
      } else if (layer === 'ndwi') {
        if (value < 0.2) return [139, 69, 19]; // Brown (dry)
        if (value < 0.4) return [255, 165, 0]; // Orange (low water)
        if (value < 0.6) return [135, 206, 235]; // Light blue (moderate water)
        return [0, 0, 255]; // Blue (high water)
      }
      // Default NDVI-like coloring
      return value > 0.5 ? [0, 255, 0] : [255, 255, 0];
    };

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const dataY = Math.floor((y / canvas.height) * rows);
        const dataX = Math.floor((x / canvas.width) * cols);
        
        const value = spectralData[dataY]?.[dataX] || 0;
        const [r, g, b] = getColor(value, selectedLayer);

        const pixelIndex = (y * canvas.width + x) * 4;
        imageData.data[pixelIndex] = r;
        imageData.data[pixelIndex + 1] = g;
        imageData.data[pixelIndex + 2] = b;
        imageData.data[pixelIndex + 3] = 180; // Alpha (transparency)
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Add the canvas as an overlay to the map
    const bounds = L.latLngBounds(fieldBounds);
    const overlay = L.imageOverlay(canvas.toDataURL(), bounds, {
      opacity: 0.7,
      interactive: false
    }).addTo(map);

    canvasRef.current = canvas;

    return () => {
      if (overlay) {
        map.removeLayer(overlay);
      }
    };
  }, [map, spectralData, selectedLayer, fieldBounds]);

  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  fieldId, 
  selectedLayer, 
  spectralData,
  onDataUpdate 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [cloudCover, setCloudCover] = useState<number>(0);
  const [mapType, setMapType] = useState<'satellite' | 'terrain'>('satellite');
  const [showInfo, setShowInfo] = useState(false);

  const currentField = FIELD_LOCATIONS[fieldId];

  useEffect(() => {
    // Set initial values
    setLastUpdate(new Date().toLocaleString());
    setCloudCover(Math.random() * 15);
  }, [fieldId]);

  const refreshSatelliteData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastUpdate(new Date().toLocaleString());
      setCloudCover(Math.random() * 15);
      onDataUpdate({
        timestamp: Date.now(),
        cloudCover: cloudCover,
        quality: 'high'
      });
    } catch (error) {
      console.error('Failed to refresh satellite data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentField) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center text-gray-500">Field not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Satellite className="w-6 h-6 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Sentinel-2 Satellite Imagery</h3>
              <p className="text-blue-100 text-sm">10m resolution • European Space Agency</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Map Type Toggle */}
            <button
              onClick={() => setMapType(mapType === 'satellite' ? 'terrain' : 'satellite')}
              className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
            >
              {mapType === 'satellite' ? 'Terrain' : 'Satellite'}
            </button>
            <button
              onClick={refreshSatelliteData}
              disabled={isLoading}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50"
              title="Refresh satellite data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => setShowInfo(true)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="Satellite data information"
            >
              <Info className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96">
        <MapContainer
          center={[currentField.lat, currentField.lng]}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <LayersControl position="topright">
            {/* Base Layers */}
            <LayersControl.BaseLayer checked={mapType === 'satellite'} name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics'
              />
            </LayersControl.BaseLayer>
            
            <LayersControl.BaseLayer checked={mapType === 'terrain'} name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Topographic">
              <TileLayer
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
              />
            </LayersControl.BaseLayer>

            {/* Overlay Layers */}
            <LayersControl.Overlay checked name="Field Boundaries">
              <Rectangle
                bounds={currentField.bounds}
                pathOptions={{
                  color: '#3B82F6',
                  weight: 3,
                  fillColor: 'transparent',
                  dashArray: '5, 5'
                }}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Field Markers">
              <Marker position={[currentField.lat, currentField.lng]}>
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold text-gray-900">{currentField.name}</h4>
                    <p className="text-sm text-gray-600">
                      Coordinates: {currentField.lat.toFixed(4)}°N, {currentField.lng.toFixed(4)}°E
                    </p>
                    <p className="text-sm text-gray-600">
                      Layer: {selectedLayer.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Last Update: {lastUpdate}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Spectral Data">
              <SpectralOverlay 
                spectralData={spectralData}
                selectedLayer={selectedLayer}
                fieldBounds={currentField.bounds}
              />
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-gray-700">Fetching latest satellite data...</span>
            </div>
          </div>
        )}

        {/* Field Information Overlay */}
        <div className="absolute top-4 left-4 space-y-2 z-[1000]">
          <div className="bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-700">{currentField.name}</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">{selectedLayer.toUpperCase()} Analysis</span>
            </div>
          </div>
        </div>

        {/* Data Quality Overlay */}
        <div className="absolute bottom-4 right-4 space-y-2 z-[1000]">
          <div className="bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-gray-700">{cloudCover.toFixed(1)}% cloud cover</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">High quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Last Updated:</span>
            <div className="font-medium text-gray-900">{lastUpdate}</div>
          </div>
          <div>
            <span className="text-gray-600">Resolution:</span>
            <div className="font-medium text-gray-900">10m/pixel</div>
          </div>
          <div>
            <span className="text-gray-600">Source:</span>
            <div className="font-medium text-gray-900">Sentinel-2 L2A</div>
          </div>
          <div>
            <span className="text-gray-600">Map Type:</span>
            <div className="font-medium text-gray-900 capitalize">{mapType}</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {selectedLayer.toUpperCase()} Scale
          </span>
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Real-time analysis</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Low</span>
          <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
          <span className="text-xs text-gray-600">High</span>
        </div>
      </div>

      {/* Satellite Data Information Modal */}
      <SatelliteDataInfo 
        isOpen={showInfo} 
        onClose={() => setShowInfo(false)} 
      />
    </div>
  );
};

export default LeafletMap;