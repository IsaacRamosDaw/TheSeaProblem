declare module '@/shared/types/oil-spill' {
  export interface OilSpillFeature {
    id: string;
    geometry: {
      type: "Point";
      coordinates: [number, number]; // [longitude, latitude]
    };
    slick_timestamp: string;
    area: number;
    machine_confidence: number;
  }
} 