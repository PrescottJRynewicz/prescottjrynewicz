import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prescott's Dirty Thirty | Partiful</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        body {
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #fff;
            line-height: 1.5;
            background-color: #111;
            background-image: linear-gradient(to bottom, #000, #222);
            position: relative;
            overflow-x: hidden;
        }

        /* Disco ball */
        .disco-ball {
            position: fixed;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle at 50% 50%, #999, #777);
            border-radius: 50%;
            box-shadow: 
                inset 0 0 50px #fff,
                inset 20px 0 80px #f0f,
                inset -20px 0 80px #0ff,
                inset 20px 0 300px #f0f,
                inset -20px 0 300px #0ff,
                0 0 50px #fff,
                -10px 0 80px #f0f,
                10px 0 80px #0ff;
            animation: rotate 10s linear infinite, shine 5s infinite;
        }

        @keyframes rotate {
            from { transform: translateX(-50%) rotate(0deg); }
            to { transform: translateX(-50%) rotate(360deg); }
        }

        @keyframes shine {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }

        /* Light beams */
        .light-beam {
            position: fixed;
            width: 10px;
            height: 1000px;
            background: linear-gradient(to bottom, rgba(255,0,255,0.5), rgba(255,0,255,0));
            animation: rotate-beam 8s infinite linear;
            transform-origin: top center;
        }

        .light-beam:nth-child(2) {
            background: linear-gradient(to bottom, rgba(0,255,255,0.5), rgba(0,255,255,0));
            animation-delay: 0.5s;
            left: 20%;
        }

        .light-beam:nth-child(3) {
            background: linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(255,255,0,0));
            animation-delay: 1s;
            left: 80%;
        }

        @keyframes rotate-beam {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Content styling */
        main {
            position: relative;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.6);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.3), 
                        0 0 40px rgba(0, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            margin-top: 70px;
        }
        
        @media (max-width: 768px) {
            main {
                padding: 10px;
            }
        }

        h1 {
            font-size: 36px;
            margin-bottom: 10px;
            color: #fff;
            text-align: center;
            text-shadow: 
                0 0 5px #fff,
                0 0 10px #fff,
                0 0 15px #f0f,
                0 0 20px #f0f,
                0 0 25px #f0f;
            animation: neon-pulse 2s infinite;
        }

        @keyframes neon-pulse {
            0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f0f, 0 0 20px #f0f, 0 0 25px #f0f; }
            50% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 25px #0ff; }
        }

        .event-time {
            font-size: 22px;
            margin-bottom: 20px;
            text-align: center;
            color: #f0f;
            animation: color-shift 5s infinite;
        }

        @keyframes color-shift {
            0% { color: #f0f; }
            33% { color: #0ff; }
            66% { color: #ff0; }
            100% { color: #f0f; }
        }

        .event-location {
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            color: #ff0;
        }

        .event-description {
            margin-bottom: 30px;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
            .event-description {
                padding: 10px;
            }
        }

        .event-description a {
            color: #f0f;
            text-decoration: none;
            border-bottom: 1px dotted #f0f;
            transition: all 0.3s ease;
        }

        .event-description a:hover {
            color: #0ff;
            border-bottom-color: #0ff;
            text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
        }

        .day-title {
            font-size: 22px;
            color: #f0f;
            margin-top: 20px;
            margin-bottom: 5px;
            text-shadow: 0 0 8px rgba(255, 0, 255, 0.7);
        }

        .event-item {
            margin-bottom: 8px;
            margin-top: 8px;
            margin-left: 15px;
        }
        
        @media (max-width: 768px) {
            .event-item {
                margin-bottom: 5px;
                margin-top: 5px;
                margin-left: 10px;
            }
        }

        .event-highlight {
            font-weight: bold;
            color: #ff0;
        }

        .price-option {
            margin-left: 30px;
            color: #0ff;
        }

        /* Floating shimmer effect */
        .shimmer {
            position: fixed;
            width: 4px;
            height: 4px;
            background-color: #fff;
            border-radius: 50%;
            animation: float 10s infinite linear;
            z-index: 1;
        }

        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-800px) translateX(100px);
                opacity: 0;
            }
        }

        .playlist-link {
            display: block;
            text-align: center;
            margin: 25px 0;
            color: #fff;
            text-decoration: none;
            font-size: 18px;
            padding: 10px 20px;
            background-color: rgba(255, 0, 255, 0.2);
            border-radius: 30px;
            border: 1px solid rgba(255, 0, 255, 0.5);
            transition: all 0.3s ease;
            animation: glow 3s infinite alternate;
        }

        .playlist-link:hover {
            background-color: rgba(0, 255, 255, 0.3);
            transform: scale(1.05);
            border-color: rgba(0, 255, 255, 0.8);
        }

        @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(255, 0, 255, 0.5); }
            100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
        }

        /* Navigation menu styling */
        .nav-menu {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .nav-link {
            color: #fff;
            text-decoration: none;
            padding: 8px 15px;
            background-color: rgba(255, 0, 255, 0.2);
            border-radius: 20px;
            border: 1px solid rgba(255, 0, 255, 0.3);
            transition: all 0.3s ease;
            font-size: 16px;
        }

        .nav-link:hover {
            background-color: rgba(0, 255, 255, 0.3);
            transform: scale(1.05);
            border-color: rgba(0, 255, 255, 0.5);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    <!-- Disco ball -->
    <div class="disco-ball"></div>
    
    <!-- Light beams -->
    <div class="light-beam" style="left: 10%; animation-delay: 0.2s;"></div>
    <div class="light-beam" style="left: 30%; animation-delay: 0.8s;"></div>
    <div class="light-beam" style="left: 50%; animation-delay: 0.5s;"></div>
    <div class="light-beam" style="left: 70%; animation-delay: 1.2s;"></div>
    <div class="light-beam" style="left: 90%; animation-delay: 0.3s;"></div>
    
    <!-- Floating shimmer particles -->
    <script>
        // Create shimmer particles
        function createShimmerParticles() {
            for (let i = 0; i < 50; i++) {
                const shimmer = document.createElement('div');
                shimmer.classList.add('shimmer');
                
                // Random positions
                shimmer.style.left = Math.random() * 100 + '%';
                shimmer.style.bottom = Math.random() * 20 + '%';
                
                // Random sizes
                const size = Math.random() * 3 + 2;
                shimmer.style.width = size + 'px';
                shimmer.style.height = size + 'px';
                
                // Random animation durations and delays
                const duration = Math.random() * 15 + 5;
                const delay = Math.random() * 5;
                shimmer.style.animationDuration = duration + 's';
                shimmer.style.animationDelay = delay + 's';
                
                document.body.appendChild(shimmer);
            }
        }
        
        // Call function when page loads
        window.onload = createShimmerParticles;
    </script>

    <main>
      <div style="width: 100%; text-align: center;">
      <img 
        src="https://partiful.imgix.net/user/cUzbVQvadaXR6Shi5UZcuDD84zB2/3fe94229-8b9b-46f7-a2?fit=clip&w=920&auto=format" 
        alt="Prescott's Dirty Thirty" 
        style="width: 500px; max-width: 100%; height: auto; margin-bottom: 20px; border-radius: 15px;" />
        </div>
        <h1 id="main-title">Prescott's Dirty Thirty</h1>

        <!-- Navigation Menu -->
        <div class="nav-menu">
            <a href="#main-title" class="nav-link">Top</a>
            <a href="#friday" class="nav-link">Friday</a>
            <a href="#saturday" class="nav-link">Saturday</a>
            <a href="#sunday" class="nav-link">Sunday</a>
            <a href="#playlist" class="nav-link">Playlist</a>
        </div>

        <a id="playlist" href="https://open.spotify.com/playlist/1OyHLGyr9eFcTNljQapJkT?si=73acfecffc4b4fad&pt=593971d8095b3c2ea4ed6c7315df37a6" target="_BLANK" class="playlist-link">
            🎵 Dirty Thirty Playlist 🎵
        </a>

        <div class="event-description">
            <p>WELCOME, friends, compadres, lovers, and Fred G - to a weekend of Prescott's favorite NYC activities!</p>

            <h2 id="friday" class="day-title">FRIDAY (May 9th)</h2>
            <p class="event-item">• Arrive anytime after 6:30 PM</p>
            <p class="event-item">• Board games and casual hangout in Gowanus</p>
            <p class="event-item">• <a href="https://www.google.com/maps/place/Royal+Palms+Shuffleboard+Club/@40.6798052,-73.9847322,17z/data=!4m6!3m5!1s0x89c25a55b113209b:0xa1d983d6fcedd155!8m2!3d40.6786376!4d-73.9869098!16s%2Fg%2F1ptx0dycd?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" target="_BLANK">Royal Palms Shuffleboard Club</a></p>
            <p class="event-item">• We might update to <a href="https://www.google.com/maps/place/Threes+Brewing/@40.6798052,-73.9847322,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25bab47b7fbff:0x7ddcbcc39bb2c360!8m2!3d40.6798012!4d-73.9821573!16s%2Fg%2F11b6cq329v?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" target="_BLANK">Threes Brewing</a> depending on how busy the shuffle board is. Will update with text blasts day of.</p>

            <h2 id="saturday" class="day-title">SATURDAY (May 10th)</h2>
            <p class="event-item">• <span class="event-highlight">10 AM - ESPRESCOTT'S CAFE:</span> Home-brewed espresso drinks and bagels at the Rynochin household. 25 Dean Street, #2R</p>
            <p class="event-item">• <span class="event-highlight">1 PM - Brooklyn Bridge Park:</span> Picnic, volleyball, and outdoor fun at <a href="https://www.google.com/maps/place/Brooklyn+Bridge+Park+Pier+3+Plaza/@40.697916,-74.0008789,18.35z/data=!4m14!1m7!3m6!1s0x89c25a55b113209b:0xa1d983d6fcedd155!2sRoyal+Palms+Shuffleboard+Club!8m2!3d40.6786376!4d-73.9869098!16s%2Fg%2F1ptx0dycd!3m5!1s0x89c25b206c5bbbff:0x21d6982f761f9611!8m2!3d40.6984433!4d-74.0003428!16s%2Fg%2F11gjp39007?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" target="_BLANK">BK Bridge Park</a> (walk or bike from the Rynochin household)</p>
            <p class="event-item">• <span class="event-highlight">4 PM - Siesta:</span> Prepare your body for the evening</p>
            <p class="event-item">• <span class="event-highlight">8:30 PM - Dinner and drinks</span> at <a href="https://www.google.com/maps/place/Spritzenhaus33/@40.7232932,-73.9552754,17z/data=!3m2!4b1!5s0x89c2594485b6b8b9:0x3a08baf1126564e8!4m6!3m5!1s0x89c259448f9fe1fd:0xdb8de662ae8f43ca!8m2!3d40.7232892!4d-73.9527058!16s%2Fg%2F1tdqjd9n?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" target="_BLANK">Spritzenhaus</a></p>
            <p class="event-item">• <span class="event-highlight">11:00 PM - DANCE THE NIGHT AWAY:</span> Leopard Lounge @ <a href="https://www.google.com/maps/place/Cafe+Balearica/@40.7211109,-73.9591058,17z/data=!3m1!4b1!4m6!3m5!1s0x89c259c4a644da9f:0x5cd59f1b483441d2!8m2!3d40.7211069!4d-73.9565362!16s%2Fg%2F11swxmbf9p?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" target="_BLANK">Cafe Balerica</a>. We have a table booked from 10:00 until close.</p>
            <p class="price-option">- Please Venmo <a href="venmo://users/prescott" onclick="if(navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)){return true;}else{window.open('https://venmo.com/prescott', '_blank');return false;}">@prescott</a></p>
            <p class="price-option">- $60 | Drinks included at the table. 3-5 drinks per person.</p>
            <p class="price-option">- Text me if you don't plan on drinking! </p>
            <p class="price-option">- First 25 arrivals: Free cover</p>
            <p class="price-option">- After that: $10 cash cover</p>
            <h2 id="sunday" class="day-title">SUNDAY (May 11th)</h2>
            <p class="event-item">• Free day - Sleep in with potential brunch for those still in town</p>

            <p style="margin-top: 20px; text-align: right; font-style: italic; color: #aaa;">Photo Credit: The Chin</p>
        </div>
    </main>
</body>
</html>`;

const DirtyThirty = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const imageUrl =
    'https://partiful.imgix.net/user/cUzbVQvadaXR6Shi5UZcuDD84zB2/3fe94229-8b9b-46f7-a2?fit=clip&w=920&auto=format';

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>🪩 Prescott&apos;s Dirty Thirty 🪩</title>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://prescottjrynewicz.com/dirty-thirty"
        />
        <meta
          property="og:title"
          content="Prescott's Dirty Thirty | Partiful"
        />
        <meta
          property="og:description"
          content="A weekend of Prescott's favorite NYC activities!"
        />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://prescottjrynewicz.com/dirty-thirty"
        />
        <meta
          property="twitter:title"
          content="Prescott's Dirty Thirty | Partiful"
        />
        <meta
          property="twitter:description"
          content="A weekend of Prescott's favorite NYC activities!"
        />
        <meta property="twitter:image" content={imageUrl} />
      </Head>
      <iframe
        ref={iframeRef}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        title="Prescott's Dirty Thirty"
      />
    </>
  );
};

export default DirtyThirty;
