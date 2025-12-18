
import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Image as ImageIcon, 
  Settings, 
  User, 
  Type, 
  Flower, 
  Palette,
  Loader2,
  ChevronRight,
  Info
} from 'lucide-react';
import { PosterConfig, PosterTheme } from './types';
import { THEMES, SYMBOLS, DEFAULT_CONFIG } from './constants';
import { generatePosterImage } from './services/imageService';

const App: React.FC = () => {
  const [config, setConfig] = useState<PosterConfig>(DEFAULT_CONFIG);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const url = await generatePosterImage(config);
      setPosterUrl(url);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra trong quá trình tạo poster.');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateConfig = (updates: Partial<PosterConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-96 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-8 overflow-y-auto max-h-screen shrink-0 custom-scrollbar">
        <header className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg shadow-sm shrink-0">
            <img 
              src="https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-Doan-Thanh-NIen-Cong-San-Ho-Chi-Minh-1.png" 
              alt="Logo Đoàn TNCS Hồ Chí Minh" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-tight font-serif">Tết 2026 Designer</h1>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">Đoàn Phường Sa Đéc</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">Bính Ngọ • 2026</p>
          </div>
        </header>

        <div className="space-y-6">
          <section>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-300">
              <Palette className="w-4 h-4 text-red-500" /> PHONG CÁCH THIẾT KẾ
            </label>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateConfig({ theme: t.id as PosterTheme })}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    config.theme === t.id 
                      ? 'border-red-600 bg-red-600/10 text-red-100' 
                      : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{t.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <User className="w-4 h-4 text-red-500" /> THÔNG TIN NGƯỜI TẶNG
            </label>
            <input
              type="text"
              placeholder="Tên cơ quan, đơn vị hoặc cá nhân..."
              value={config.senderName}
              onChange={(e) => updateConfig({ senderName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            />
          </section>

          <section className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Type className="w-4 h-4 text-red-500" /> THÔNG ĐIỆP CHÚC MỪNG
            </label>
            <input
              type="text"
              placeholder="Tiêu đề chính..."
              value={config.mainGreeting}
              onChange={(e) => updateConfig({ mainGreeting: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 mb-2 transition-all"
            />
            <textarea
              placeholder="Lời chúc chi tiết..."
              rows={2}
              value={config.subGreeting}
              onChange={(e) => updateConfig({ subGreeting: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            />
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-300">
              <Flower className="w-4 h-4 text-red-500" /> BIỂU TƯỢNG TRUNG TÂM
            </label>
            <div className="space-y-2">
              {SYMBOLS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateConfig({ mainSymbol: s.id as any })}
                  className={`w-full p-3 text-left rounded-xl border flex items-center justify-between transition-all ${
                    config.mainSymbol === s.id 
                      ? 'border-red-600 bg-red-600/10 text-red-100' 
                      : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-[10px] mt-1 opacity-70">{s.description}</p>
                  </div>
                  {config.mainSymbol === s.id && <ChevronRight className="w-4 h-4 text-red-500" />}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-300">
              <Settings className="w-4 h-4 text-red-500" /> TỶ LỆ IN ẤN
            </label>
            <div className="flex gap-2">
              {(['A3', 'A2'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => updateConfig({ aspectRatio: r })}
                  className={`flex-1 py-2 text-sm rounded-xl border transition-all ${
                    config.aspectRatio === r 
                      ? 'border-red-600 bg-red-600/10 text-red-100' 
                      : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {r} (Dọc)
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-red-900/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>ĐANG THIẾT KẾ...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>TẠO POSTER NGAY</span>
              </>
            )}
          </button>
          
          <footer className="text-center">
            <p className="text-[10px] text-slate-500 font-medium">
              Sản phẩm được thực hiện bởi <span className="text-red-500 font-bold">Đoàn Phường Sa Đéc</span>
            </p>
          </footer>
        </div>
      </aside>

      {/* Preview Area */}
      <main className="flex-1 relative bg-slate-950 flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent"></div>
           <div className="grid grid-cols-12 h-full w-full">
             {Array.from({length: 48}).map((_, i) => (
               <div key={i} className="border border-slate-800/20"></div>
             ))}
           </div>
        </div>

        {error && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 bg-red-900/50 border border-red-500/50 text-red-200 px-6 py-3 rounded-2xl backdrop-blur-md flex items-center gap-3 max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
            <Info className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="relative z-10 w-full h-full max-w-2xl flex flex-col items-center justify-center gap-6">
          {!posterUrl && !isGenerating && (
            <div className="text-center space-y-4 max-w-sm">
              <div className="w-24 h-24 bg-slate-900/80 rounded-full flex items-center justify-center mx-auto border-2 border-slate-800 shadow-xl overflow-hidden p-4">
                <img 
                  src="https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-Doan-Thanh-NIen-Cong-San-Ho-Chi-Minh-1.png" 
                  alt="Background Logo" 
                  className="w-full h-full object-contain opacity-20"
                />
              </div>
              <h2 className="text-2xl font-serif text-slate-300">Sẵn sàng thiết kế</h2>
              <p className="text-slate-500 text-sm">
                Hãy tùy chỉnh thông tin bên trái và nhấn nút "Tạo Poster" để bắt đầu sáng tạo ấn phẩm Tết Bính Ngọ 2026.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-72 h-96 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl flex items-center justify-center">
                 <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent animate-scan"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-serif text-red-500 italic">AI đang kiến tạo nghệ thuật...</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Vui lòng đợi giây lát</p>
              </div>
            </div>
          )}

          {posterUrl && !isGenerating && (
            <div className="w-full h-full flex flex-col items-center gap-6">
              <div className="relative group shadow-2xl shadow-red-950/20 max-h-[80vh] aspect-[3/4] bg-slate-900 rounded-lg overflow-hidden border-4 border-slate-800 p-1">
                <img 
                  src={posterUrl} 
                  alt="Tet 2026 Poster" 
                  className="w-full h-full object-contain rounded"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={posterUrl} 
                    download={`Tet2026_Poster_${config.theme}.png`}
                    className="bg-white text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-red-50 transition-colors"
                  >
                    <Download className="w-5 h-5" /> TẢI VỀ
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-md">
                 <h3 className="text-xl font-serif text-slate-100">Ấn phẩm Tết Bính Ngọ 2026</h3>
                 <p className="text-slate-500 text-xs mt-2 italic">Dành cho: {config.senderName || '(Chưa nhập tên người tặng)'}</p>
                 <div className="flex gap-2 mt-4">
                   <button 
                    onClick={handleGenerate}
                    className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest px-4 py-2 border border-slate-800 rounded-full transition-colors"
                   >
                     Tạo phiên bản khác
                   </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
