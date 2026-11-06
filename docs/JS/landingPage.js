//   HERITAGEGO — Landing Page

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. LANDMARK DATA (shared by Explore list)
     ======================================================== */
  const LANDMARKS = [
    { id: 'barasoain',         name: 'Barasoain Church',                 category: 'historical', distance: '0.9 km', rating: 5, image: '../Images/Barasoain-Church.jpg' },
    { id: 'casa-real',         name: 'Casa Real Shrine',                 category: 'historical', distance: '1.1 km', rating: 5, image: '../Images/casa-real.jpg' },
    { id: 'malolos-cathedral', name: 'Malolos Cathedral',                category: 'cultural',   distance: '1.3 km', rating: 5, image: '../Images/malolos-cathedral.jpg' },
    { id: 'kamestizuhan',      name: 'Kamestizuhan District',            category: 'cultural',   distance: '1.6 km', rating: 5, image: '../Images/kamestizuhan.jpg' },
    { id: 'paseo',             name: 'Paseo del Congreso',               category: 'parks',      distance: '1.8 km', rating: 5, image: '../Images/paseo.jpg' },
    { id: 'republic-shrine',   name: 'Malolos Republic Shrine',          category: 'historical', distance: '1.3 km', rating: 4, image: '../Images/republic-shrine.jpg' },
    { id: 'barasoain-museum',  name: 'Barasoain Museum',                 category: 'historical', distance: '1.1 km', rating: 5, image: '../Images/barasoain-museum.jpg' },
    { id: 'heritage-house',    name: 'Malolos Heritage House',           category: 'cultural',   distance: '0.9 km', rating: 4, image: '../Images/heritage-house.jpg' },
    { id: 'arts-center',       name: 'Bulacan Arts Center',              category: 'cultural',   distance: '1.7 km', rating: 4, image: '../Images/arts-center.jpg' },
    { id: 'sports-complex',    name: 'Malolos Sports Complex',           category: 'parks',      distance: '2.0 km', rating: 4, image: '../Images/sports-complex.jpg' },
    { id: 'capitol-grounds',   name: 'Bulacan Provincial Capitol Grounds',category: 'parks',     distance: '1.6 km', rating: 4, image: '../Images/capitol-grounds.jpg' }
  ];

  const CATEGORY_LABEL = {
    historical: 'Historical',
    cultural:   'Cultural',
    parks:      'Parks'
  };

  /* ========================================================
     2. FEATURED LANDMARKS — horizontal slider (no tabs)
     ======================================================== */
  const grid = document.getElementById('cardGrid');

  if (grid) {
    // wheel-to-horizontal-scroll
    grid.addEventListener('wheel', (e) => {
      if (grid.scrollWidth <= grid.clientWidth) return;
      if (e.shiftKey) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        grid.scrollLeft += e.deltaY * 1.2;
      }
    }, { passive: false });

    // drag-to-scroll
    let isDown = false, startX = 0, startScroll = 0;
    grid.addEventListener('mousedown', (e) => {
      isDown = true;
      grid.classList.add('dragging');
      startX = e.pageX - grid.offsetLeft;
      startScroll = grid.scrollLeft;
    });
    grid.addEventListener('mouseleave', () => { isDown = false; });
    grid.addEventListener('mouseup',    () => { isDown = false; });
    grid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      grid.scrollLeft = startScroll - (x - startX) * 1.5;
    });
    grid.addEventListener('dragstart', (e) => e.preventDefault());

    // initial fade-in
    grid.querySelectorAll('.card').forEach(c => c.classList.add('fade-in'));
  }

  /* ========================================================
     3. EXPLORE MALOLOS — search + filter + list
     ======================================================== */
  const exploreList  = document.getElementById('exploreList');
  const exploreTabs  = document.querySelectorAll('#exploreTabs .tab');
  const exploreInput = document.getElementById('exploreSearch');

  let activeFilter = 'all';
  let activeQuery  = '';

  function renderExplore() {
    if (!exploreList) return;

    const filtered = LANDMARKS.filter(place => {
      const matchesFilter = activeFilter === 'all' || place.category === activeFilter;
      const matchesQuery  = place.name.toLowerCase().includes(activeQuery);
      return matchesFilter && matchesQuery;
    });

    if (!filtered.length) {
      exploreList.innerHTML = `<p class="explore-empty">No landmarks match your search.</p>`;
      return;
    }

    exploreList.innerHTML = filtered.map(place => `
      <a href="placesPage.html?id=${encodeURIComponent(place.id)}" class="explore-item">
        <div class="explore-thumb">
          <div class="mini-graphic"></div>
          <img
            src="${place.image}"
            alt=""
            class="explore-thumb-img"
            onerror="this.style.display='none'; this.previousElementSibling.style.display='block';"
          >
        </div>
        <div class="explore-info">
          <p class="explore-name">${place.name}</p>
          <p class="explore-meta">${CATEGORY_LABEL[place.category]} · ${place.distance}</p>
          <p class="explore-stars">${'★'.repeat(place.rating)}${'☆'.repeat(5 - place.rating)}</p>
        </div>
        <button class="explore-bookmark" type="button" aria-label="Save">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </a>
    `).join('');
  }

  exploreTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      exploreTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderExplore();
    });
  });

  if (exploreInput) {
    exploreInput.addEventListener('input', () => {
      activeQuery = exploreInput.value.trim().toLowerCase();
      renderExplore();
    });
  }

  renderExplore();
});