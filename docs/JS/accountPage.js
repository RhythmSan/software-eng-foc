//   HERITAGEGO — Account Page

document.addEventListener('DOMContentLoaded', () => {
  console.log('accountPage.js loaded');

  /* ========================================================
     1. LOAD USER DATA
     ======================================================== */
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

  /* ========================================================
     2. POPULATE PROFILE CARD
     ======================================================== */
  const avatarEl = document.getElementById('profileAvatar');
  const nameEl   = document.getElementById('profileName');
  const emailEl  = document.getElementById('profileEmail');

  if (nameEl)   nameEl.textContent   = user.name  || DEFAULT_USER.name;
  if (emailEl)  emailEl.textContent  = user.email || DEFAULT_USER.email;

  /* ========================================================
     3. POPULATE STATS
     ======================================================== */
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

  /* ========================================================
     4. SAMPLE REVIEWS 
     ======================================================== */
  const DEFAULT_REVIEWS = [
    {
      id: 'rev-1',
      place: 'Barasoain Church',
      date: 'Oct 4, 2026',
      rating: 5,
      text: 'Beautiful church with so much history. Go in the morning for the best light.'
    },
    {
      id: 'rev-2',
      place: 'Paseo del Congreso',
      date: 'Sep 27, 2026',
      rating: 4,
      text: 'Nice, shaded walk with monuments along the way.'
    }
  ];

  let reviews = DEFAULT_REVIEWS;

  try {
    const savedReviews = localStorage.getItem('heritageReviews');
    if (savedReviews) reviews = JSON.parse(savedReviews);
  } catch (err) {
    console.warn('Could not read saved reviews:', err);
  }

  const reviewsCount = reviews.length;

  const statVisited = document.getElementById('statVisited');
  const statBucket  = document.getElementById('statBucket');
  const statReviews = document.getElementById('statReviews');

  if (statVisited) statVisited.textContent = visitedCount;
  if (statBucket)  statBucket.textContent  = bucketCount;
  if (statReviews) statReviews.textContent = reviewsCount;

  /* ========================================================
     5. MENU — SWITCH PANELS
     ======================================================== */
  const menuItems = document.querySelectorAll('.menu-item');
  const panels    = document.querySelectorAll('.panel');

  function showPanel(name) {
    menuItems.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.action === name);
    });
    panels.forEach(panel => {
      panel.classList.toggle('is-open', panel.dataset.panel === name);
    });

    // Scroll panel into view on mobile
    if (window.innerWidth < 900) {
      const active = document.querySelector('.panel.is-open');
      active?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  menuItems.forEach(btn => {
    btn.addEventListener('click', () => showPanel(btn.dataset.action));
  });

  // Stat card "Reviews" opens the reviews panel
  document.querySelectorAll('.stat-card[data-action="my-reviews"]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      showPanel('my-reviews');
    });
  });

  /* Back buttons inside panels return to Edit profile
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showPanel('edit-profile'));
  });*/

  /* ========================================================
     6. EDIT PROFILE FORM
     ======================================================== */
  const editForm    = document.getElementById('editForm');
  const editName    = document.getElementById('editName');
  const editEmail   = document.getElementById('editEmail');
  const editMessage = document.getElementById('editMessage');

  if (editName)  editName.value  = user.name  || '';
  if (editEmail) editEmail.value = user.email || '';

  function showMessage(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'form-message ' + type;
  }

  editForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const newName  = (editName?.value  || '').trim();
    const newEmail = (editEmail?.value || '').trim();

    if (!newName) {
      return showMessage(editMessage, 'Please enter your name.', 'error');
    }
    if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return showMessage(editMessage, 'Please enter a valid email address.', 'error');
    }

    const initials = newName
      .split(/\s+/).map(w => w[0] || '').join('').slice(0, 2).toUpperCase();

    user = { name: newName, email: newEmail, initials: initials || DEFAULT_USER.initials };

    // TODO: replace this with a real API call to your backend
    // await fetch('/api/user', { method: 'PUT', body: JSON.stringify(user) });

    try {
      localStorage.setItem('heritageUser', JSON.stringify(user));
    } catch (err) {
      console.warn('Could not save user:', err);
    }

    if (nameEl)  nameEl.textContent  = user.name;
    if (emailEl) emailEl.textContent = user.email;

    showMessage(editMessage, 'Profile updated ✓', 'success');
    console.log('Profile updated:', user);
  });

  /* ========================================================
     7. CHANGE PASSWORD FORM
     ======================================================== */
  const passwordForm     = document.getElementById('passwordForm');
  const currentPassword  = document.getElementById('currentPassword');
  const newPassword      = document.getElementById('newPassword');
  const confirmPassword  = document.getElementById('confirmPassword');
  const passwordMessage  = document.getElementById('passwordMessage');

  passwordForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const current = currentPassword?.value || '';
    const next    = newPassword?.value     || '';
    const confirm = confirmPassword?.value || '';

    if (!current) {
      return showMessage(passwordMessage, 'Enter your current password.', 'error');
    }
    if (next.length < 8) {
      return showMessage(passwordMessage, 'New password must be at least 8 characters.', 'error');
    }
    if (!/[A-Za-z]/.test(next) || !/[0-9]/.test(next)) {
      return showMessage(passwordMessage, 'Use a mix of letters and numbers.', 'error');
    }
    if (next !== confirm) {
      return showMessage(passwordMessage, 'Passwords do not match.', 'error');
    }


    // await fetch('/api/user/password', { method: 'POST', body: JSON.stringify({ current, next }) });

    console.log('Password change requested (not saved yet)');

    showMessage(passwordMessage, 'Password updated ✓', 'success');
    passwordForm.reset();
  });

  /* ========================================================
     8. MY REVIEWS — RENDER + EDIT + DELETE
     ======================================================== */
  const reviewsStack = document.getElementById('reviewsStack');

  function starString(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  function renderReviews() {
    if (!reviewsStack) return;

    if (!reviews.length) {
      reviewsStack.innerHTML = `<p class="reviews-empty">You haven't written any reviews yet.</p>`;
      return;
    }

    reviewsStack.innerHTML = reviews.map(r => `
      <article class="review-card" data-id="${r.id}">
        <div class="review-card-head">
          <h3 class="review-card-name">${r.place}</h3>
          <span class="review-card-date">${r.date}</span>
        </div>
        <div class="review-card-stars">${starString(r.rating)}</div>
        <p class="review-card-text">${r.text}</p>
        <div class="review-card-actions">
          <button class="review-action review-action--edit" data-edit="${r.id}" type="button">Edit</button>
          <button class="review-action review-action--delete" data-delete="${r.id}" type="button">Delete</button>
        </div>
      </article>
    `).join('');

    reviewsStack.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => editReview(btn.dataset.edit));
    });
    reviewsStack.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteReview(btn.dataset.delete));
    });
  }

  function editReview(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;

    const newText = prompt('Edit your review:', review.text);
    if (newText === null) return;
    if (!newText.trim()) return alert('Review cannot be empty.');

    review.text = newText.trim();

    // TODO: backend PUT
    try { localStorage.setItem('heritageReviews', JSON.stringify(reviews)); } catch (err) {}

    renderReviews();
  }

  function deleteReview(id) {
    if (!confirm('Delete this review?')) return;

    reviews = reviews.filter(r => r.id !== id);

    // TODO: backend DELETE
    try { localStorage.setItem('heritageReviews', JSON.stringify(reviews)); } catch (err) {}

    if (statReviews) statReviews.textContent = reviews.length;
    renderReviews();
  }

  renderReviews();

  /* ========================================================
     9. ABOUT — Terms + Privacy buttons
     ======================================================== */
  document.getElementById('termsBtn')?.addEventListener('click', () => {
    alert('Terms of use — coming soon.');
  });
  document.getElementById('privacyBtn')?.addEventListener('click', () => {
    alert('Privacy policy — coming soon.');
  });

  /* ========================================================
     10. SIGN OUT
     ======================================================== */
  const signOutBtn = document.getElementById('signOutBtn');

  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      const confirmed = confirm('Sign out of HeritageGo?');
      if (!confirmed) return;

      try {
        localStorage.removeItem('heritageUser');
      } catch (err) {
        console.warn('Could not clear session:', err);
      }

      window.location.href = 'login&signupPage.html';
    });
  }

});