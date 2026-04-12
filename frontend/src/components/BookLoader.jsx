// // BookLoader.jsx
// export default function BookLoader() {
//   return (
//     <div style={{
//       display: "flex", flexDirection: "column",
//       alignItems: "center", justifyContent: "center",
//       height: "60vh", gap: "1.5rem"
//     }}>
//       <style>{`
//         .book { width: 80px; height: 60px; position: relative; perspective: 400px; }
//         .book-cover-left { position: absolute; left: 0; top: 0; width: 40px; height: 60px;
//           background: #185FA5; border-radius: 3px 0 0 3px; border: 1.5px solid #0C447C; }
//         .book-cover-right { position: absolute; right: 0; top: 0; width: 40px; height: 60px;
//           background: #185FA5; border-radius: 0 3px 3px 0; border: 1.5px solid #0C447C; }
//         .book-spine { position: absolute; left: 50%; top: 0; width: 2px; height: 60px;
//           background: #0C447C; transform: translateX(-50%); z-index: 10; }
//         .page { position: absolute; left: 50%; top: 3px; width: 36px; height: 54px;
//           background: #f5f0e8; border-radius: 0 2px 2px 0; transform-origin: left center;
//           border: 0.5px solid #d3cfc4; }
//         .page1 { animation: flip 2.4s ease-in-out infinite; z-index: 7; }
//         .page2 { animation: flip 2.4s ease-in-out infinite 0.15s; z-index: 6; }
//         .page3 { animation: flip 2.4s ease-in-out infinite 0.3s; z-index: 5; }
//         @keyframes flip {
//           0%, 100% { transform: rotateY(0deg); }
//           30%, 60% { transform: rotateY(-75deg); }
//         }
//         .dots span { animation: blink 1.4s infinite; opacity: 0; }
//         .dots span:nth-child(2) { animation-delay: 0.2s; }
//         .dots span:nth-child(3) { animation-delay: 0.4s; }
//         @keyframes blink { 40% { opacity: 1; } }
//       `}</style>
//       <div className="book">
//         <div className="book-cover-left" />
//         <div className="book-cover-right" />
//         <div className="book-spine" />
//         <div className="page page1" />
//         <div className="page page2" />
//         <div className="page page3" />
//       </div>
//       <p style={{ color: "#6b7280", fontSize: "14px" }}>
//         Loading<span className="dots"><span>.</span><span>.</span><span>.</span></span>
//       </p>
//     </div>
//   )
// }










// export default function BookLoader() {
//   return (
//     <div className="book-loader-wrapper">
//       <style>{`
//         .book-loader-wrapper {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 70vh;
//           gap: 2rem;
//           background: transparent;
//         }

//         .book-container {
//           width: 100px;
//           height: 80px;
//           position: relative;
//           perspective: 600px;
//         }

//         .book-cover {
//           position: absolute;
//           top: 0;
//           width: 50px;
//           height: 80px;
//           border-radius: 4px;
//         }

//         .cover-left {
//           left: 0;
//           background: linear-gradient(135deg, #1e3a8a, #3b82f6);
//           border-radius: 4px 0 0 4px;
//           box-shadow: -2px 2px 8px rgba(30, 58, 138, 0.3);
//           z-index: 1;
//         }

//         .cover-right {
//           right: 0;
//           background: linear-gradient(135deg, #1e3a8a, #3b82f6);
//           border-radius: 0 4px 4px 0;
//           box-shadow: 2px 2px 8px rgba(30, 58, 138, 0.3);
//         }

//         .spine {
//           position: absolute;
//           left: 50%;
//           top: 0;
//           width: 3px;
//           height: 80px;
//           background: linear-gradient(180deg, #1e3a8a, #1d4ed8);
//           transform: translateX(-50%);
//           z-index: 10;
//           border-radius: 1px;
//         }

//         .book-page {
//           position: absolute;
//           left: 50%;
//           top: 4px;
//           width: 44px;
//           height: 72px;
//           background: linear-gradient(to right, #faf8f2, #f5f0e4);
//           border-radius: 0 3px 3px 0;
//           transform-origin: left center;
//           border: 0.5px solid #e5e0d5;
//           box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.06);
//         }

//         .book-page::after {
//           content: "";
//           position: absolute;
//           top: 12px;
//           left: 8px;
//           right: 8px;
//           height: 2px;
//           background: #e0dcd4;
//           border-radius: 1px;
//           box-shadow:
//             0 8px 0 #e0dcd4,
//             0 16px 0 #e0dcd4,
//             0 24px 0 #e0dcd4,
//             0 32px 0 #e0dcd4;
//         }

