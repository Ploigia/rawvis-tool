export interface IValinorOptions {
  id?: number;
  csv?: string;
  xCol?: number;
  yCol?: number;
  delimiter?: string;
  gridSize?: number;
  threshold?: number;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
}

export const defaultValue: Readonly<IValinorOptions> = {};
