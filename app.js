
  const GAMES = {
    mlbb: {
      name: 'Mobile Legends',
      icon: '⚔️',
      theme: 'g-mlbb',
      sub: 'Enter your MLBB ID + Server to top up Diamonds',
      currency: '💎 Diamonds',
      packages: [
        { amt: 11, price: '$0.30' }, { amt: 22, price: '$0.55' }, { amt: 56, price: '$1.40' },
        { amt: 112, price: '$2.80' }, { amt: 240, price: '$5.50' }, { amt: 296, price: '$6.80' },
        { amt: 514, price: '$11.50' }, { amt: 706, price: '$15.00' }, { amt: 1024, price: '$22.00' },
      ]
    },
    'mlbb-ph': {
      name: 'MLBB Philippines',
      icon: '⚔️',
      theme: 'g-mlbb',
      sub: 'Philippines server top-up',
      currency: '💎 Diamonds',
      packages: [
        { amt: 11, price: '₱15' }, { amt: 56, price: '₱70' }, { amt: 112, price: '₱140' },
        { amt: 240, price: '₱295' }, { amt: 514, price: '₱595' }, { amt: 1024, price: '₱1,175' },
      ]
    },
    ff: {
      name: 'Free Fire',
      icon: '🔥',
      theme: 'g-ff',
      sub: 'Enter your Free Fire UID to top up Diamonds',
      currency: '💎 Diamonds',
      packages: [
        { amt: 50, price: '$0.80' }, { amt: 100, price: '$1.50' }, { amt: 310, price: '$4.50' },
        { amt: 520, price: '$7.50' }, { amt: 1060, price: '$15.00' }, { amt: 2180, price: '$30.00' },
      ]
    },
    pubg: {
      name: 'PUBG Mobile',
      icon: '🎯',
      theme: 'g-pubg',
      sub: 'Enter your PUBG Player ID to top up UC',
      currency: '🪙 UC',
      packages: [
        { amt: 60, price: '$1.00' }, { amt: 300, price: '$5.00' }, { amt: 600, price: '$10.00' },
        { amt: 1500, price: '$25.00' }, { amt: 3000, price: '$50.00' }, { amt: 6000, price: '$100.00' },
      ]
    },
    genshin: {
      name: 'Genshin Impact',
      icon: '🌙',
      theme: 'g-genshin',
      sub: 'Enter your UID + Server to top up Genesis Crystals',
      currency: '🔷 Crystals',
      packages: [
        { amt: 60, price: '$1.00' }, { amt: 300, price: '$5.00' }, { amt: 980, price: '$15.00' },
        { amt: 1980, price: '$30.00' }, { amt: 3280, price: '$50.00' }, { amt: 6480, price: '$100.00' },
      ]
    },
    hok: {
      name: 'Honor of Kings',
      icon: '👑',
      theme: 'g-hok',
      sub: 'Enter your Player ID to top up Tokens',
      currency: '🪙 Tokens',
      packages: [
        { amt: 50, price: '$0.90' }, { amt: 100, price: '$1.80' }, { amt: 250, price: '$4.50' },
        { amt: 500, price: '$9.00' }, { amt: 1000, price: '$18.00' }, { amt: 2000, price: '$35.00' },
      ]
    },
    mc: {
      name: 'Magic Chess',
      icon: '♟️',
      theme: 'g-mc',
      sub: 'Top up Magic Chess Diamonds',
      currency: '💎 Diamonds',
      packages: [
        { amt: 56, price: '$1.40' }, { amt: 112, price: '$2.80' }, { amt: 240, price: '$5.50' },
        { amt: 514, price: '$11.50' }, { amt: 1024, price: '$22.00' }, { amt: 2048, price: '$44.00' },
      ]
    },
    zepeto: {
      name: 'Zepeto',
      icon: '🌸',
      theme: 'g-zepeto',
      sub: 'Top up Zepeto ZEM Coins',
      currency: '🌟 ZEM',
      packages: [
        { amt: 100, price: '$1.00' }, { amt: 300, price: '$3.00' }, { amt: 600, price: '$6.00' },
        { amt: 1200, price: '$12.00' }, { amt: 2500, price: '$24.00' }, { amt: 5000, price: '$48.00' },
      ]
    },
    bs: {
      name: 'Blood Strike',
      icon: '💥',
      theme: 'g-bs',
      sub: 'Top up Blood Strike Diamonds',
      currency: '💎 Diamonds',
      packages: [
        { amt: 60, price: '$1.00' }, { amt: 180, price: '$3.00' }, { amt: 360, price: '$6.00' },
        { amt: 900, price: '$15.00' }, { amt: 1800, price: '$30.00' }, { amt: 3600, price: '$60.00' },
      ]
    }
  };

  let selectedPkg = null;
  let currentGame = null;

  function openModal(gameId) {
    const g = GAMES[gameId];
    if (!g) return;
    currentGame = g;
    selectedPkg = null;

    document.getElementById('modalIcon').className = 'modal-game-icon ' + g.theme;
    document.getElementById('modalIcon').textContent = g.icon;
    document.getElementById('modalTitle').textContent = g.name;
    document.getElementById('modalSub').textContent = g.sub;
    document.getElementById('playerId').value = '';
    document.getElementById('serverId').value = '';

    const pkgEl = document.getElementById('packages');
    pkgEl.innerHTML = g.packages.map((p, i) =>
      `<div class="pkg" onclick="selectPkg(${i})" id="pkg-${i}">
        <div class="pkg-gem">${g.currency.split(' ')[0]}</div>
        <div class="pkg-amount">${p.amt.toLocaleString()}</div>
        <div class="pkg-price">${p.price}</div>
      </div>`
    ).join('');

    document.getElementById('modalOverlay').classList.add('open');
  }

  function selectPkg(i) {
    document.querySelectorAll('.pkg').forEach(p => p.classList.remove('selected'));
    document.getElementById('pkg-' + i)?.classList.add('selected');
    selectedPkg = currentGame.packages[i];
  }

  function closeModal(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
  }
  function closeModalDirect() {
    document.getElementById('modalOverlay').classList.remove('open');
  }

  function confirmOrder() {
    const pid = document.getElementById('playerId').value.trim();
    if (!pid) { alert('Please enter your Player ID.'); return; }
    if (!selectedPkg) { alert('Please select a package.'); return; }
    alert(`✅ Order Received!\n\nGame: ${currentGame.name}\nPlayer ID: ${pid}\nPackage: ${selectedPkg.amt.toLocaleString()} ${currentGame.currency}\nPrice: ${selectedPkg.price}\n\nPlease proceed to payment via Telegram or our payment gateway.`);
    closeModalDirect();
  }

  // stagger animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = 1; });
  }, { threshold: 0.1 });
  document.querySelectorAll('.game-card, .step-card, .payment-strip').forEach(el => {
    observer.observe(el);
  });
