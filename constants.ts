
export const THEMES = [
  { id: 'traditional', name: 'Truyền Thống', description: 'Đỏ, Vàng, Hoa Đào/Mai rực rỡ' },
  { id: 'imperial', name: 'Hoàng Gia', description: 'Xanh Đậm, Vàng Kim, Trống Đồng' },
  { id: 'modern', name: 'Hiện Đại', description: 'Tối giản, Sang trọng, Đẳng cấp' },
  { id: 'corporate', name: 'Doanh Nghiệp', description: 'Chuyên nghiệp, Vững chãi, Phát triển' },
] as const;

export const SYMBOLS = [
  { id: 'horse', name: 'Linh Vật Ngựa', description: 'Tượng trưng cho tốc độ và bền bỉ' },
  { id: 'horse_growth', name: 'Ngựa Phát Triển', description: 'Hướng tới thành công và vinh quang' },
  { id: 'bronze_drum', name: 'Trống Đồng', description: 'Bản sắc văn hóa Việt Nam' },
] as const;

export const DEFAULT_CONFIG = {
  theme: 'imperial',
  senderName: '',
  mainGreeting: 'Chúc Mừng Năm Mới 2026',
  subGreeting: 'An Khang - Thịnh Vượng - Vạn Sự Như Ý',
  mainSymbol: 'horse',
  accentColor: 'gold',
  aspectRatio: 'A3',
} as const;
