export interface ThemeConfig {
  label: string
  primary: string
  light: string
  foreground: string
  hex: string
}

export const THEMES: Record<string, ThemeConfig> = {
  Gold: {
    label: 'Dourado',
    primary: '32 27% 69%',
    light: '32 27% 85%',
    foreground: '30 20% 11%',
    hex: '#C9B298'
  },
  Indigo: {
    label: 'Índigo',
    primary: '241 61% 59%',
    light: '241 61% 80%',
    foreground: '0 0% 100%',
    hex: '#5856D6'
  },
  Cyan: {
    label: 'Ciano',
    primary: '199 77% 55%',
    light: '199 77% 80%',
    foreground: '0 0% 100%',
    hex: '#32ADE6'
  },
  Mint: {
    label: 'Menta',
    primary: '177 100% 39%',
    light: '177 100% 70%',
    foreground: '0 0% 100%',
    hex: '#00C7BE'
  },
  Teal: {
    label: 'Turquesa',
    primary: '189 61% 48%',
    light: '189 61% 75%',
    foreground: '0 0% 100%',
    hex: '#30B0C7'
  },
  Pink: {
    label: 'Vermelho',
    primary: '349 100% 59%',
    light: '349 100% 80%',
    foreground: '0 0% 100%',
    hex: '#FF2D55'
  }
}

export type ThemeName = keyof typeof THEMES