//         .p1 { animation: smoothFlip 3s ease-in-out infinite; z-index: 7; }
//         .p2 { animation: smoothFlip 3s ease-in-out infinite 0.2s; z-index: 6; }
//         .p3 { animation: smoothFlip 3s ease-in-out infinite 0.4s; z-index: 5; }
//         .p4 { animation: smoothFlip 3s ease-in-out infinite 0.6s; z-index: 4; }
//         .p5 { animation: smoothFlip 3s ease-in-out infinite 0.8s; z-index: 3; }

//         @keyframes smoothFlip {
//           0%, 100% {
//             transform: rotateY(0deg);
//             box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.06);
//           }
//           15% {
//             transform: rotateY(-30deg);
//             box-shadow: 4px 1px 8px rgba(0, 0, 0, 0.1);
//           }
//           30%, 55% {
//             transform: rotateY(-150deg);
//             box-shadow: -2px 1px 6px rgba(0, 0, 0, 0.08);
//           }
//           70% {
//             transform: rotateY(-30deg);
//             box-shadow: 4px 1px 8px rgba(0, 0, 0, 0.1);
//           }
//         }

//         .loader-text {
//           font-size: 15px;
//           font-weight: 500;
//           color: #6b7280;
//           letter-spacing: 0.5px;
//           display: flex;
//           align-items: center;
//           gap: 2px;
//         }

//         .dot-bounce {
//           display: inline-flex;
//           gap: 3px;
//           margin-left: 2px;
//         }

//         .dot-bounce span {
//           width: 5px;
//           height: 5px;
//           background: #6b7280;
//           border-radius: 50%;
//           animation: bounce 1.4s ease-in-out infinite;
//         }

//         .dot-bounce span:nth-child(1) { animation-delay: 0s; }
//         .dot-bounce span:nth-child(2) { animation-delay: 0.15s; }
//         .dot-bounce span:nth-child(3) { animation-delay: 0.3s; }

//         @keyframes bounce {
//           0%, 80%, 100% {
//             transform: translateY(0);
//             opacity: 0.4;
//           }
//           40% {
//             transform: translateY(-8px);
//             opacity: 1;
//           }
//         }

//         .book-shadow {
//           width: 90px;
//           height: 8px;
//           background: radial-gradient(ellipse, rgba(0,0,0,0.12), transparent);
//           border-radius: 50%;
//           margin-top: 4px;
//           animation: shadowPulse 3s ease-in-out infinite;
//         }

//         @keyframes shadowPulse {
//           0%, 100% { transform: scaleX(1); opacity: 0.6; }
//           50% { transform: scaleX(1.2); opacity: 0.3; }
//         }
//       `}</style>

//       <div className="book-container">
//         <div className="cover-left book-cover" />
//         <div className="cover-right book-cover" />
//         <div className="spine" />
//         <div className="book-page p1" />
//         <div className="book-page p2" />
//         <div className="book-page p3" />
//         <div className="book-page p4" />
//         <div className="book-page p5" />
//       </div>

//       <div className="book-shadow" />

//       <p className="loader-text">
//         Loading
//         <span className="dot-bounce">
//           <span></span>
//           <span></span>
//           <span></span>
//         </span>
//       </p>
//     </div>
//   )
// }





























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








































































































// this is too good also



// import React from 'react';

// const BookLoader = () => {
//   return (
//     <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden font-sans selection:bg-white/20">
//       {/* 1. Resend-style Background Glow (The Ray) */}
//       <div 
//         className="pointer-events-none absolute -top-20 left-0 right-0 mx-auto h-screen w-full opacity-40 transition-opacity duration-500 md:block"
//         style={{
//           background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
//           maskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)'
//         }}
//       />

//       {/* 2. The Main Loader Container */}
//       <div className="relative z-10 flex flex-col items-center gap-8">
        
//         {/* The Animated "Disco" Border Card */}
//         <div className="group relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 p-px">
//           {/* Rotating Border Logic */}
//           <span 
//             aria-hidden="true" 
//             className="absolute inset-0 z-0 scale-x-[2] blur-sm before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-[spin_4s_linear_infinite] before:bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,#fff_50%,transparent_70%,transparent_100%)]"
//           />
          
//           {/* Inner Content Surface */}
//           <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[15px] bg-black">
//              {/* Book Icon / Loading Asset */}
//              <svg 
//               className="h-10 w-10 text-white animate-pulse" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor" 
//               strokeWidth="1.5"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
//             </svg>
//           </div>
//         </div>

