// ==========================================
// 1. GLOBAL STATE & VARIABLES
// ==========================================
let stagesCleared = 0;
let gameActive = true;
let musicStarted = false;
let ticketSpeed = 800; // Ticket jump speed in ms
let movementInterval;

let hunger = 80;
let acorns = 0;
let bounces = 0;

const bgMusic = document.getElementById('bgMusic');
const popSound = document.getElementById('popSound');
const target = document.getElementById('target-ticket');
const gateMsg = document.getElementById('gate-msg');
const stageDisplay = document.getElementById('stage-count');

// Photo Captions
const txts = [
    "Day 1 ❤️", "U weird lol", "My Baby", "Hungry??", "My fav",
    "Level 2 chaos", "Sweet soul", "GANDAAAAAAAAAA", "Totoro-ly love u",
    "AKIN KA LANG!", "I'll Marry you SOON!", "Monthsary! 🥂"
];
// ==========================================
// PRE-LOADER LOGIC
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // We give it 2.5 seconds so they can actually see the cute GIF
    setTimeout(() => {
        preloader.classList.add('loader-hidden');
    }, 2500); 
});

// ==========================================
// 2. THE TICKET CHASE GAME (GATEKEEPER)
// ==========================================

function moveTicket() {
    if (!gameActive) return;

    // Boundary check: game-area is 320x400
    // We subtract ticket size (~40px) to keep it inside
    const maxX = 280;
    const maxY = 340;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    target.style.left = newX + "px";
    target.style.top = newY + "px";

    const taunts = ["Too slow!", "Try harder!", "Missed me!", "Hehe!", "Focus!", "Over here!"];
    if (Math.random() > 0.7) {
        gateMsg.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    }
}

// Start automatic jumping
movementInterval = setInterval(moveTicket, ticketSpeed);

function catchTicket() {
    if (!gameActive) return;

    // Start music on first catch
    if (!musicStarted && bgMusic) {
        bgMusic.play().catch(e => console.log("Music waiting for interaction"));
        bgMusic.volume = 0.4;
        musicStarted = true;
    }

    stagesCleared++;
    stageDisplay.innerText = stagesCleared;
    popSound.currentTime = 0;
    popSound.play();

    // Make it harder: Increase speed and shrink ticket
    clearInterval(movementInterval);
    ticketSpeed -= 120; // Gets faster every hit
    movementInterval = setInterval(moveTicket, ticketSpeed);
    target.style.fontSize = (2.5 - (stagesCleared * 0.3)) + "rem";

    // Progress Messages
    if (stagesCleared === 1) gateMsg.innerText = "Level 1: CRUSH ❤️";
    if (stagesCleared === 3) gateMsg.innerText = "Level 3: OBSESSED ❤️❤️❤️";

    if (stagesCleared >= 5) {
        gameActive = false;
        clearInterval(movementInterval);
        gateMsg.innerText = "LEVEL 5: FOREVER!! ❤️";
        target.style.display = "none";

        setTimeout(() => {
            unlockSite();
        }, 800);
    }
}

function unlockSite() {
    const gate = document.getElementById('game-gate');
    gate.style.transform = "translateY(-100%)"; // Slide up effect

    setTimeout(() => {
        gate.style.display = "none";
        document.querySelector('.game-wrapper').style.display = "block";
        confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#ffb3ba', '#baffc9', '#bae1ff', '#ffffba']
        });
    }, 1000);
}

// ==========================================
// 3. MUSIC & MAIN SITE UI
// ==========================================

function toggleMusic() {
    const btn = document.getElementById('musicToggle');
    if (bgMusic.paused) {
        bgMusic.play();
        btn.innerText = "🔊";
    } else {
        bgMusic.pause();
        btn.innerText = "🔈";
    }
}

// Totoro Belly Bounce
function totoroBounce() {
    bounces++;
    document.getElementById('bounceCount').innerText = bounces;
    popSound.play();
    const img = document.getElementById('totoro-img');
    const bubble = document.getElementById('roar-bubble');
    img.style.transform = "scale(1.3, 0.8)";
    if (bubble) bubble.style.display = "block";
    setTimeout(() => {
        img.style.transform = "scale(1, 1)";
        if (bubble) bubble.style.display = "none";
    }, 150);
}

