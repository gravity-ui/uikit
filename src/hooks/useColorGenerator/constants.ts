import type {ThemeColorSettings} from './types';

const optionsFromLS: Record<string, ThemeColorSettings> = JSON.parse(
    localStorage.getItem('colorOptions') ?? '{}',
);

export const colorOptions: Record<string, ThemeColorSettings> = localStorage.getItem('colorOptions')
    ? optionsFromLS
    : {
          dark: {
              light: {
                  lightness: [25, 35],
                  situration: [45, 55],
              },
              medium: {
                  lightness: [40, 80],
                  situration: [15, 55],
              },
              heavy: {
                  lightness: [45, 55],
                  situration: [45, 55],
              },
          },
          light: {
              light: {
                  lightness: [90, 95],
                  situration: [5, 10],
              },
              medium: {
                  lightness: [75, 85],
                  situration: [15, 20],
              },
              heavy: {
                  lightness: [45, 55],
                  situration: [30, 40],
              },
          },
      };

export const WHITE_COLOR = '#ffffff';
export const BLACK_COLOR = '#000000';
