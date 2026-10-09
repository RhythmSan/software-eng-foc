
//   HERITAGEGO — Walk Map Page

document.addEventListener('DOMContentLoaded', () => {

  const PLACES = {
    'barasoain':         { name: 'Barasoain Church',                   time: '11 min', distance: '850 m · pedestrian path' },
    'casa-real':         { name: 'Casa Real Shrine',                   time: '9 min',  distance: '700 m · pedestrian path' },
    'malolos-cathedral': { name: 'Malolos Cathedral',                  time: '7 min',  distance: '550 m · pedestrian path' },
    'paseo':             { name: 'Paseo del Congreso',                 time: '14 min', distance: '1.1 km · pedestrian path' },
    'republic-shrine':   { name: 'Malolos Republic Shrine',            time: '12 min', distance: '950 m · pedestrian path' },
    'barasoain-museum':  { name: 'Barasoain Museum',                   time: '10 min', distance: '800 m · pedestrian path' },
    'heritage-house':    { name: 'Malolos Heritage House',             time: '8 min',  distance: '620 m · pedestrian path' },
    'arts-center':       { name: 'Bulacan Arts Center',                time: '15 min', distance: '1.2 km · pedestrian path' },
    'sports-complex':    { name: 'Malolos Sports Complex',             time: '18 min', distance: '1.4 km · pedestrian path' },
    'capitol-grounds':   { name: 'Bulacan Provincial Capitol Grounds', time: '13 min', distance: '1.0 km · pedestrian path' }
  };

  // --- Read URL params ---
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id')   || 'barasoain';
  const from   = params.get('from') || 'places';

  const data = PLACES[id] || PLACES['barasoain'];

  console.log(' Walk page loaded:', { id, from, data });

  // --- Populate the page ---
  const setText = (elId, text) => {
    const el = document.getElementById(elId);
    if (el) el.textContent = text;
  };

  setText('placeName',   data.name);
  setText('destName',    data.name);
  setText('stepDest',    data.name);
  setText('walkTime',    data.time);
  setText('walkDetails', data.distance);

  document.title = `Walking to ${data.name} — HeritageGo`;

  // --- BACK BUTTON ---
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    if (from === 'trips') {
      backBtn.href = 'mytripsPage.html';
    } else {
      backBtn.href = `placesPage.html?id=${encodeURIComponent(id)}`;
    }
    console.log(' Back button →', backBtn.href);
  }

  // --- Zoom controls ---
  const map = document.querySelector('.walk-map');
  if (map) {
    let zoom = 1;
    const ZOOM_STEP = 0.1;
    const ZOOM_MIN  = 0.8;
    const ZOOM_MAX  = 1.4;

    const zoomIn  = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');

    if (zoomIn) {
      zoomIn.addEventListener('click', () => {
        zoom = Math.min(ZOOM_MAX, zoom + ZOOM_STEP);
        map.style.transform = `scale(${zoom})`;
        map.style.transition = 'transform 0.25s ease';
        map.style.transformOrigin = 'center center';
      });
    }

    if (zoomOut) {
      zoomOut.addEventListener('click', () => {
        zoom = Math.max(ZOOM_MIN, zoom - ZOOM_STEP);
        map.style.transform = `scale(${zoom})`;
        map.style.transition = 'transform 0.25s ease';
        map.style.transformOrigin = 'center center';
      });
    }
  }

  // --- Check-in button ---
  const checkinBtn = document.getElementById('checkinBtn');
  if (checkinBtn) {
    checkinBtn.addEventListener('click', () => {
      const checked = checkinBtn.classList.toggle('is-checked');
      checkinBtn.textContent = checked
        ? '✓ Checked in'
        : "I've arrived · Check in";
      if (checked) console.log(` Checked in at: ${data.name}`);
    });
  }

});