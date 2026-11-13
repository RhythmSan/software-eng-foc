
//   HERITAGEGO My Trips Page

document.addEventListener('DOMContentLoaded', () => {

  const TRIPS = [
    { id: 'casa-real',         name: 'Casa Real Shrine',      category: 'Historical', walkTime: '14 min walk', status: 'bucket',  image: '../Images/placeholders/casa-real.jpg' },
    { id: 'malolos-cathedral', name: 'Malolos Cathedral',     category: 'Cultural',   walkTime: '16 min walk', status: 'bucket',  image: '../Images/placeholders/malolos-cathedral.jpg' },
    { id: 'kamestisuhan',      name: 'Kamestisuhan District', category: 'Cultural',   walkTime: '19 min walk', status: 'bucket',  image: '../Images/placeholders/kamestisuhan.jpg' },
    { id: 'barasoain',         name: 'Barasoain Church',      category: 'Historical', walkTime: '11 min walk', status: 'visited', image: '../Images/velvetroom.jpg' },
    { id: 'paseo',             name: 'Paseo del Congreso',    category: 'Parks',      walkTime: '14 min walk', status: 'visited', image: '../Images/placeholders/paseo.jpg' }
  ];

  const TOTAL_LANDMARKS = 10;

  const tripsList       = document.getElementById('tripsList');
  const visitedCountEl  = document.getElementById('visitedCount');
  const bucketCountEl   = document.getElementById('bucketCount');
  const visitedTabCount = document.getElementById('visitedTabCount');
  const totalCountEl    = document.getElementById('totalCount');
  const progressFill    = document.getElementById('progressFill');
  const toggleBtns      = document.querySelectorAll('.toggle-pill');

  const bucketItems  = TRIPS.filter(t => t.status === 'bucket');
  const visitedItems = TRIPS.filter(t => t.status === 'visited');
  const visitedNum   = visitedItems.length;
  const bucketNum    = bucketItems.length;

  if (visitedCountEl)  visitedCountEl.textContent  = visitedNum;
  if (bucketCountEl)   bucketCountEl.textContent   = bucketNum;
  if (visitedTabCount) visitedTabCount.textContent = visitedNum;
  if (totalCountEl)    totalCountEl.textContent    = TOTAL_LANDMARKS;

  if (progressFill) {
    const percent = Math.round((visitedNum / TOTAL_LANDMARKS) * 100);
    progressFill.style.width = percent + '%';
  }

  let currentView = 'bucket';
  function renderList() {
    if (!tripsList) return;

    const items = currentView === 'bucket' ? bucketItems : visitedItems;

    if (!items.length) {
      tripsList.innerHTML = `<p class="trips-empty">No places here yet.</p>`;
      return;
    }
    tripsList.innerHTML = items.map(place => `
  <div class="trip-card" data-id="${place.id}">
    <div class="trip-thumb">
      <div class="mini-graphic"></div>
      <img
        src="${place.image}"
        alt=""
        class="trip-thumb-img"
        onerror="this.style.display='none'; this.previousElementSibling.style.display='block';"
      >
    </div>
    <div class="trip-info">
      <p class="trip-name">${place.name}</p>
      <p class="trip-meta">${place.category} · ${place.walkTime}</p>
    </div>
    <div class="trip-actions">
      <button class="trip-btn trip-btn--walk"   data-action="walk"   data-id="${place.id}" type="button">Walk there</button>
      <button class="trip-btn trip-btn--details" data-action="details" data-id="${place.id}" type="button">Details</button>
      <button class="trip-btn trip-btn--remove"  data-action="remove"  data-id="${place.id}" type="button">Remove</button>
    </div>
  </div>
`).join('');


        tripsList.querySelectorAll('.trip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const action = btn.dataset.action;
        const placeId = btn.dataset.id;

        if (action === 'walk') {
          window.location.href = `walkmapPage.html?id=${encodeURIComponent(placeId)}&from=trips`;
        }
        else if (action === 'details') {
          window.location.href = `placesPage.html?id=${encodeURIComponent(placeId)}&from=trips`;
        }
        else if (action === 'remove') {
          if (confirm('Remove this place from your trips?')) {
            
            btn.closest('.trip-card').style.display = 'none';
          }
        }
      });
    });
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === currentView) return;
      currentView = view;
      toggleBtns.forEach(b => b.classList.toggle('active', b.dataset.view === view));
      renderList();
    });
  });

  renderList();

});