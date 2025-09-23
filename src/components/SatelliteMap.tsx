import React, { useEffect, useRef, useState } from 'react';
import { Satellite, Calendar, Download, Layers, RefreshCw } from 'lucide-react';

interface SatelliteMapProps {
  fieldId: string;
  selectedLayer: string;
  spectralData: number[][];
  onDataUpdate: (data: any) => void;
}

const SatelliteMap: React.FC<SatelliteMapProps> = ({ 
  fieldId, 
  selectedLayer, 
  spectralData,
  onDataUpdate 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [cloudCover, setCloudCover] = useState<number>(0);

  // Color schemes for different spectral indices
  const colorSchemes = {
    ndvi: [
      { value: -1, color: [139, 69, 19] },    // Brown (bare soil/dead vegetation)
      { value: 0, color: [255, 255, 0] },     // Yellow (sparse vegetation)
      { value: 0.3, color: [173, 255, 47] },  // Yellow-green (moderate vegetation)
      { value: 0.6, color: [0, 255, 0] },     // Green (healthy vegetation)
      { value: 1, color: [0, 100, 0] }        // Dark green (very healthy vegetation)
    ],
    evi: [
      { value: -1, color: [139, 69, 19] },
      { value: 0, color: [255, 165, 0] },
      { value: 0.4, color: [255, 255, 0] },
      { value: 0.8, color: [0, 255, 0] },
      { value: 1, color: [0, 128, 0] }
    ],
    savi: [
      { value: -1, color: [165, 42, 42] },
      { value: 0, color: [255, 140, 0] },
      { value: 0.3, color: [255, 215, 0] },
      { value: 0.6, color: [50, 205, 50] },
      { value: 1, color: [34, 139, 34] }
    ],
    chlorophyll: [
      { value: -1, color: [255, 0, 0] },
      { value: 0, color: [255, 255, 0] },
      { value: 0.5, color: [173, 255, 47] },
      { value: 1, color: [0, 255, 0] },
      { value: 2, color: [0, 100, 0] }
    ],
    water: [
      { value: -1, color: [139, 69, 19] },
      { value: 0, color: [255, 165, 0] },
      { value: 0.3, color: [135, 206, 235] },
      { value: 0.6, color: [0, 191, 255] },
      { value: 1, color: [0, 0, 255] }
    ],
    stress: [
      { value: 0, color: [0, 255, 0] },       // Green (no stress)
      { value: 0.3, color: [255, 255, 0] },   // Yellow (low stress)
      { value: 0.6, color: [255, 165, 0] },   // Orange (moderate stress)
      { value: 1, color: [255, 0, 0] }        // Red (high stress)
    ]
  };

  // Interpolate color based on value
  const interpolateColor = (value: number, scheme: any[]): [number, number, number] => {
    // Clamp value to scheme range
    const minVal = scheme[0].value;
    const maxVal = scheme[scheme.length - 1].value;
    const clampedValue = Math.max(minVal, Math.min(maxVal, value));

    // Find the two colors to interpolate between
    for (let i = 0; i < scheme.length - 1; i++) {
      if (clampedValue >= scheme[i].value && clampedValue <= scheme[i + 1].value) {
        const t = (clampedValue - scheme[i].value) / (scheme[i + 1].value - scheme[i].value);
        const color1 = scheme[i].color;
        const color2 = scheme[i + 1].color;
        
        return [
          Math.round(color1[0] + t * (color2[0] - color1[0])),
          Math.round(color1[1] + t * (color2[1] - color1[1])),
          Math.round(color1[2] + t * (color2[2] - color1[2]))
        ];
      }
    }
    
    return scheme[0].color as [number, number, number];
  };

  // Render the spectral data as a colored map with field boundaries
  const renderSpectralMap = () => {
    const canvas = canvasRef.current;
    if (!canvas || !spectralData || spectralData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);

    const rows = spectralData.length;
    const cols = spectralData[0].length;

    // First pass: render spectral data with smoothing
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Map canvas coordinates to data coordinates with interpolation
        const dataY = (y / height) * (rows - 1);
        const dataX = (x / width) * (cols - 1);
        
        const y1 = Math.floor(dataY);
        const y2 = Math.min(y1 + 1, rows - 1);
        const x1 = Math.floor(dataX);
        const x2 = Math.min(x1 + 1, cols - 1);
        
        // Bilinear interpolation for smoother appearance
        const value1 = spectralData[y1] ? spectralData[y1][x1] || 0 : 0;
        const value2 = spectralData[y1] ? spectralData[y1][x2] || 0 : 0;
        const value3 = spectralData[y2] ? spectralData[y2][x1] || 0 : 0;
        const value4 = spectralData[y2] ? spectralData[y2][x2] || 0 : 0;
        
        const fx = dataX - x1;
        const fy = dataY - y1;
        
        const interpolatedValue = 
          value1 * (1 - fx) * (1 - fy) +
          value2 * fx * (1 - fy) +
          value3 * (1 - fx) * fy +
          value4 * fx * fy;
        
        const scheme = colorSchemes[selectedLayer as keyof typeof colorSchemes] || colorSchemes.ndvi;
        const [r, g, b] = interpolateColor(interpolatedValue, scheme);

        const pixelIndex = (y * width + x) * 4;
        imageData.data[pixelIndex] = r;     // Red
        imageData.data[pixelIndex + 1] = g; // Green
        imageData.data[pixelIndex + 2] = b; // Blue
        imageData.data[pixelIndex + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
    
    // Second pass: add field boundaries and annotations
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    
    // Draw field zone boundaries
    const zoneWidth = width / 3;
    const zoneHeight = height / 2;
    
    // Vertical boundaries
    ctx.beginPath();
    ctx.moveTo(zoneWidth, 0);
    ctx.lineTo(zoneWidth, height);
    ctx.moveTo(zoneWidth * 2, 0);
    ctx.lineTo(zoneWidth * 2, height);
    ctx.stroke();
    
    // Horizontal boundary
    ctx.beginPath();
    ctx.moveTo(0, zoneHeight);
    ctx.lineTo(width, zoneHeight);
    ctx.stroke();
    
    // Add field markers for problem areas
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    // Mark stressed areas
    const markerSize = 8;
    const marker1X = width * 0.2;
    const marker1Y = height * 0.7;
    const marker2X = width * 0.8;
    const marker2Y = height * 0.3;
    
    // Stress marker 1
    ctx.beginPath();
    ctx.arc(marker1X, marker1Y, markerSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Stress marker 2
    ctx.beginPath();
    ctx.arc(marker2X, marker2Y, markerSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Add healthy zone markers
    ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
    const healthyMarkerX = width * 0.15;
    const healthyMarkerY = height * 0.2;
    
    ctx.beginPath();
    ctx.arc(healthyMarkerX, healthyMarkerY, markerSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  // Simulate fetching new satellite data
  const refreshSatelliteData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update metadata
      setLastUpdate(new Date().toLocaleString());
      setCloudCover(Math.random() * 15); // 0-15% cloud cover
      
      // Trigger data update callback
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

  useEffect(() => {
    renderSpectralMap();
  }, [spectralData, selectedLayer]);

  useEffect(() => {
    // Set initial last update time
    setLastUpdate(new Date().toLocaleString());
    setCloudCover(Math.random() * 15);
  }, [fieldId]);

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
            <button
              onClick={refreshSatelliteData}
              disabled={isLoading}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50"
              title="Refresh satellite data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Satellite Map Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full h-80 object-cover rounded-lg"
          style={{ imageRendering: 'auto' }}
        />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-gray-700">Fetching latest satellite data...</span>
            </div>
          </div>
        )}

        {/* Information Overlays */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Healthy vegetation</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">Stress detected</span>
            </div>
          </div>
        </div>

        {/* Field Coordinates */}
        <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg px-3 py-2 text-xs backdrop-blur-sm">
          <div className="text-gray-600">Coordinates:</div>
          <div className="font-mono text-gray-800">28.7031°N, 77.1015°E</div>
        </div>

        {/* Cloud Cover Indicator */}
        {cloudCover > 0 && (
          <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg px-3 py-2 text-sm backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-gray-700">{cloudCover.toFixed(1)}% cloud cover</span>
            </div>
          </div>
        )}
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
            <span className="text-gray-600">Quality:</span>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium text-gray-900">High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {selectedLayer.toUpperCase()} Scale
          </span>
          <Layers className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Low</span>
          <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
          <span className="text-xs text-gray-600">High</span>
        </div>
      </div>
    </div>
  );
};

export default SatelliteMap;