// ==========================================
// 4. SOOT SPRITE SWARM
// ==========================================
const swarmContainer = document.getElementById('soot-swarm');
const sprites = [];
const spriteCount = 40;
const fluffySootSVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,2 L55,20 L65,5 L70,25 L85,10 L80,30 L98,25 L85,45 L100,60 L80,65 L90,85 L70,75 L65,95 L50,80 L35,95 L30,75 L10,85 L20,65 L0,60 L15,45 L2,25 L20,30 L15,10 L30,25 L35,5 L45,20 Z" fill="black" /><circle cx="35" cy="45" r="8" fill="white" /><circle cx="65" cy="45" r="8" fill="white" /><circle cx="35" cy="45" r="3" fill="black" /><circle cx="65" cy="45" r="3" fill="black" /></svg>`;

for (let i = 0; i < spriteCount; i++) {
    const soot = document.createElement('div');
    soot.className = 'soot';
    soot.innerHTML = fluffySootSVG;
    soot.style.left = Math.random() * 100 + "vw";
    soot.style.top = Math.random() * 100 + "vh";
    swarmContainer.appendChild(soot);
    sprites.push(soot);
}

setInterval(() => {
    const targetX = Math.random() * 80; const targetY = Math.random() * 80;
    sprites.forEach((s, i) => {
        setTimeout(() => {
            s.style.left = (targetX + (Math.random() - 0.5) * 20) + "vw";
            s.style.top = (targetY + (Math.random() - 0.5) * 20) + "vh";
        }, i * 20);
    });
}, 3000);

function scareSprites() {
    popSound.play();
    sprites.forEach(s => { s.style.left = Math.random() * 100 + "vw"; s.style.top = Math.random() * 100 + "vh"; });
}

// ==========================================
// 5. GAME MECHANICS (HUNGER & ACORNS)
// ==========================================

setInterval(() => {
    hunger -= 5;
    if (hunger < 0) hunger = 0;
    const bar = document.getElementById('hunger-bar');
    if (bar) bar.style.width = hunger + "%";
    if (hunger < 30) {
        document.getElementById('hunger-warning').style.display = "block";
        if (bar) bar.style.background = "red";
    }
}, 2000);

function feedOnigiri() {
    hunger = 100;
    const bar = document.getElementById('hunger-bar');
    if (bar) { bar.style.width = "100%"; bar.style.background = "#ff7675"; }
    document.getElementById('hunger-warning').style.display = "none";
    popSound.play();
    confetti({ particleCount: 50, spread: 40, colors: ['#ffffff', '#000000'] });
}

function addAcorn() {
    acorns++;
    document.getElementById('acornCount').innerText = acorns;
    popSound.play();
    if (acorns >= 50) {
        const secret = document.getElementById('secretMsg');
        if (secret) {
            secret.style.display = 'block';
            secret.innerText = `give me ${acorns} akiss`;
        }
    }
}

// ==========================================
// 6. PHOTO GRID (SHAKE & POP)
// ==========================================
const grid = document.getElementById('photoGrid');
if (grid) {
    for (let i = 1; i <= 12; i++) {
        const box = document.createElement('div');
        box.className = 'quest-box';
        box.innerHTML = '🍃';
        box.onclick = () => {
            if (!box.classList.contains('open')) {
                box.classList.add('shake-it');
                popSound.play();
                const rect = box.getBoundingClientRect();
                confetti({
                    particleCount: 35, spread: 60,
                    origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
                    colors: ['#ffb3ba', '#baffc9', '#bae1ff', '#ffffba'],
                    shapes: ['circle'], scalar: 0.8
                });
                setTimeout(() => {
                    box.classList.remove('shake-it'); box.classList.add('open');
                    box.style.backgroundImage = url('assets/${i}.jpg');
                    box.innerHTML = `<div class="caption">${txts[i - 1]}</div>`;
                    totoroBounce();
                }, 400);
            }
        };
        grid.appendChild(box);
    }
}

// ==========================================
// 7. LOVE TEST
// ==========================================
const noBtn = document.getElementById('noBtn');
if (noBtn) {
    noBtn.addEventListener('mouseover', function () {
        this.style.left = Math.random() * 80 + "%";
        this.style.top = Math.random() * 50 + "px";
    });
}

function celebrate() { confetti({ particleCount: 150, spread: 70 }); alert("I KNEW IT! I LOVE YOU SO MUCH ❤️"); }