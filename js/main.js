// ===================================================================
// PORTEKİZ WEB SİTESİ - GELİŞMİŞ ETKİLEŞİM VE İNTERAKTİF ÖZELLİKLER
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  initFlagExplorer();
  initCurrencyTabs();
  initCoinFlips();
  initCityFilter();
  initLightbox();
});

// -------------------------------------------------------------------
// 1. İNTERAKTİF BAYRAK İNCELEYİCİ (FLAG EXPLORER)
// -------------------------------------------------------------------
const flagDetails = {
  green: {
    title: "🌿 Yeşil Renk (Sol %40 - Umudun Simgesi)",
    text: "Yeşil renk, Portekiz halkının geleceğe duyduğu derin <strong>umudu ve kararlılığı</strong> simgeler. 5 Ekim 1910 Cumhuriyet Devrimi ile Monarşi'nin mavi-beyaz bayrağı kaldırılarak aydınlık bir gelecek inancıyla bayrağın ilk %40'lık bölümü yeşile boyanmıştır."
  },
  red: {
    title: "🩸 Kırmızı Renk (Sağ %60 - Vatan ve Cesaret)",
    text: "Kırmızı renk, Portekiz ulusunun bağımsızlığı, sınırları ve onuru uğruna <strong>dökülen şehit kanlarını</strong>, halkın cesaretini ve vatanseverlik ateşini temsil eder. Bayrak alanının %60'ını oluşturarak güçlü bir fedakarlık vurgusu yapar."
  },
  sphere: {
    title: "🌐 Halkalı Küre (Esfera Armilar - Keşifler Çağı)",
    text: "Orta Çağ denizcilerinin gök cisimlerine bakarak yön tayin ettiği astronomik cihazdır. Vasco da Gama, Macellan ve Pedro Álvares Cabral gibi efsanevi Portekizli kaşiflerin <strong>Büyük Coğrafi Keşifler Çağı</strong>'nda dünyayı keşfetmelerini ve küresel denizcilik mirasını simgeler."
  },
  shield: {
    title: "🛡️ Portekiz Arması (5 Mavi Kalkan & 7 Altın Kale)",
    text: "<strong>5 Mavi Kalkan (Quinas):</strong> 1139 Ourique Muharebesi'nde Kral I. Afonso Henriques tarafından yenilgiye uğratılan 5 Mağribi kralını ve İsa'nın 5 yarasını simgeler.<br><strong>7 Altın Kale:</strong> Algarve bölgesinin fethiyle kazanılan stratejik kaleleri ve ulusal savunma gücünü temsil eder."
  }
};

function initFlagExplorer() {
  const hotspots = document.querySelectorAll('.flag-hotspot');
  const partBtns = document.querySelectorAll('.part-btn');
  const detailTitle = document.getElementById('flag-detail-title');
  const detailText = document.getElementById('flag-detail-text');

  function updateFlagDetail(partKey) {
    if (!flagDetails[partKey]) return;
    
    // Aktif durumları güncelle
    hotspots.forEach(h => h.classList.toggle('active', h.getAttribute('data-part') === partKey));
    partBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-part') === partKey));

    // Kartı animasyonlu güncelle
    detailTitle.innerHTML = flagDetails[partKey].title;
    detailText.innerHTML = flagDetails[partKey].text;
    
    const card = document.querySelector('.flag-detail-card');
    card.style.transform = 'scale(0.98)';
    setTimeout(() => card.style.transform = 'scale(1)', 150);
  }

  hotspots.forEach(spot => {
    spot.addEventListener('click', () => updateFlagDetail(spot.getAttribute('data-part')));
  });

  partBtns.forEach(btn => {
    btn.addEventListener('click', () => updateFlagDetail(btn.getAttribute('data-part')));
  });
}

// -------------------------------------------------------------------
// 2. PARA BİRİMİ GALERİ SEKMELERİ (ESKÜDO vs EURO)
// -------------------------------------------------------------------
function initCurrencyTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.currency-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === targetId);
      });
    });
  });
}

// -------------------------------------------------------------------
// 3. 3D MADENİ PARA ÇEVİRME (FLIP COIN EFFECT)
// -------------------------------------------------------------------
function initCoinFlips() {
  document.querySelectorAll('.coin-3d-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

// -------------------------------------------------------------------
// 4. ETKİLEŞİMLİ ŞEHİR FİLTRESİ
// -------------------------------------------------------------------
function initCityFilter() {
  const filterBtns = document.querySelectorAll('.city-filter-btn');
  const cards = document.querySelectorAll('.culture-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// -------------------------------------------------------------------
// 6. QUIZ SES EFEKTİ & LIGHTBOX
// -------------------------------------------------------------------
let audioCtx = null;

// Quiz ses efekti
function playChime(isCorrect) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isCorrect ? 587.33 : 220, audioCtx.currentTime);
    if (isCorrect) {
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
    }
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}

// -------------------------------------------------------------------
// 7. LIGHTBOX RESİM BÜYÜTME
// -------------------------------------------------------------------
function initLightbox() {
  const modal = document.createElement('div');
  modal.id = 'image-lightbox-modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    cursor: zoom-out;
  `;

  const modalImg = document.createElement('img');
  modalImg.style.cssText = `
    max-width: 90%;
    max-height: 85%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 45px rgba(0,0,0,0.9), 0 0 25px rgba(255, 196, 0, 0.5);
    border: 2px solid rgba(255, 196, 0, 0.4);
  `;

  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  document.querySelectorAll('.currency-img, .hero-flag-img, .culture-img, .geo-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      // 3D flip card tıklamasını engellememek için kontrol
      if (img.closest('.coin-3d-card')) return;
      modalImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
