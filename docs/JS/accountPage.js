
//   HERITAGEGO — Account Page

document.addEventListener('DOMContentLoaded', () => {
  console.log(' accountPage.js loaded');


  //   1. LOAD USER DATA (from localStorage)


  const DEFAULT_USER = {
    name:     'MitoDoesCode',
    email:    'CheckMyGithubHeHe@example.com',
    initials: 'MD'
  };

  let user = { ...DEFAULT_USER };

  try {
    const saved = localStorage.getItem('heritageUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      user = { ...DEFAULT_USER, ...parsed };
    }
  } catch (err) {
    console.warn('Could not read saved user:', err);
  }


  //   2. POPULATE PROFILE CARD

  const avatarEl = document.getElementById('profileAvatar');
  const nameEl   = document.getElementById('profileName');
  const emailEl  = document.getElementById('profileEmail');

  if (avatarEl) avatarEl.textContent = user.initials || '??';
  if (nameEl)   nameEl.textContent   = user.name    || DEFAULT_USER.name;
  if (emailEl)  emailEl.textContent  = user.email   || DEFAULT_USER.email;


  //   3. POPULATE STATS

  const DEFAULT_TRIPS = [
    { id: 'casa-real',         status: 'bucket'  },
    { id: 'malolos-cathedral', status: 'bucket'  },
    { id: 'kamestisuhan',      status: 'bucket'  },
    { id: 'barasoain',         status: 'visited' },
    { id: 'paseo',             status: 'visited' }
  ];

  let trips = DEFAULT_TRIPS;

  try {
    const savedTrips = localStorage.getItem('heritageTrips');
    if (savedTrips) trips = JSON.parse(savedTrips);
  } catch (err) {
    console.warn('Could not read saved trips:', err);
  }

  const visitedCount = trips.filter(t => t.status === 'visited').length;
  const bucketCount  = trips.filter(t => t.status === 'bucket').length;
  const reviewsCount = 0;   

  const statVisited = document.getElementById('statVisited');
  const statBucket  = document.getElementById('statBucket');
  const statReviews = document.getElementById('statReviews');

  if (statVisited) statVisited.textContent = visitedCount;
  if (statBucket)  statBucket.textContent  = bucketCount;
  if (statReviews) statReviews.textContent = reviewsCount;


  //   4. MENU ITEMS

  const menuActions = {
    'edit-profile':    () => promptEditProfile(),
    'my-reviews':      () => alert('Reviews page coming soon.'),
    'change-password': () => alert('Password change coming soon.'),
    'about':           () => alert('HeritageGo front end by mitodoescode'),
  };

  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (menuActions[action]) menuActions[action]();
      else console.warn('No handler for action:', action);
    });
  });


  //   5. EDIT PROFILE

  function promptEditProfile() {
    const newName  = prompt('Enter your name:', user.name);
    if (newName === null) return;   

    const newEmail = prompt('Enter your email:', user.email);
    if (newEmail === null) return;

    // Compute new initials from the name
    const initials = (newName.trim() || '??')
      .split(/\s+/)
      .map(w => w[0] || '')
      .join('')
      .slice(0, 2)
      .toUpperCase();

    user = {
      name:     newName.trim()  || DEFAULT_USER.name,
      email:    newEmail.trim() || DEFAULT_USER.email,
      initials: initials        || DEFAULT_USER.initials
    };

    // Save to localStorage
    try {
      localStorage.setItem('heritageUser', JSON.stringify(user));
    } catch (err) {
      console.warn('Could not save user:', err);
    }

    // Update the DOM
    if (avatarEl) avatarEl.textContent = user.initials;
    if (nameEl)   nameEl.textContent   = user.name;
    if (emailEl)  emailEl.textContent  = user.email;

    console.log(' Profile updated:', user);
  }


  //   6. SIGN OUT

  const signOutBtn = document.getElementById('signOutBtn');

  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      const confirmed = confirm('Sign out of HeritageGo?');
      if (!confirmed) return;

      try {
        // Clear saved session data 
        localStorage.removeItem('heritageUser');
      } catch (err) {
        console.warn('Could not clear session:', err);
      }

      // Go back to the login page
      window.location.href = 'login&signupPage.html';
    });
  }


  //   7. STAT CARD LINKS 

  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If it's a link, let the browser handle it
      if (card.tagName === 'A') return;

      e.preventDefault();
      window.location.href = 'mytripsPage.html';
    });
  });

});