//         {/* 3. Text and Animated Dots (From your screenshot) */}
//         <div className="flex flex-col items-center gap-2 text-center">
//           <h2 className="text-lg font-medium tracking-tight text-slate-200">
//             Initializing Library
//           </h2>
//           <div className="flex items-center gap-1.5 px-4 py-1 text-sm tracking-[2px] text-slate-500 uppercase">
//             <span>Loading</span>
//             <span className="flex gap-1">
//               <span className="animate-[bounce_1.4s_infinite_0ms]">.</span>
//               <span className="animate-[bounce_1.4s_infinite_200ms]">.</span>
//               <span className="animate-[bounce_1.4s_infinite_400ms]">.</span>
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* 4. Pulse Glow (Bottom Shadow) */}
//       <div 
//         className="absolute bottom-0 left-1/2 h-[300px] w-full max-w-[400px] -translate-x-1/2 animate-pulse opacity-20"
//         style={{
//           background: 'conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%), radial-gradient(rgba(200,200,200,0.1) 0%, transparent 80%)'
//         }}
//       />
//     </div>
//   );
// };

// export default BookLoader;


















// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// const BookLoader = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     let scene, camera, renderer, animationId;
//     let rubikGroup, pivot, cubelets = [];
//     let pmremGenerator, envMap;
//     let disposed = false;

//     // =========================
//     // Helpers
//     // =========================
//     const getContainerSize = () => {
//       const rect = container.getBoundingClientRect();
//       return {
//         width: Math.max(140, rect.width || 220),
//         height: Math.max(140, rect.height || 220),
//       };
//     };

//     const easeSmooth = (t) =>
//       t < 0.5
//         ? 4 * t * t * t
//         : 1 - Math.pow(-2 * t + 2, 3) / 2;

//     // =========================
//     // Scene
//     // =========================
//     scene = new THREE.Scene();

//     const { width, height } = getContainerSize();

//     camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
//     camera.position.set(5.2, 4.1, 5.2); // farther so full cube is visible
//     camera.lookAt(0, 0, 0);

//     renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFShadowMap;
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.toneMappingExposure = 1.25;
//     renderer.setClearColor(0x000000, 0);

//     container.appendChild(renderer.domElement);

//     // =========================
//     // Rubik Cube
//     // =========================
//     rubikGroup = new THREE.Group();
//     scene.add(rubikGroup);

//     pivot = new THREE.Group();
//     rubikGroup.add(pivot);

//     const isMobile = window.innerWidth < 640;
//     const SIZE = isMobile ? 0.72 : 0.82;
//     const GAP = isMobile ? 0.05 : 0.06;
//     const SP = SIZE + GAP;

//     const materialPool = [
//       { color: 0x555560, roughness: 0.16, metalness: 0.95 },
//       { color: 0x6a6a75, roughness: 0.12, metalness: 0.98 },
//       { color: 0x48484f, roughness: 0.3, metalness: 0.9 },
//       { color: 0x7a7a88, roughness: 0.08, metalness: 0.98 },
//       { color: 0x3d3d45, roughness: 0.45, metalness: 0.85 },
//       { color: 0x888899, roughness: 0.05, metalness: 1.0 },
//     ];

//     const geometries = [];
//     const materials = [];

//     const createMaterial = () => {
//       const p = materialPool[Math.floor(Math.random() * materialPool.length)];
//       const mat = new THREE.MeshStandardMaterial({
//         color: p.color,
//         roughness: p.roughness,
//         metalness: p.metalness,
//         envMapIntensity: 1.3,
//       });
//       materials.push(mat);
//       return mat;
//     };

//     for (let x = -1; x <= 1; x++) {
//       for (let y = -1; y <= 1; y++) {
//         for (let z = -1; z <= 1; z++) {
//           const geo = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
//           geometries.push(geo);

//           const mats = Array.from({ length: 6 }, createMaterial);
//           const cube = new THREE.Mesh(geo, mats);

//           cube.position.set(x * SP, y * SP, z * SP);
//           cube.castShadow = true;
//           cube.receiveShadow = true;

//           const edgeGeo = new THREE.EdgesGeometry(geo);
//           geometries.push(edgeGeo);

//           const edgeMat = new THREE.LineBasicMaterial({
//             color: 0xbfc3d6,
//             transparent: true,
//             opacity: 0.22,
//           });
//           materials.push(edgeMat);

//           const edges = new THREE.LineSegments(edgeGeo, edgeMat);
//           cube.add(edges);

//           rubikGroup.add(cube);
//           cubelets.push(cube);
//         }
//       }
//     }

//     rubikGroup.rotation.x = 0.42;
//     rubikGroup.rotation.z = 0.1;

