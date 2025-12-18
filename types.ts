
export type PosterTheme = 'traditional' | 'modern' | 'imperial' | 'corporate';

export interface PosterConfig {
  theme: PosterTheme;
  senderName: string;
  mainGreeting: string;
  subGreeting: string;
  mainSymbol: 'horse' | 'horse_growth' | 'bronze_drum';
  accentColor: 'gold' | 'silver' | 'red';
  aspectRatio: 'A3' | 'A2';
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}
