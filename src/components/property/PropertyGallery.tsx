import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightbox(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden h-96 lg:h-[500px]">
        {/* Main */}
        <div
          className="col-span-4 lg:col-span-3 relative group cursor-pointer overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[current] ?? images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                <ZoomIn size={22} className="text-gray-800" />
              </div>
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow hover:scale-110 transition-transform"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow hover:scale-110 transition-transform"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          <div className="absolute bottom-3 right-3">
            <button
              onClick={e => { e.stopPropagation(); openLightbox(current); }}
              className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg hover:bg-black/70 transition-colors"
            >
              <Maximize size={13} /> {images.length} photos
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-2">
          {images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className={`flex-1 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${current === i ? 'border-[#0F4C81]' : 'border-transparent hover:border-gray-300'}`}
              onClick={() => setCurrent(i)}
            >
              <img src={img} alt={`${title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
          {images.length > 3 && (
            <div
              className="flex-1 cursor-pointer overflow-hidden rounded-lg relative"
              onClick={() => openLightbox(3)}
            >
              <img src={images[3]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{images.length - 3}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
          >
            <X size={20} />
          </button>
          <div className="relative max-w-5xl max-h-screen px-16" onClick={e => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={title}
              className="max-h-[85vh] w-auto mx-auto rounded-xl object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setLightboxIndex(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => setLightboxIndex(i => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