//     // =========================
//     // Move animation
//     // =========================
//     const move = {
//       active: false,
//       axis: "y",
//       targetAngle: 0,
//       pieces: [],
//       cooldown: 0.9,
//       timer: 0,
//       duration: 0.65,
//       elapsed: 0,
//     };

//     function startMove() {
//       const axes = ["x", "y", "z"];
//       const axis = axes[Math.floor(Math.random() * axes.length)];
//       const layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
//       const dir = Math.random() > 0.5 ? 1 : -1;
//       const target = layer * SP;

//       const selected = cubelets.filter(
//         (c) => Math.abs(c.position[axis] - target) < SP * 0.4
//       );

//       if (selected.length !== 9) return;

//       pivot.rotation.set(0, 0, 0);
//       pivot.updateMatrixWorld(true);

//       selected.forEach((c) => {
//         rubikGroup.remove(c);
//         pivot.add(c);
//       });

//       move.active = true;
//       move.axis = axis;
//       move.targetAngle = (Math.PI / 2) * dir;
//       move.pieces = selected;
//       move.elapsed = 0;
//       move.duration = 0.55 + Math.random() * 0.25;
//     }

//     function finishMove() {
//       pivot.rotation[move.axis] = move.targetAngle;
//       pivot.updateMatrixWorld(true);

//       const groupWorldQuat = new THREE.Quaternion();
//       rubikGroup.getWorldQuaternion(groupWorldQuat);

//       move.pieces.forEach((c) => {
//         const worldPos = new THREE.Vector3();
//         const worldQuat = new THREE.Quaternion();

//         c.getWorldPosition(worldPos);
//         c.getWorldQuaternion(worldQuat);

//         pivot.remove(c);
//         rubikGroup.add(c);

//         rubikGroup.worldToLocal(worldPos);
//         c.position.set(
//           Math.round(worldPos.x / SP) * SP,
//           Math.round(worldPos.y / SP) * SP,
//           Math.round(worldPos.z / SP) * SP
//         );

//         c.quaternion.copy(groupWorldQuat.clone().invert().multiply(worldQuat));
//       });

//       pivot.rotation.set(0, 0, 0);
//       move.active = false;
//       move.timer = 0;
//       move.cooldown = 0.35 + Math.random() * 0.45;
//     }

//     function updateMoves(delta) {
//       if (!move.active) {
//         move.timer += delta;
//         if (move.timer >= move.cooldown) startMove();
//         return;
//       }

//       move.elapsed += delta;
//       const progress = Math.min(move.elapsed / move.duration, 1);
//       const eased = easeSmooth(progress);

//       pivot.rotation[move.axis] = move.targetAngle * eased;

//       if (progress >= 1) finishMove();
//     }

//     // =========================
//     // Lights
//     // =========================
//     scene.add(new THREE.AmbientLight(0x404050, 1.4));

//     const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
//     keyLight.position.set(5, 8, 5);
//     keyLight.castShadow = true;
//     keyLight.shadow.mapSize.set(1024, 1024);
//     scene.add(keyLight);

//     const fillLight = new THREE.DirectionalLight(0xaabbee, 1.8);
//     fillLight.position.set(-4, 3, -3);
//     scene.add(fillLight);

//     const rimLight = new THREE.DirectionalLight(0xdde4ff, 2.5);
//     rimLight.position.set(-3, 5, -6);
//     scene.add(rimLight);

//     const frontLight = new THREE.DirectionalLight(0xffffff, 1.8);
//     frontLight.position.set(0, 1, 8);
//     scene.add(frontLight);

//     const bottomLight = new THREE.DirectionalLight(0x666688, 0.8);
//     bottomLight.position.set(0, -4, 2);
//     scene.add(bottomLight);

//     // =========================
//     // Environment Map
//     // =========================
//     pmremGenerator = new THREE.PMREMGenerator(renderer);

//     const envScene = new THREE.Scene();
//     envScene.background = new THREE.Color(0x202028);

//     const envPlane1 = new THREE.Mesh(
//       new THREE.PlaneGeometry(12, 12),
//       new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
//     );
//     envPlane1.position.set(0, 5, 0);
//     envPlane1.rotation.x = Math.PI / 2;
//     envScene.add(envPlane1);

//     const envPlane2 = new THREE.Mesh(
//       new THREE.PlaneGeometry(12, 12),
//       new THREE.MeshBasicMaterial({ color: 0x7f8496, side: THREE.DoubleSide })
//     );
//     envPlane2.position.set(5, 0, 0);
//     envPlane2.rotation.y = -Math.PI / 2;
//     envScene.add(envPlane2);

