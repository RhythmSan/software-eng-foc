
//   HERITAGEGO — Places Page

document.addEventListener('DOMContentLoaded', () => {


  //   THE DATA — one entry per place

  const PLACES = {
    'barasoain': {
      name: 'Barasoain Church',
      category: 'Historical',
      location: 'Malolos City, Bulacan',
      rating: '4.8',
      reviews: '126 reviews',
      distance: '1lkm away',
      image: '../Images/velvetroom.jpg',
      description: 'Site of the 1898 Malolos Congress, which drafted the Malolos Constitution. A landmark of the First Philippine Republic, and a cornerstone of Malolos heritage tourism.'
    },

    'casa-real': {
      name: 'Casa Real Shrine',
      category: 'Historical',
      location: 'Malolos City, Bulacan',
      rating: '4.6',
      reviews: '84 reviews',
      distance: '1.2km away',
      image: '../Images/placeholders/casa-real.jpg',
      description: 'Former seat of government of the First Philippine Republic. Now a museum housing artifacts from the revolutionary era.'
    },

    'malolos-cathedral': {
      name: 'Malolos Cathedral',
      category: 'Cultural',
      location: 'Malolos City, Bulacan',
      rating: '4.7',
      reviews: '203 reviews',
      distance: '0.8km away',
      image: '../Images/placeholders/malolos-cathedral.jpg',
      description: 'The Immaculate Conception parish church at the heart of the town center. A major cultural and religious landmark in Bulacan.'
    },

    'paseo': {
      name: 'Paseo del Congreso',
      category: 'Parks',
      location: 'Malolos City, Bulacan',
      rating: '4.5',
      reviews: '57 reviews',
      distance: '1.5km away',
      image: '../Images/placeholders/paseo.jpg',
      description: 'A walkable promenade connecting the heritage sites. Popular for evening strolls and community gatherings.'
    },

    'republic-shrine': {
      name: 'Malolos Republic Shrine',
      category: 'Historical',
      location: 'Malolos City, Bulacan',
      rating: '4.4',
      reviews: '42 reviews',
      distance: '1.3km away',
      image: '../Images/placeholders/republic-shrine.jpg',
      description: "Marker honoring the birthplace of Asia's first republic."
    },

    'barasoain-museum': {
      name: 'Barasoain Museum',
      category: 'Historical',
      location: 'Malolos City, Bulacan',
      rating: '4.6',
      reviews: '66 reviews',
      distance: '1.1km away',
      image: '../Images/placeholders/barasoain-museum.jpg',
      description: 'Artifacts from the revolutionary period and the Malolos Congress.'
    },

    'heritage-house': {
      name: 'Malolos Heritage House',
      category: 'Cultural',
      location: 'Malolos City, Bulacan',
      rating: '4.5',
      reviews: '38 reviews',
      distance: '0.9km away',
      image: '../Images/placeholders/heritage-house.jpg',
      description: "Preserved ancestral home showcasing Bulacan's artistry."
    },

    'arts-center': {
      name: 'Bulacan Arts Center',
      category: 'Cultural',
      location: 'Malolos City, Bulacan',
      rating: '4.3',
      reviews: '24 reviews',
      distance: '1.7km away',
      image: '../Images/placeholders/arts-center.jpg',
      description: 'Local crafts, weaving, and contemporary Bulakeño art.'
    },

    'sports-complex': {
      name: 'Malolos Sports Complex',
      category: 'Parks',
      location: 'Malolos City, Bulacan',
      rating: '4.2',
      reviews: '31 reviews',
      distance: '2.0km away',
      image: '../Images/placeholders/sports-complex.jpg',
      description: 'Green open space for jogging, picnics, and community events.'
    },

    'capitol-grounds': {
      name: 'Bulacan Provincial Capitol Grounds',
      category: 'Parks',
      location: 'Malolos City, Bulacan',
      rating: '4.4',
      reviews: '48 reviews',
      distance: '1.6km away',
      image: '../Images/placeholders/capitol-grounds.jpg',
      description: 'Landscaped grounds and open plazas in the city center.'
    }
  };


  //   URL PARAM  PLACE

const params = new URLSearchParams(window.location.search);
const id     = params.get('id');
const from   = params.get('from') || 'landing';   
const data   = PLACES[id];

  //   Go back to where the user came from

  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    if (from === 'trips') {
      backBtn.href = 'mytripsPage.html';
    } else {
      backBtn.href = 'landingPage.html';
    }
    console.log(' Back button →', backBtn.href);
  }
  
  if (!data) {
    console.warn('Unknown place id:', id);
    const title = document.getElementById('detailName');
    if (title) title.textContent = 'Place not found';
    return;
  }

 //   POPULATE THE PAGE

  document.title = data.name + ' — HeritageGo';

  const $ = (id) => document.getElementById(id);

  $('detailImage').src               = data.image;
  $('detailImage').alt               = data.name;
  $('detailCategory').textContent    = data.category;
  $('detailLocation').textContent    = data.location;
  $('detailName').textContent        = data.name;
  $('detailRating').textContent      = data.rating;
  $('detailReviews').textContent     = data.reviews;
  $('detailDistance').textContent    = data.distance;
  $('detailDescription').textContent = data.description;


  //   BUTTON INTERACTIONS

  const saveBtn    = $('saveBtn');
  const bucketBtn  = $('bucketBtn');
  const visitedBtn = $('visitedBtn');
  const walkBtn    = $('walkBtn');

  saveBtn.addEventListener('click', () => {
    saveBtn.classList.toggle('is-saved');
    const saved = saveBtn.classList.contains('is-saved');
    console.log(`Place "${data.name}" ${saved ? 'saved' : 'unsaved'}`);
  });

  bucketBtn.addEventListener('click', () => {
    bucketBtn.classList.toggle('is-active');
    const active = bucketBtn.classList.contains('is-active');
    bucketBtn.querySelector('span').textContent = active
      ? 'In bucket list'
      : 'Add to bucket list';
    console.log(`Bucket list: ${data.name} → ${active}`);
  });

  visitedBtn.addEventListener('click', () => {
    visitedBtn.classList.toggle('is-active');
    const active = visitedBtn.classList.contains('is-active');
    visitedBtn.querySelector('span').textContent = active
      ? 'Visited'
      : 'Mark as visited';
    console.log(`Visited: ${data.name} → ${active}`);
  });

walkBtn.addEventListener('click', () => {
  if (!id) {
    console.warn('No id — cannot build walk URL');
    return;
  }
  window.location.href = `walkmapPage.html?id=${encodeURIComponent(id)}&from=places`;
});


  //   REVIEW FORM 
  //   TODO: connect to backend later

  const starPicker   = document.getElementById('starPicker');
  const starBtns     = starPicker ? starPicker.querySelectorAll('.star-btn') : [];
  const reviewText   = document.getElementById('reviewText');
  const reviewSubmit = document.getElementById('reviewSubmit');

  let currentRating = 0;

  // Star click 
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentRating = parseInt(btn.dataset.value, 10);
      starBtns.forEach(b => {
        const val = parseInt(b.dataset.value, 10);
        b.classList.toggle('is-filled', val <= currentRating);
      });
    });

    // Hover preview
    btn.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(btn.dataset.value, 10);
      starBtns.forEach(b => {
        const val = parseInt(b.dataset.value, 10);
        b.classList.toggle('is-filled', val <= hoverVal);
      });
    });
  });

  // Reset preview when leaving the picker
  starPicker?.addEventListener('mouseleave', () => {
    starBtns.forEach(b => {
      const val = parseInt(b.dataset.value, 10);
      b.classList.toggle('is-filled', val <= currentRating);
    });
  });

  // Submit review
  reviewSubmit?.addEventListener('click', () => {
    const text = reviewText.value.trim();

    if (currentRating === 0) {
      alert('Please pick a star rating first.');
      return;
    }
    if (!text) {
      alert('Please write a short review.');
      reviewText.focus();
      return;
    }

    //log dont mind me darling
    console.log('Review submitted (not saved yet):', {
      place: data.name,
      placeId: id,
      rating: currentRating,
      text: text
    });

    alert('Thanks! Reviews will be saved in a future update.');

    // Reset the form
    currentRating = 0;
    starBtns.forEach(b => b.classList.remove('is-filled'));
    reviewText.value = '';
  });

});   