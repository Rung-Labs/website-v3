import React from "react";
import { Background } from "./components/Background";
import { RungLogo } from "./components/RungLogo";
import { WaitlistForm } from "./components/WaitlistForm";
import { Twitter, Instagram, Youtube } from "lucide-react";
import { socialLinks } from "./config";

// Custom TikTok Icon since it might not be in the Lucide version
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const App: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans text-white">
      <Background />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[98%] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Main Card */}
        {/* Updated to work with black/white gradient background */}
        <div
          className="relative w-full max-w-[1600px] mx-auto bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-[0_0_60px_-12px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 overflow-hidden"
          style={{ width: "clamp(320px, 72vw, 960px)" }}
        >
          {/* Card Corner Accents - White Glow */}
          <div className="absolute top-8 left-8 w-3 h-3 border-l border-t border-white/50"></div>
          <div className="absolute top-8 right-8 w-3 h-3 border-r border-t border-white/50"></div>
          <div className="absolute bottom-8 left-8 w-3 h-3 border-l border-b border-white/50"></div>
          <div className="absolute bottom-8 right-8 w-3 h-3 border-r border-b border-white/50"></div>

          {/* Hero Content */}
          <div className="flex flex-col items-center text-center z-10 w-full max-w-4xl gap-2 py-2">
            {/* Eye-catching heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl tracking-tight leading-tight">
              The wait is part of the journey.
            </h1>

            {/* Logo Section */}
            <div className="transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
              <RungLogo className="max-w-[120px] sm:max-w-[150px]" />
            </div>

            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed font-light drop-shadow-md max-w-xl">
              Rung. Climb the ladder. Join the waitlist to be among the first to
              experience the future with Rung Labs.
            </p>

            <WaitlistForm />

            {/* Social Proof */}
            <div className="mt-4 flex items-center justify-center gap-4 text-[0.7rem]">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-sky-800 bg-gradient-to-br from-cyan-400 to-blue-600 overflow-hidden relative shadow-lg">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User"
                    className="opacity-90 mix-blend-multiply"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-sky-800 bg-gradient-to-br from-purple-400 to-blue-600 overflow-hidden relative shadow-lg">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                    alt="User"
                    className="opacity-90 mix-blend-multiply"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-sky-800 bg-gradient-to-br from-blue-400 to-teal-600 overflow-hidden relative shadow-lg">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark"
                    alt="User"
                    className="opacity-90 mix-blend-multiply"
                  />
                </div>
              </div>
              <span className="text-xs text-white/80 font-medium tracking-wide">
                Join 50+ already onboard
              </span>
            </div>
          </div>
        </div>

        {/* Footer Icons: Instagram, TikTok, YouTube, Twitter */}
        <div className="mt-4 flex gap-6 text-white/70">
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all drop-shadow-sm"
            >
              <Instagram size={30} />
            </a>
          )}
          {socialLinks.tiktok && (
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all drop-shadow-sm"
            >
              <TikTokIcon className="w-8 h-8" />
            </a>
          )}
          {socialLinks.youtube && (
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all drop-shadow-sm"
            >
              <Youtube size={30} />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all drop-shadow-sm"
            >
              <Twitter size={30} />
            </a>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