//     envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
//     scene.environment = envMap;
//     pmremGenerator.dispose();

//     // =========================
//     // Animation Loop
//     // =========================
//     let prevTime = performance.now();

//     const animate = () => {
//       if (disposed) return;

//       animationId = requestAnimationFrame(animate);

//       const now = performance.now();
//       const delta = Math.min((now - prevTime) / 1000, 0.1);
//       prevTime = now;
//       const elapsed = now / 1000;

//       rubikGroup.rotation.y = elapsed * 0.18;
//       rubikGroup.position.y = Math.sin(elapsed * 0.8) * 0.07;

//       updateMoves(delta);
//       renderer.render(scene, camera);
//     };

//     animate();

//     // =========================
//     // Resize
//     // =========================
//     const onResize = () => {
//       const { width, height } = getContainerSize();
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener("resize", onResize);

//     // =========================
//     // Cleanup
//     // =========================
//     return () => {
//       disposed = true;
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("resize", onResize);

//       cubelets.forEach((cube) => {
//         if (cube.geometry) cube.geometry.dispose();

//         if (Array.isArray(cube.material)) {
//           cube.material.forEach((m) => m.dispose());
//         } else if (cube.material) {
//           cube.material.dispose();
//         }

//         cube.children.forEach((child) => {
//           if (child.geometry) child.geometry.dispose();
//           if (child.material) child.material.dispose();
//         });
//       });

//       geometries.forEach((g) => g.dispose?.());
//       materials.forEach((m) => m.dispose?.());

//       envMap?.dispose?.();
//       renderer?.dispose?.();

//       if (container.contains(renderer.domElement)) {
//         container.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black font-sans selection:bg-white/20">
//       {/* Background Glow */}
//       <div
//         className="pointer-events-none absolute -top-20 left-0 right-0 mx-auto h-screen w-full opacity-40"
//         style={{
//           background:
//             "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
//           maskImage:
//             "linear-gradient(to bottom, black 25%, transparent 100%)",
//         }}
//       />

//       {/* Center Content */}
//       <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
//         {/* Cube Card */}
//         <div className="group relative h-[150px] w-[150px] sm:h-[210px] sm:w-[210px] md:h-[260px] md:w-[260px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-px shadow-[0_0_40px_rgba(255,255,255,0.04)]">
//           <span
//             aria-hidden="true"
//             className="absolute inset-0 z-0 scale-x-[2] blur-sm before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-[spin_4s_linear_infinite] before:bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,rgba(255,255,255,0.6)_50%,transparent_70%,transparent_100%)]"
//           />
//           <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[22px] bg-black/95 overflow-hidden">
//             <div ref={containerRef} className="h-full w-full" />
//           </div>
//         </div>

//         {/* Text */}
//         <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
//           <h2 className="text-base sm:text-lg font-medium tracking-tight text-slate-200">
//             Initializing Library
//           </h2>

//           <div className="flex items-center gap-1.5 px-4 py-1 text-[10px] sm:text-sm tracking-[2px] uppercase text-slate-500">
//             <span>Loading</span>
//             <span className="flex gap-1">
//               <span className="animate-[bounce_1.4s_infinite_0ms]">.</span>
//               <span className="animate-[bounce_1.4s_infinite_200ms]">.</span>
//               <span className="animate-[bounce_1.4s_infinite_400ms]">.</span>
//             </span>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="relative h-[2px] w-32 sm:w-44 overflow-hidden rounded bg-white/5">
//           <div
//             className="absolute top-0 h-full w-[40%] rounded"
//             style={{
//               background:
//                 "linear-gradient(90deg, transparent, rgba(180,180,210,0.5), rgba(220,220,240,0.7), rgba(180,180,210,0.5), transparent)",
//               animation: "slideBar 2s ease-in-out infinite",
//             }}
//           />
//         </div>

//         {/* Tagline */}
//         <p className="text-[9px] sm:text-[11px] font-light uppercase tracking-[3px] sm:tracking-[4px] text-slate-600 animate-pulse">
//           Preparing your experience
//         </p>
//       </div>

//       {/* Bottom Glow */}
//       <div
//         className="absolute bottom-0 left-1/2 h-[200px] sm:h-[300px] w-full max-w-[300px] sm:max-w-[420px] -translate-x-1/2 animate-pulse opacity-20"
//         style={{
//           background:
//             "conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%), radial-gradient(rgba(200,200,200,0.08) 0%, transparent 80%)",
//         }}
//       />

//       <style>{`
//         @keyframes slideBar {
//           0% { left: -40%; }
//           100% { left: 100%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BookLoader;