export default function BookLoader() {
  return (
    <div className="book-loader-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .book-loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 2.5rem;
          background: radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08), transparent 50%),
                      radial-gradient(ellipse at 70% 80%, rgba(244, 114, 182, 0.06), transparent 50%),
                      radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.04), transparent 60%),
                      linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 30%, #16213e 60%, #0f0f1a 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
          user-select: none;
        }

        /* ===== Ambient Floating Particles ===== */
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          animation: floatOrb 8s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(99,102,241,0.5), transparent);
          top: 10%; left: 15%;
          animation-delay: 0s;
          animation-duration: 10s;
        }
        .orb-2 {
          width: 150px; height: 150px;
          background: radial-gradient(circle, rgba(244,114,182,0.4), transparent);
          bottom: 15%; right: 10%;
          animation-delay: -3s;
          animation-duration: 12s;
        }
        .orb-3 {
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(14,165,233,0.3), transparent);
          top: 50%; left: 60%;
          animation-delay: -6s;
          animation-duration: 14s;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          75% { transform: translate(15px, 15px) scale(1.05); }
        }

        /* ===== Sparkle Particles ===== */
        .sparkle-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          animation: sparkleFloat linear infinite;
          opacity: 0;
        }
        .sparkle::after {
          content: '';
          position: absolute;
          inset: -1px;
          background: inherit;
          border-radius: 50%;
          filter: blur(1px);
        }

        .s1  { left: 8%;  top: 15%; animation-duration: 6s;  animation-delay: 0s;   }
        .s2  { left: 15%; top: 70%; animation-duration: 8s;  animation-delay: 1s;   }
        .s3  { left: 25%; top: 30%; animation-duration: 7s;  animation-delay: 2s;   }
        .s4  { left: 35%; top: 85%; animation-duration: 9s;  animation-delay: 0.5s; }
        .s5  { left: 45%; top: 20%; animation-duration: 6s;  animation-delay: 3s;   }
        .s6  { left: 55%; top: 60%; animation-duration: 8s;  animation-delay: 1.5s; }
        .s7  { left: 65%; top: 40%; animation-duration: 7s;  animation-delay: 4s;   }
        .s8  { left: 75%; top: 75%; animation-duration: 9s;  animation-delay: 2.5s; }
        .s9  { left: 85%; top: 25%; animation-duration: 6s;  animation-delay: 3.5s; }
        .s10 { left: 92%; top: 55%; animation-duration: 8s;  animation-delay: 0.8s; }
        .s11 { left: 20%; top: 50%; animation-duration: 10s; animation-delay: 5s;   }
        .s12 { left: 80%; top: 10%; animation-duration: 7s;  animation-delay: 4.5s; }

        @keyframes sparkleFloat {
          0%   { opacity: 0; transform: translateY(0) scale(0); }
          10%  { opacity: 0.8; transform: translateY(-10px) scale(1); }
          50%  { opacity: 0.4; transform: translateY(-40px) scale(0.6); }
          90%  { opacity: 0.7; transform: translateY(-80px) scale(0.9); }
          100% { opacity: 0; transform: translateY(-100px) scale(0); }
        }

        /* ===== Main Book Container ===== */
        .book-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: gentleFloat 4s ease-in-out infinite;
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        /* ===== Glow Ring Behind Book ===== */
        .glow-ring {
          position: absolute;
          width: 180px;
          height: 180px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(99,102,241,0.15),
            rgba(244,114,182,0.1),
            rgba(14,165,233,0.15),
            rgba(168,85,247,0.1),
            rgba(99,102,241,0.15)
          );
          filter: blur(25px);
          animation: glowSpin 8s linear infinite;
          pointer-events: none;
        }

        @keyframes glowSpin {
          0%   { transform: translate(-50%, -55%) rotate(0deg) scale(1); }
          50%  { transform: translate(-50%, -55%) rotate(180deg) scale(1.15); }
          100% { transform: translate(-50%, -55%) rotate(360deg) scale(1); }
        }

        .book-container {
          width: 120px;
          height: 90px;
          position: relative;
          perspective: 800px;
          transform-style: preserve-3d;
          z-index: 2;
        }

        /* ===== Book Covers ===== */
        .book-cover {
          position: absolute;
          top: 0;
          width: 60px;
          height: 90px;
          border-radius: 4px;
          transition: box-shadow 0.3s ease;
        }

        .cover-left {
          left: 0;
          background: linear-gradient(160deg, #4338ca, #6366f1 30%, #818cf8 60%, #4f46e5 100%);
          border-radius: 5px 0 0 5px;
          box-shadow:
            -3px 4px 15px rgba(99, 102, 241, 0.35),
            inset 1px 0 0 rgba(255,255,255,0.1);
          z-index: 1;
        }

        /* Cover emboss / decorative detail */
        .cover-left::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 8px;
          right: 4px;
          height: 1px;
          background: rgba(255,255,255,0.15);
          box-shadow:
            0 3px 0 rgba(255,255,255,0.08),
            0 60px 0 rgba(255,255,255,0.15),
            0 63px 0 rgba(255,255,255,0.08);
          border-radius: 1px;
        }

        .cover-left::after {
          content: '✦';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          color: rgba(255,255,255,0.2);
        }

        .cover-right {
          right: 0;
          background: linear-gradient(200deg, #4338ca, #6366f1 30%, #818cf8 60%, #4f46e5 100%);
          border-radius: 0 5px 5px 0;
          box-shadow:
            3px 4px 15px rgba(99, 102, 241, 0.35),
            inset -1px 0 0 rgba(255,255,255,0.1);
        }

        .cover-right::after {
          content: '✦';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          color: rgba(255,255,255,0.2);
        }

        /* ===== Spine ===== */
        .spine {
          position: absolute;
          left: 50%;
          top: -1px;
          width: 5px;
          height: 92px;
          background: linear-gradient(180deg, #312e81, #4338ca, #312e81);
          transform: translateX(-50%);
          z-index: 10;
          border-radius: 2px;
          box-shadow:
            0 0 8px rgba(99, 102, 241, 0.3),
            inset 0 0 2px rgba(255,255,255,0.1);
        }

        .spine::before,
        .spine::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 1px;
          background: rgba(255,255,255,0.2);
          border-radius: 1px;
        }
        .spine::before { top: 8px; }
        .spine::after  { bottom: 8px; }

        /* ===== Pages ===== */
        .book-page {
          position: absolute;
          left: 50%;
          top: 5px;
          width: 52px;
          height: 80px;
          background: linear-gradient(to right, #fefcf7, #f8f4eb, #fefcf7);
          border-radius: 0 4px 4px 0;
          transform-origin: left center;
          border: 0.5px solid rgba(210, 200, 180, 0.6);
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.08);
          backface-visibility: visible;
        }

        /* Page lines */
        .book-page::after {
          content: "";
          position: absolute;
          top: 14px;
          left: 10px;
          right: 10px;
          height: 1.5px;
          background: rgba(180, 170, 150, 0.35);
          border-radius: 1px;
          box-shadow:
            0 7px 0 rgba(180,170,150,0.3),
            0 14px 0 rgba(180,170,150,0.25),
            0 21px 0 rgba(180,170,150,0.3),
            0 28px 0 rgba(180,170,150,0.2),
            0 35px 0 rgba(180,170,150,0.3),
            0 42px 0 rgba(180,170,150,0.25);
        }

        /* Backside of pages */
        .book-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to left, #fefcf7, #f5f0e4);
          border-radius: inherit;
          transform: rotateY(180deg);
          backface-visibility: hidden;
        }

        /* Page flip animations - staggered wave */
        .p1 { animation: pageFlip 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; z-index: 7; }
        .p2 { animation: pageFlip 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.15s; z-index: 6; }
        .p3 { animation: pageFlip 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.30s; z-index: 5; }
        .p4 { animation: pageFlip 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.45s; z-index: 4; }
        .p5 { animation: pageFlip 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.60s; z-index: 3; }
        .p6 { animation: pageFlip 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.75s; z-index: 2; }

        @keyframes pageFlip {
          0% {
            transform: rotateY(0deg) skewY(0deg);
            box-shadow: 2px 1px 6px rgba(0,0,0,0.06);
            z-index: 7;
          }
          8% {
            transform: rotateY(-15deg) skewY(-1deg);
            box-shadow: 5px 2px 12px rgba(0,0,0,0.12);
          }
          20% {
            transform: rotateY(-90deg) skewY(0deg);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
          35% {
            transform: rotateY(-165deg) skewY(1deg);
            box-shadow: -4px 2px 10px rgba(0,0,0,0.1);
          }
          50%, 100% {
            transform: rotateY(-180deg) skewY(0deg);
            box-shadow: -2px 1px 6px rgba(0,0,0,0.06);
            z-index: 1;
          }
        }

        /* ===== Shadow under book ===== */
        .book-shadow {
          width: 110px;
          height: 12px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 40%, transparent 70%);
          border-radius: 50%;
          margin-top: 12px;
          animation: shadowPulse 4s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.8; }
          50% { transform: scaleX(1.3) scaleY(0.8); opacity: 0.4; }
        }

        /* ===== Loading Text ===== */
        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          z-index: 2;
        }

        .loader-text {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0px;
          background: linear-gradient(
            90deg,
            rgba(165, 180, 252, 0.6),
            rgba(196, 181, 253, 0.9),
            rgba(165, 180, 252, 0.6)
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 3s ease-in-out infinite;
        }

        @keyframes shimmerText {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .dot-bounce {
          display: inline-flex;
          gap: 4px;
          margin-left: 4px;
        }

        .dot-bounce span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a5b4fc, #c4b5fd);
          animation: dotPulse 1.6s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(165, 180, 252, 0.4);
        }

        .dot-bounce span:nth-child(1) { animation-delay: 0s; }
        .dot-bounce span:nth-child(2) { animation-delay: 0.2s; }
        .dot-bounce span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) scale(1.3);
            opacity: 1;
          }
        }

        /* ===== Subtle tagline ===== */
        .loader-tagline {
          font-size: 12px;
          font-weight: 300;
          color: rgba(165, 180, 252, 0.35);
          letter-spacing: 5px;
          text-transform: uppercase;
          animation: fadeInOut 4s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        /* ===== Progress Bar ===== */
        .progress-track {
          width: 160px;
          height: 2px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.6), rgba(196, 181, 253, 0.8), rgba(129, 140, 248, 0.6), transparent);
          border-radius: 4px;
          animation: progressSlide 2s ease-in-out infinite;
        }

        @keyframes progressSlide {
          0%   { left: -40%; }
          100% { left: 100%; }
        }

        /* ===== Corner Decorations ===== */
        .corner-deco {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 1px solid rgba(99, 102, 241, 0.08);
          pointer-events: none;
        }
        .corner-tl {
          top: 24px; left: 24px;
          border-right: none; border-bottom: none;
          border-radius: 8px 0 0 0;
          animation: cornerPulse 4s ease-in-out infinite;
        }
        .corner-tr {
          top: 24px; right: 24px;
          border-left: none; border-bottom: none;
          border-radius: 0 8px 0 0;
          animation: cornerPulse 4s ease-in-out infinite 1s;
        }
        .corner-bl {
          bottom: 24px; left: 24px;
          border-right: none; border-top: none;
          border-radius: 0 0 0 8px;
          animation: cornerPulse 4s ease-in-out infinite 2s;
        }
        .corner-br {
          bottom: 24px; right: 24px;
          border-left: none; border-top: none;
          border-radius: 0 0 8px 0;
          animation: cornerPulse 4s ease-in-out infinite 3s;
        }

        @keyframes cornerPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .book-container {
            width: 100px;
            height: 75px;
          }
          .book-cover {
            width: 50px;
            height: 75px;
          }
          .spine { height: 77px; }
          .book-page {
            width: 43px;
            height: 66px;
          }
          .glow-ring {
            width: 140px;
            height: 140px;
          }
          .orb-1 { width: 120px; height: 120px; }
          .orb-2 { width: 100px; height: 100px; }
          .orb-3 { width: 110px; height: 110px; }
          .loader-text { font-size: 14px; letter-spacing: 2px; }
          .loader-tagline { font-size: 10px; letter-spacing: 3px; }
          .progress-track { width: 120px; }
          .corner-deco { width: 40px; height: 40px; }
          .corner-tl, .corner-tr { top: 16px; }
          .corner-bl, .corner-br { bottom: 16px; }
          .corner-tl, .corner-bl { left: 16px; }
          .corner-tr, .corner-br { right: 16px; }
        }

        @media (max-width: 480px) {
          .book-container {
            width: 85px;
            height: 65px;
          }
          .book-cover {
            width: 42px;
            height: 65px;
          }
          .spine { height: 67px; width: 4px; }
          .book-page {
            width: 36px;
            height: 56px;
          }
          .book-page::after {
            top: 10px;
            left: 6px;
            right: 6px;
          }
          .glow-ring {
            width: 110px;
            height: 110px;
          }
          .book-shadow { width: 80px; }
          .loader-text { font-size: 12px; letter-spacing: 2px; }
          .loader-tagline { font-size: 9px; letter-spacing: 2px; }
          .progress-track { width: 100px; }
          .corner-deco { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Sparkles */}
      <div className="sparkle-field">
        <div className="sparkle s1" />
        <div className="sparkle s2" />
        <div className="sparkle s3" />
        <div className="sparkle s4" />
        <div className="sparkle s5" />
        <div className="sparkle s6" />
        <div className="sparkle s7" />
        <div className="sparkle s8" />
        <div className="sparkle s9" />
        <div className="sparkle s10" />
        <div className="sparkle s11" />
        <div className="sparkle s12" />
      </div>

      {/* Corner decorations */}
      <div className="corner-deco corner-tl" />
      <div className="corner-deco corner-tr" />
      <div className="corner-deco corner-bl" />
      <div className="corner-deco corner-br" />

      {/* Book */}
      <div className="book-stage">
        <div className="glow-ring" />
        <div className="book-container">
          <div className="cover-left book-cover" />
          <div className="cover-right book-cover" />
          <div className="spine" />
          <div className="book-page p1" />
          <div className="book-page p2" />
          <div className="book-page p3" />
          <div className="book-page p4" />
          <div className="book-page p5" />
          <div className="book-page p6" />
        </div>
        <div className="book-shadow" />
      </div>

      {/* Text content */}
      <div className="loader-content">
        <p className="loader-text">
          Loading
          <span className="dot-bounce">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </p>
        <div className="progress-track">
          <div className="progress-fill" />
        </div>
        <p className="loader-tagline">Preparing your experience</p>
      </div>
    </div>
  );
}

