
//   HERITAGEGO  Sidebar 

document.addEventListener('DOMContentLoaded', () => {


    // 1. ROTATING HERO TAGLINE 

  const lines = document.querySelectorAll('.tagline-line');
  if (lines.length) {
    let index = 0;
    lines[0].classList.add('is-visible');

    setInterval(() => {
      lines[index].classList.remove('is-visible');
      index = (index + 1) % lines.length;
      lines[index].classList.add('is-visible');
    }, 5000);
  }


    // 2. SIDEBAR TOGGLE

  const logoBtn  = document.getElementById('logoBtn');
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('sidebarClose');

  if (!logoBtn || !sidebar || !overlay) return;

  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-open');
    sidebar.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-open');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  logoBtn.addEventListener('click', openSidebar);
  logoBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSidebar();
    }
  });

  closeBtn?.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  });

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      console.log('Navigate to:', link.dataset.page);
      closeSidebar();
    });
  });

  /* --------------------------------------------
     3. FUTURE: swap pin logo for image
     Uncomment when you have a logo.png in Images/
  -------------------------------------------- */
  //
  // const logoIcon = document.getElementById('logoIcon');
  // if (logoIcon) {
  //   const img = document.createElement('img');
  //   img.src = '../Images/logo.png';
  //   img.alt = 'HeritageGo';
  //   img.style.width = '24px';
  //   img.style.height = '24px';
  //   logoIcon.replaceWith(img);
  // }

});