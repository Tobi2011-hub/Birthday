/* ============================================
   PHOTON-INSPIRED BIRTHDAY LETTER — script.js
   Sidebar toggle + extra micro-interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sidebar (Photon overlay nav) ---------- */
  const menuTrigger  = document.getElementById('menuTrigger');
  const sidebar      = document.getElementById('sidebarOverlay');
  const closeBtn     = document.getElementById('closeSidebar');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  function openSidebar() {
    sidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuTrigger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // Close when a nav link is clicked
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
    });
  });

  /* ---------- Parallax on floating hearts ---------- */
  const hearts = document.querySelectorAll('.floating-heart');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    hearts.forEach((heart, i) => {
      const speed = (i + 1) * 0.6;
      heart.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  /* ---------- Giant birthday sign: click to re-trigger ---------- */
  const giantSign = document.getElementById('giantBirthday');
  const words     = giantSign.querySelectorAll('.word');

  giantSign.addEventListener('click', () => {
    words.forEach((word, i) => {
      word.style.animation = 'none';
      // Force reflow so animation restarts
      void word.offsetWidth;
      word.style.animation = `wordDrop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
      word.style.animationDelay = `${i * 0.3}s`;
    });
  });

  /* ---------- Letter card: subtle tilt on mousemove ---------- */
  const card = document.querySelector('.letter-card');

  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / rect.width;
    const dy    = (e.clientY - cy) / rect.height;

    card.style.transform =
      `perspective(1200px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)';
  });

  /* ---------- Confetti burst on first click of giant sign ---------- */
  function createConfetti() {
    const colors = ['#e8b4b8', '#d4af7a', '#f8f6f2', '#f5d6d9', '#c9a27e'];

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.position = 'fixed';
      piece.style.width    = Math.random() * 8 + 4 + 'px';
      piece.style.height   = Math.random() * 8 + 4 + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = '50%';
      piece.style.top  = '50%';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.pointerEvents = 'none';
      piece.style.zIndex = '9999';
      piece.style.opacity = '1';

      document.body.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 400 + 150;
      const xDest = Math.cos(angle) * velocity;
      const yDest = Math.sin(angle) * velocity;

      piece.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${xDest}px, ${yDest + 300}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 1500 + 1200,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      }).onfinish = () => piece.remove();
    }
  }

  let confettiFired = false;
  giantSign.addEventListener('click', () => {
    if (!confettiFired) {
      createConfetti();
      confettiFired = true;
      // Reset after 2 seconds so it can fire again
      setTimeout(() => confettiFired = false, 2000);
    }
  });

  /* ---------- Auto-fire confetti after the sign appears ---------- */
  setTimeout(() => {
    createConfetti();
  }, 4500);

});