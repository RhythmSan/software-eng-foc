
console.log(' EGG FILE LOADED');
document.addEventListener('DOMContentLoaded', () => {

  const SECRET = 'mitsuruland';
  const MITSURU_URL = '../Images/mitsuru.jpeg';


  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

 
  let isActive = false;


  const originalState = new Map();
  function cacheOriginal(el, prop, value) {
    if (!originalState.has(el)) originalState.set(el, []);
    originalState.get(el).push({ prop, value });
  }


  function activate() {
    if (isActive) return;
    isActive = true;


    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      cacheOriginal(heroImage, 'backgroundImage', heroImage.style.backgroundImage);
      cacheOriginal(heroImage, 'backgroundSize',  heroImage.style.backgroundSize);
      cacheOriginal(heroImage, 'backgroundPosition', heroImage.style.backgroundPosition);
      heroImage.style.backgroundImage    = `url('${MITSURU_URL}')`;
      heroImage.style.backgroundSize     = 'cover';
      heroImage.style.backgroundPosition = 'center';

      const placeholder = heroImage.querySelector('.placeholder-graphic');
      if (placeholder) {
        cacheOriginal(placeholder, 'display', placeholder.style.display);
        placeholder.style.display = 'none';
      }
    }


    document.querySelectorAll('.card-image').forEach(card => {
      cacheOriginal(card, 'backgroundImage', card.style.backgroundImage);
      cacheOriginal(card, 'backgroundSize',  card.style.backgroundSize);
      cacheOriginal(card, 'backgroundPosition', card.style.backgroundPosition);
      card.style.backgroundImage    = `url('${MITSURU_URL}')`;
      card.style.backgroundSize     = 'cover';
      card.style.backgroundPosition = 'center';

      const mini = card.querySelector('.mini-graphic');
      if (mini) {
        cacheOriginal(mini, 'display', mini.style.display);
        mini.style.display = 'none';
      }
    });


    document.querySelectorAll('.map-pin').forEach(pin => {
      cacheOriginal(pin, 'textContent', pin.textContent);
      pin.textContent = '🌸';
    });

    showToast(' Mitsuruland unlocked ');
  }

  function deactivate() {
    if (!isActive) return;
    isActive = false;

    originalState.forEach((changes, el) => {
      changes.forEach(({ prop, value }) => {
        el.style[prop] = value;
      });
    });
    originalState.clear();

    showToast(' Back to heritage mode');
  }

  function showToast(message) {
    let toast = document.getElementById('eggToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'eggToast';
      Object.assign(toast.style, {
        position:      'fixed',
        bottom:        '24px',
        left:          '50%',
        transform:     'translateX(-50%) translateY(20px)',
        background:    '#1c4b2a',
        color:         '#fff',
        padding:       '12px 22px',
        borderRadius:  '40px',
        fontSize:      '0.9rem',
        fontWeight:    '600',
        fontFamily:    "'Inter', sans-serif",
        boxShadow:     '0 8px 24px rgba(0,0,0,0.2)',
        opacity:       '0',
        transition:    'opacity 0.3s ease, transform 0.3s ease',
        zIndex:        '9999',
        pointerEvents: 'none',
      });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2200);
  }


  searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim().toLowerCase();

    if (value === SECRET && !isActive) {
      activate();
    } else if (value !== SECRET && isActive) {

      deactivate();
    }
  });

  searchInput.addEventListener('paste', () => {
    setTimeout(() => {
      const value = searchInput.value.trim().toLowerCase();
      if (value === SECRET && !isActive)      activate();
      else if (value !== SECRET && isActive)  deactivate();
    }, 0);
  });


  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      if (isActive) deactivate();
    }
  });

});