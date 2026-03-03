import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * VideoSplash — Fullscreen intro overlay shown ONCE per session.
 * Auto-plays the Peether promo video with centered Enter Site + Skip.
 */
export default function VideoSplash() {
  const [show, setShow] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);

  const cloudinaryVideo =
    "https://res.cloudinary.com/dj5uywc5k/video/upload/f_auto,q_auto/v1762796337/peether-promo_nodmaw.mp4";

  useEffect(() => {
    const seen = sessionStorage.getItem("ptdt_splash_seen");
    if (!seen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!show || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = isMuted;
    video.play().catch(() => {});

    const handleTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const handleEnded = () => handleSkip();
    const handleCanPlay = () => setReady(true);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [show, isMuted]);

  const handleSkip = () => {
    sessionStorage.setItem("ptdt_splash_seen", "1");
    document.body.style.overflow = "";
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            poster="/peether-poster.jpg"
            className="absolute inset-0 w-full h-full object-contain"
          >
            <source src={cloudinaryVideo} type="video/mp4" />
          </video>

          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

          {/* Bottom gradient — stronger for button visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10 pointer-events-none" />

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* ====== CENTER: Enter Site + Skip ====== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 flex flex-col items-center gap-4"
          >
            {/* Enter Site — Primary CTA */}
            <button
              onClick={handleSkip}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white font-montserrat font-bold text-lg tracking-wide shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:shadow-[0_0_60px_rgba(236,72,153,0.9)] hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
            >
              Enter Site
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>

            {/* Skip — Subtle, sits below Enter Site */}
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-xs font-montserrat uppercase tracking-[0.15em] hover:bg-white/20 hover:text-white transition-all cursor-pointer"
            >
              Skip Intro
            </button>
          </motion.div>

          {/* Bottom-left: Mute toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-6 left-6 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
