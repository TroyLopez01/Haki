:root {
    --forest: #2d5a27;
    --grass: #8cbf88;
    --cream: #F0EBE3;
    --dark: #1a1a1a;
}

/* Totoro Head Cursor */
* {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="18" r="10" fill="%239e9e9e"/><circle cx="13" cy="15" r="2" fill="white"/><circle cx="19" cy="15" r="2" fill="white"/><path d="M12,8 L14,14 L10,14 Z" fill="%239e9e9e"/><path d="M20,8 L18,14 L22,14 Z" fill="%239e9e9e"/></svg>'), auto;
}

body {
    background-color: var(--grass);
    font-family: 'VT323', monospace;
    margin: 0; padding: 20px;
    display: flex; justify-content: center;
    overflow-x: hidden;
}

.pixel-font { font-family: 'Press Start 2P', cursive; font-size: 0.7rem; color: var(--forest); line-height: 1.5; }
.tiny { font-size: 0.5rem; }
.body-font { font-size: 1.5rem; color: var(--dark); margin: 5px 0; }

.game-wrapper { max-width: 500px; width: 100%; position: relative; z-index: 10; }

.card {
    background: var(--cream);
    border: 4px solid var(--dark);
    box-shadow: 6px 6px 0px rgba(0,0,0,0.2);
    padding: 20px; margin-bottom: 25px; text-align: center;
}

.rain {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: url('https://www.transparenttextures.com/patterns/rain.png');
    opacity: 0.2; z-index: 1; pointer-events: none;
}

/* Totoro Bounce Animation */
#totoro-img { 
    width: 200px; 
    height: auto; 
    cursor: pointer; 
    transition: transform 0.1s cubic-bezier(.47,1.64,.41,.8);
    image-rendering: pixelated;
}
.totoro-container { position: relative; }
.pixel-bubble {
    position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
    background: white; border: 2px solid black; padding: 5px;
    font-family: 'Press Start 2P'; font-size: 0.5rem; display: none; z-index: 20;
}

/* FLUFFY SWARM SPRITES */
.soot {
    position: fixed; 
    width: 30px; height: 30px; /* Smaller */
    z-index: 5; 
    transition: left 2.5s ease-in-out, top 2.5s ease-in-out; /* Smooth group move */
    animation: vibrate 0.1s infinite; /* Fluffy shiver */
}

@keyframes vibrate {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(1px, -1px) scale(1.05); }
}

.grid-3x4 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 15px; }
@media (max-width: 500px) { .grid-3x4 { grid-template-columns: repeat(2, 1fr); } }

.quest-box {
    aspect-ratio: 1/1; background: var(--forest); border: 3px solid var(--dark);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; background-size: cover; position: relative; color: white;
}
.caption { position: absolute; bottom: 0; width: 100%; background: rgba(0,0,0,0.7); font-size: 0.6rem; color: white; padding: 2px 0; }

.mood-btns { display: flex; gap: 10px; }
button { padding: 10px; border: 3px solid var(--dark); font-family: 'Press Start 2P'; font-size: 0.5rem; cursor: pointer; background: white; flex: 1; }
button:active { background: #ddd; }

#noBtn { position: absolute; left: 60%; transition: 0.1s; }
#yesBtn { position: absolute; left: 10%; background: #ff7675; color: white; }

.acorn-btn { font-size: 4rem; background: none; border: none; cursor: pointer; }
.bar { background: #ccc; border: 2px solid var(--dark); height: 12px; margin-top: 5px; }
.fill { height: 100%; transition: width 0.5s ease; }

/* --- Gimmick Animations --- */

/* The shake effect when clicked */
@keyframes leafShake {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    50% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
}

.shake-it {
    animation: leafShake 0.4s ease-in-out;
}

/* The smooth pop effect when photo reveals */
@keyframes photoPop {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

.quest-box.open {
    animation: photoPop 0.4s cubic-bezier(.47,1.64,.41,.8);
    border: 3px solid #ff7675; /* Highlight the found memory */
}
#game-gate {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: #576F72; /* Darker Forest Night */
    z-index: 5000; display: flex; justify-content: center; align-items: center;
    overflow: hidden;
}

.game-area {
    position: relative;
    width: 320px; height: 400px;
    border: 4px dashed white;
    margin: 20px auto;
    background: rgba(0,0,0,0.2);
    overflow: hidden; /* Ticket stays inside the box */
}

#target-ticket {
    position: absolute;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 5100;
    transition: all 0.2s ease-out; /* Speed of the jump */
    user-select: none;
}

.watching-totoro {
    position: absolute;
    bottom: -10px; /* Sits slightly lower for a cleaner look */
    left: 50%;
    transform: translateX(-50%);
    width: 140px; /* Adjusted size for the GIF */
    opacity: 1; /* GIFs look better at full opacity */
    z-index: 5050;
    /* This keeps pixel art looking sharp */
    image-rendering: pixelated; 
}

.pixel-bubble-gate {
    position: absolute; top: 10px; left: 50%;
    transform: translateX(-50%);
    background: white; border: 2px solid black;
    padding: 5px; font-family: 'Press Start 2P';
    font-size: 0.5rem; width: 80%;
}
/* Boss Phase Screen Shake */
@keyframes screenShake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.boss-shake {
    animation: screenShake 0.5s infinite;
}
#musicToggle {
    /* Position it in the bottom-right corner */
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;

    /* Make it small */
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 1.2rem; /* Size of the speaker icon */
    
    /* Make it match your theme */
    background: var(--cream);
    border: 3px solid var(--dark);
    box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
    
    /* Center the icon inside */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

/* Make it slightly smaller when clicked */
#musicToggle:active {
    box-shadow: none;
    transform: translate(2px, 2px);
}
/* Hide the main content initially */
.game-wrapper {
    display: none; 
    max-width: 500px;
    width: 100%;
    position: relative;
    z-index: 10;
}

/* Pre-loader Container */
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #8cbf88; /* Matches your --grass color */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Higher than everything else */
    transition: opacity 0.8s ease, visibility 0.8s;
}

.preloader-content {
    text-align: center;
}

.preloader-gif {
    width: 120px;
    height: auto;
}

/* Loading Bar Animation */
.loading-bar-container {
    width: 200px;
    height: 8px;
    background: rgba(0,0,0,0.2);
    border: 2px solid var(--dark);
    margin: 15px auto;
    overflow: hidden;
}

.loading-bar-fill {
    width: 0%;
    height: 100%;
    background: white;
    animation: loadingFill 2s forwards; /* Adjust time as needed */
}

@keyframes loadingFill {
    0% { width: 0%; }
    100% { width: 100%; }
}

/* NO Button Popup GIF */
#no-popup {
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 99999;
    justify-content: center;
    align-items: center;
}

#no-popup img {
    width: 280px;
    max-width: 90vw;
    border: 4px solid var(--dark);
    box-shadow: 8px 8px 0px rgba(0,0,0,0.4);
    border-radius: 4px;
}
