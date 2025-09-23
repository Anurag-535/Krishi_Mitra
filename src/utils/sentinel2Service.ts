// Sentinel-2 Satellite Data Service
// Integrates with open satellite data APIs for real agricultural monitoring

export interface Sentinel2Data {
  bands: {
    B02: number[][]; // Blue (490nm)
    B03: number[][]; // Green (560nm)  
    B04: number[][]; // Red (665nm)
    B05: number[][]; // Red Edge (705nm)
    B06: number[][]; // Red Edge (740nm)
    B07: number[][]; // Red Edge (783nm)
    B08: number[][]; // NIR (842nm)
    B8A: number[][]; // Narrow NIR (865nm)
    B11: number[][]; // SWIR (1610nm)
    B12: number[][]; // SWIR (2190nm)
  };
  metadata: {
    acquisitionDate: string;
    cloudCover: number;
    resolution: number;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
}

export interface SpectralIndices {
  ndvi: number[][];
  evi: number[][];
  savi: number[][];
  ndwi: number[][];
  chlorophyll: number[][];
  lai: number[][]; // Leaf Area Index
}

export interface FieldCoordinates {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: {
    lat: number;
    lon: number;
  };
}

// Sample field coordinates for demonstration
export const FIELD_COORDINATES: Record<string, FieldCoordinates> = {
  'field-1': {
    id: 'field-1',
    name: 'North Field',
    bounds: {
      north: 28.7041,
      south: 28.7021,
      east: 77.1025,
      west: 77.1005
    },
    center: { lat: 28.7031, lon: 77.1015 }
  },
  'field-2': {
    id: 'field-2', 
    name: 'South Field',
    bounds: {
      north: 28.7021,
      south: 28.7001,
      east: 77.1025,
      west: 77.1005
    },
    center: { lat: 28.7011, lon: 77.1015 }
  },
  'field-3': {
    id: 'field-3',
    name: 'East Field', 
    bounds: {
      north: 28.7041,
      south: 28.7011,
      east: 77.1045,
      west: 77.1025
    },
    center: { lat: 28.7026, lon: 77.1035 }
  }
};

export class Sentinel2Service {
  private static instance: Sentinel2Service;
  private cache: Map<string, Sentinel2Data> = new Map();

  private constructor() {}

  static getInstance(): Sentinel2Service {
    if (!Sentinel2Service.instance) {
      Sentinel2Service.instance = new Sentinel2Service();
    }
    return Sentinel2Service.instance;
  }

  // Calculate NDVI from Sentinel-2 bands
  calculateNDVI(nir: number[][], red: number[][]): number[][] {
    const ndvi: number[][] = [];
    for (let i = 0; i < nir.length; i++) {
      ndvi[i] = [];
      for (let j = 0; j < nir[i].length; j++) {
        const nirVal = nir[i][j];
        const redVal = red[i][j];
        if (nirVal + redVal === 0) {
          ndvi[i][j] = 0;
        } else {
          ndvi[i][j] = (nirVal - redVal) / (nirVal + redVal);
        }
      }
    }
    return ndvi;
  }

  // Calculate Enhanced Vegetation Index (EVI)
  calculateEVI(nir: number[][], red: number[][], blue: number[][]): number[][] {
    const evi: number[][] = [];
    for (let i = 0; i < nir.length; i++) {
      evi[i] = [];
      for (let j = 0; j < nir[i].length; j++) {
        const nirVal = nir[i][j];
        const redVal = red[i][j];
        const blueVal = blue[i][j];
        const denominator = nirVal + 6 * redVal - 7.5 * blueVal + 1;
        if (denominator === 0) {
          evi[i][j] = 0;
        } else {
          evi[i][j] = 2.5 * (nirVal - redVal) / denominator;
        }
      }
    }
    return evi;
  }

  // Calculate Soil Adjusted Vegetation Index (SAVI)
  calculateSAVI(nir: number[][], red: number[][], L = 0.5): number[][] {
    const savi: number[][] = [];
    for (let i = 0; i < nir.length; i++) {
      savi[i] = [];
      for (let j = 0; j < nir[i].length; j++) {
        const nirVal = nir[i][j];
        const redVal = red[i][j];
        const denominator = nirVal + redVal + L;
        if (denominator === 0) {
          savi[i][j] = 0;
        } else {
          savi[i][j] = (1 + L) * (nirVal - redVal) / denominator;
        }
      }
    }
    return savi;
  }

  // Calculate Normalized Difference Water Index (NDWI)
  calculateNDWI(nir: number[][], swir: number[][]): number[][] {
    const ndwi: number[][] = [];
    for (let i = 0; i < nir.length; i++) {
      ndwi[i] = [];
      for (let j = 0; j < nir[i].length; j++) {
        const nirVal = nir[i][j];
        const swirVal = swir[i][j];
        if (nirVal + swirVal === 0) {
          ndwi[i][j] = 0;
        } else {
          ndwi[i][j] = (nirVal - swirVal) / (nirVal + swirVal);
        }
      }
    }
    return ndwi;
  }

