import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Clock, Phone, Images, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * =========================================================================
 * PERSONAL PHOTO GALLERY
 * =========================================================================
 * Photos located in: public/images/gallery/
 * To add a new photo:
 * 1. Copy the image into: public/images/gallery/
 * 2. Add its path "/images/gallery/filename.ext" to this array.
 * =========================================================================
 */
const GALLERY_PHOTOS: string[] = [
  '/images/gallery/IMG20251110064436.jpg',
  '/images/gallery/IMG_20260118_232048.jpg',
  '/images/gallery/IMG20251110072448.jpg',
  '/images/gallery/IMG_20260902_161059.jpg',
  '/images/gallery/IMG_20251111_024648.jpg',
  '/images/gallery/IMG_20260118_232929.jpg',
  '/images/gallery/IMG_20260912_184523.jpg',
  '/images/gallery/IMG20251110081816.jpg',
  '/images/gallery/IMG_1777.jpg',
  '/images/gallery/IMG_20251210_183907_1.jpg',
  '/images/gallery/IMG_20251210_202627.jpg',
  '/images/gallery/IMG_20251220_202055.jpg',
  '/images/gallery/IMG_20260324_103743.jpg',
  '/images/gallery/IMG_20260413_133230.jpg',
  '/images/gallery/IMG_3622.jpg',
  '/images/gallery/IMG_3788.jpeg',
  '/images/gallery/IMG_20260912_185225.jpg',
  '/images/gallery/IMG_20260118_232200.jpg',
];

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const StudioContact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    if (galleryOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [galleryOpen]);

  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPhotoIndex !== null) {
          setSelectedPhotoIndex(null);
        } else {
          setGalleryOpen(false);
        }
      } else if (e.key === 'ArrowRight' && selectedPhotoIndex !== null) {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0));
      } else if (e.key === 'ArrowLeft' && selectedPhotoIndex !== null) {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, selectedPhotoIndex]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in GMT+5:30 (India Standard Time) matching Kavish reference (e.g. "11:04 pm GMT+5:30")
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).toLowerCase();
      setLocalTime(`${timeStr} GMT+5:30`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioData.profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <footer id="contact" className="relative bg-[#080808] pt-24 sm:pt-36 pb-16 px-4 sm:px-8 overflow-hidden [perspective:1200px]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-sans font-semibold text-xs uppercase tracking-widest text-zinc-500">
            05 // COLLABORATION & INQUIRY
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        {/* Big Editorial Headline & Magnetic Contact Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 pb-16 border-b border-white/10">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
              {/* Real Photo Avatar Circle */}
              <img
                src="/images/neeraj_avatar.jpg"
                alt="Narendra Singh Yadav (Neeraj)"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/20 shadow-xl shrink-0"
              />
              <div>
                <span className="text-base sm:text-lg font-sans font-bold text-white tracking-normal block">
                  Narendra Singh Yadav (Neeraj)
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-[#5eead4] tracking-normal flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Student Developer • AI &amp; Software Development</span>
                </span>
                <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400 tracking-normal block mt-0.5">
                  Indore, Madhya Pradesh, India
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.05]">
              Let’s Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5eead4] via-zinc-200 to-white">
                Meaningful.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              Open to software development internships, collaborations, hackathons and opportunities to learn and build.
            </p>
          </div>

          {/* Magnetic Circular "Get in touch" Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href={`mailto:${portfolioData.profile.email}?subject=Internship%20%2F%20Collaboration%20Inquiry`}
              className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white text-zinc-950 font-display font-extrabold text-base sm:text-lg flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-5 h-5 mt-1 text-zinc-600 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Contact Links & Direct Channels Bar */}
        <div className="py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            {/* Email pill */}
            <div className="flex items-center rounded-full bg-zinc-900 border border-white/10 p-1 pl-4">
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="text-xs sm:text-sm font-sans font-medium text-zinc-200 hover:text-white transition-colors flex items-center gap-2 pr-2 tracking-normal"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-sans font-medium text-zinc-200 hover:text-white tracking-normal" style={{ fontFamily: 'var(--font-body)' }}>
                  {portfolioData.profile.email}
                </span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Copy email"
                aria-label="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Mobile / Phone pill */}
            <div className="flex items-center rounded-full bg-zinc-900 border border-white/10 p-1 pl-4">
              <a
                href={`tel:${portfolioData.profile.phone}`}
                className="text-xs sm:text-sm font-sans font-medium text-zinc-200 hover:text-white transition-colors flex items-center gap-2 pr-2 tracking-normal"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-sans font-medium text-zinc-200 hover:text-white tracking-normal" style={{ fontFamily: 'var(--font-body)' }}>
                  {portfolioData.profile.phone}
                </span>
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Instagram link */}
            <a
              href={portfolioData.profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs sm:text-sm font-sans font-medium text-zinc-300 hover:text-white hover:border-pink-500/40 transition-all flex items-center gap-2 group tracking-normal"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-medium tracking-normal" style={{ fontFamily: 'var(--font-body)' }}>
                @{portfolioData.profile.instagram}
              </span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            {/* LinkedIn link */}
            <a
              href={portfolioData.profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs sm:text-sm font-sans font-medium text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 tracking-normal"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="font-sans font-medium tracking-normal" style={{ fontFamily: 'var(--font-body)' }}>
                LinkedIn
              </span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            {/* GitHub link */}
            <a
              href={portfolioData.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs sm:text-sm font-sans font-medium text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 tracking-normal"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="font-sans font-medium tracking-normal" style={{ fontFamily: 'var(--font-body)' }}>
                GitHub
              </span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            {/* Gallery Option */}
            <button
              type="button"
              onClick={() => {
                setGalleryOpen(true);
                setSelectedPhotoIndex(null);
              }}
              className="px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs sm:text-sm font-sans font-medium text-zinc-300 hover:text-white hover:border-[#5eead4]/40 hover:text-[#5eead4] transition-all flex items-center gap-1.5 cursor-pointer group tracking-normal"
              style={{ fontFamily: 'var(--font-body)' }}
              aria-label="Open personal photo gallery"
            >
              <Images className="w-3.5 h-3.5 text-[#5eead4] group-hover:scale-110 transition-transform" />
              <span className="font-sans font-medium tracking-normal" style={{ fontFamily: 'var(--font-body)' }}>
                Gallery
              </span>
            </button>
          </div>
        </div>

        {/* Minimalist Studio Editorial Footer (Matching Reference Layout) */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs sm:text-sm font-sans text-zinc-400">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <div className="flex items-center">
              <span className="text-[11px] font-sans font-semibold tracking-wider text-zinc-500 uppercase">VERSION</span>
              <span className="ml-2 text-zinc-300 font-medium">2026 Edition</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[11px] font-sans font-semibold tracking-wider text-zinc-500 uppercase">LOCAL TIME</span>
              <span className="ml-1 text-zinc-300 font-medium">{localTime || '11:04 pm GMT+5:30'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[11px] font-sans font-semibold tracking-wider text-zinc-500 uppercase">
              SOCIALS:
            </span>
            <a
              href={portfolioData.profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white font-medium transition-colors"
            >
              Instagram
            </a>
            <a
              href={portfolioData.profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white font-medium transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white font-medium transition-colors"
            >
              GitHub
            </a>

            <button
              type="button"
              onClick={() => {
                setGalleryOpen(true);
                setSelectedPhotoIndex(null);
              }}
              className="text-zinc-400 hover:text-[#5eead4] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Images className="w-3 h-3 text-[#5eead4]" />
              <span>Gallery</span>
            </button>
          </div>
        </div>

        {/* User Footer Copyright Line */}
        <div className="pt-8 mt-6 border-t border-white/5 text-center text-xs sm:text-sm font-sans text-zinc-500">
          <p>© 2026 Narendra Singh Yadav. Built with curiosity and code.</p>
        </div>
      </div>

      {/* PERSONAL PHOTO GALLERY MODAL */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => {
            if (selectedPhotoIndex !== null) {
              setSelectedPhotoIndex(null);
            } else {
              setGalleryOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Personal Photo Gallery"
        >
          {selectedPhotoIndex === null ? (
            /* Grid View */
            <div
              className="relative w-full max-w-5xl rounded-3xl bg-[#0f111a] border border-white/15 p-5 sm:p-7 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[#5eead4]">
                    <Images className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-white">Gallery</span>
                    <span className="ml-2 font-sans text-xs text-zinc-400">
                      ({GALLERY_PHOTOS.length} {GALLERY_PHOTOS.length === 1 ? 'photo' : 'photos'})
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGalleryOpen(false)}
                  className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                  aria-label="Close gallery"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid content */}
              {GALLERY_PHOTOS.length > 0 ? (
                <div className="pt-4 overflow-y-auto max-h-[75vh] pr-1">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {GALLERY_PHOTOS.map((src, idx) => (
                      <div
                        key={src + idx}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-[#5eead4]/60 transition-all duration-200 cursor-pointer shadow-md"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedPhotoIndex(idx);
                          }
                        }}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-[#5eead4]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-zinc-400 font-sans text-sm">
                  <Images className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <p>No photos added yet.</p>
                </div>
              )}
            </div>
          ) : (
            /* Enlarged Photo Lightbox View */
            <div
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls Bar */}
              <div className="w-full flex items-center justify-between pb-3 px-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="px-3 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-xs font-sans font-medium text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Images className="w-3.5 h-3.5 text-[#5eead4]" />
                    <span>Back to grid</span>
                  </button>
                  <span className="font-sans text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/15 text-[#5eead4] border border-teal-500/30">
                    {selectedPhotoIndex + 1} / {GALLERY_PHOTOS.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhotoIndex(null);
                    setGalleryOpen(false);
                  }}
                  className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close viewer (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Center Image Display */}
              <div className="relative w-full flex items-center justify-center my-auto overflow-hidden">
                {GALLERY_PHOTOS.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPhotoIndex((prev) =>
                        prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0
                      )
                    }
                    className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/10 backdrop-blur-md transition-transform hover:scale-110 shadow-xl cursor-pointer"
                    aria-label="Previous photo (Left arrow)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                <div className="max-w-full max-h-[78vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
                  <img
                    src={GALLERY_PHOTOS[selectedPhotoIndex]}
                    alt=""
                    className="w-auto h-auto max-w-full max-h-[78vh] object-contain rounded-2xl select-none"
                  />
                </div>

                {GALLERY_PHOTOS.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPhotoIndex((prev) =>
                        prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0
                      )
                    }
                    className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/10 backdrop-blur-md transition-transform hover:scale-110 shadow-xl cursor-pointer"
                    aria-label="Next photo (Right arrow)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </footer>
  );
};