  // Generate synthetic Sentinel-2 data for demonstration
  // In production, this would fetch from actual Sentinel Hub API or similar service
  async fetchSentinel2Data(fieldId: string, date?: string): Promise<Sentinel2Data> {
    const cacheKey = `${fieldId}-${date || 'latest'}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const field = FIELD_COORDINATES[fieldId];
    if (!field) {
      throw new Error(`Field ${fieldId} not found`);
    }

    // Generate synthetic but realistic spectral data
    const size = 80; // 80x80 pixel grid for higher resolution demonstration
    const bands: Sentinel2Data['bands'] = {
      B02: this.generateBandData(size, 0.1, 0.2), // Blue
      B03: this.generateBandData(size, 0.2, 0.3), // Green  
      B04: this.generateBandData(size, 0.3, 0.4), // Red
      B05: this.generateBandData(size, 0.4, 0.5), // Red Edge
      B06: this.generateBandData(size, 0.5, 0.6), // Red Edge
      B07: this.generateBandData(size, 0.6, 0.7), // Red Edge
      B08: this.generateBandData(size, 0.7, 0.8), // NIR
      B8A: this.generateBandData(size, 0.75, 0.85), // Narrow NIR
      B11: this.generateBandData(size, 0.2, 0.4), // SWIR
      B12: this.generateBandData(size, 0.1, 0.3), // SWIR
    };

    const data: Sentinel2Data = {
      bands,
      metadata: {
        acquisitionDate: date || new Date().toISOString().split('T')[0],
        cloudCover: Math.random() * 20, // 0-20% cloud cover
        resolution: 10, // 10m resolution
        coordinates: field.center
      }
    };

    this.cache.set(cacheKey, data);
    return data;
  }

  // Calculate all spectral indices from Sentinel-2 data
  calculateSpectralIndices(data: Sentinel2Data): SpectralIndices {
    return {
      ndvi: this.calculateNDVI(data.bands.B08, data.bands.B04),
      evi: this.calculateEVI(data.bands.B08, data.bands.B04, data.bands.B02),
      savi: this.calculateSAVI(data.bands.B08, data.bands.B04),
      ndwi: this.calculateNDWI(data.bands.B08, data.bands.B11),
      chlorophyll: this.calculateChlorophyllIndex(data.bands.B05, data.bands.B04),
      lai: this.calculateLAI(data.bands.B08, data.bands.B04)
    };
  }

  // Calculate chlorophyll index using red edge bands
  private calculateChlorophyllIndex(redEdge: number[][], red: number[][]): number[][] {
    const chlorophyll: number[][] = [];
    for (let i = 0; i < redEdge.length; i++) {
      chlorophyll[i] = [];
      for (let j = 0; j < redEdge[i].length; j++) {
        if (red[i][j] === 0) {
          chlorophyll[i][j] = 0;
        } else {
          chlorophyll[i][j] = (redEdge[i][j] / red[i][j]) - 1;
        }
      }
    }
    return chlorophyll;
  }

  // Calculate Leaf Area Index approximation
  private calculateLAI(nir: number[][], red: number[][]): number[][] {
    const lai: number[][] = [];
    for (let i = 0; i < nir.length; i++) {
      lai[i] = [];
      for (let j = 0; j < nir[i].length; j++) {
        const ndvi = (nir[i][j] - red[i][j]) / (nir[i][j] + red[i][j]);
        // Simple LAI approximation from NDVI
        lai[i][j] = Math.max(0, -Math.log(1 - ndvi) / 0.5);
      }
    }
    return lai;
  }

  // Generate realistic synthetic band data with agricultural field patterns
  private generateBandData(size: number, min: number, max: number): number[][] {
    const data: number[][] = [];
    
    for (let i = 0; i < size; i++) {
      data[i] = [];
      for (let j = 0; j < size; j++) {
        // Create field-like patterns with zones representing different crop areas
        const zoneX = Math.floor(j / (size / 3)); // 3 zones horizontally
        const zoneY = Math.floor(i / (size / 2)); // 2 zones vertically
        
        // Base value varies by zone (different crop health areas)
        let baseValue = min + (max - min) * 0.6;
        if (zoneX === 0) baseValue += (max - min) * 0.25; // Healthier zone
        if (zoneX === 2) baseValue -= (max - min) * 0.15; // Slightly stressed zone
        if (zoneY === 1) baseValue += (max - min) * 0.1;  // Better irrigation
        
        // Add field structure with crop rows/furrows
        const rowPattern = Math.sin(j * 0.8) * 0.03;
        const columnPattern = Math.cos(i * 0.6) * 0.02;
        
        // Add realistic field variations
        const fieldVariation = (Math.random() - 0.5) * 0.08;
        
        // Add field boundaries and edge effects
        const distanceFromCenter = Math.sqrt((i - size/2)**2 + (j - size/2)**2);
        const edgeEffect = distanceFromCenter > size * 0.45 ? -0.08 : 0;
        
        // Create some stressed patches (disease/pest areas)
        const stressPatch1 = (i > size*0.6 && i < size*0.8 && j > size*0.1 && j < size*0.3) ? -0.15 : 0;
        const stressPatch2 = (i > size*0.2 && i < size*0.4 && j > size*0.7 && j < size*0.9) ? -0.1 : 0;
        
        const finalValue = baseValue + rowPattern + columnPattern + fieldVariation + edgeEffect + stressPatch1 + stressPatch2;
        data[i][j] = Math.max(0, Math.min(1, finalValue));
      }
    }
    return data;
  }

  // Get available dates for a field (simulated)
  getAvailableDates(fieldId: string): string[] {
    const dates: string[] = [];
    const today = new Date();
    
    // Generate dates for the last 6 months (Sentinel-2 revisit time is ~5 days)
    for (let i = 0; i < 36; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * 5));
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }

  // Convert spectral indices to visualization colors
  getVisualizationData(indices: SpectralIndices, type: string): number[][] {
    switch (type) {
      case 'ndvi':
        return indices.ndvi;
      case 'evi':
        return indices.evi;
      case 'savi':
        return indices.savi;
      case 'ndwi':
        return indices.ndwi;
      case 'chlorophyll':
        return indices.chlorophyll;
      case 'lai':
        return indices.lai;
      default:
        return indices.ndvi;
    }
  }
}

export const sentinel2Service = Sentinel2Service.getInstance();