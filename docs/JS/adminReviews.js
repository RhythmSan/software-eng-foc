//   HERITAGEGO — Admin Review Moderation Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // Mock Data for all 3 tabs
  const reviewsData = {
    pending: [
      {
        initial: 'L',
        name: 'Luis Ito.',
        landmark: 'Barasoain Church',
        date: 'Today',
        stars: 5,
        text: 'Where Is Saycuh city',
        reports: 0
      },
      {
        initial: 'J',
        name: 'Jy Marrie',
        landmark: 'Casa Real Shrine',
        date: 'Today',
        stars: 2,
        text: 'WKWKKWKWKWKWKKW ang cute nya anteh Pa Headlock nga :3',
        reports: 1
      },
      {
        initial: 'K',
        name: 'Kathleen David.',
        landmark: 'Malolos Cathedral',
        date: 'Yesterday',
        stars:5,
        text: 'Kasal namin ng mahal ko -cwi',
        reports: 3
      }
    ],
    approved: [
      {
        initial: 'Y',
        name: 'Yuuto O four',
        landmark: 'Barasoain Church',
        date: '2 days ago',
        stars: 5,
        text: 'I have Drivers License and a valid ID. I can drive you to the church for a small fee. Contact me for more details.',
        reports: 0
      },
      {
        initial: 'A',
        name: 'Aika Palomo',
        landmark: 'Casa Real Shrine',
        date: '3 days ago',
        stars: 5,
        text: 'A must-visit for anyone who loves Philippine history I brought my vape puffs',
        reports: 0
      },
      {
        initial: 'A',
        name: 'Jeffrey Stein',
        landmark: 'Casa Real Shrine',
        date: '3 days ago',
        stars: 5,
        text: 'A must-visit for anyone who loves Philippine history im with my friends benjamin yahu, osama lade, and brylle robles',
        reports: 0
      }
    ],
    removed: [
      {
        initial: 'S',
        name: 'Rob Bin',
        landmark: 'Paseo del Congreso',
        date: 'Last week',
        stars: 1,
        text: 'Mag kano yan tol bilhin ko send ko sa gcash',
        reports: 100
      }
    ]
  };

  const container = document.getElementById('reviewsContainer');
  const tabs = document.querySelectorAll('.review-tab');

  // Function to render stars (gold for filled, gray for empty)
  function renderStars(count) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= count ? 'filled' : 'empty'}">★</span>`;
    }
    return html;
  }

  // Function to render the cards
  function renderReviews(tabName) {
    if (!container) return;
    
    const data = reviewsData[tabName];
    
    if (data.length === 0) {
      container.innerHTML = `<p style="color: var(--text-muted); font-style: italic; padding: 20px 0;">No reviews in this category.</p>`;
      return;
    }

    container.innerHTML = data.map(review => {
      // Determine action buttons based on tab
      let buttons = '';
      if (tabName === 'pending') {
        buttons = `
          <button class="btn-action btn-approve">Approve</button>
          <button class="btn-action btn-remove">Remove</button>
        `;
      } else if (tabName === 'approved') {
        buttons = `
          <button class="btn-action btn-remove">Remove</button>
        `;
      } else if (tabName === 'removed') {
        buttons = `
          <button class="btn-action btn-approve">Restore</button>
        `;
      }

      // Render report warning if any
      const reportWarning = review.reports > 0 
        ? `<span class="report-warning">Reported by ${review.reports} visitor${review.reports > 1 ? 's' : ''}</span>` 
        : '';

      // Status badge 
      const badgeClass = tabName === 'pending' ? 'badge-pending' : (tabName === 'approved' ? 'badge-approved' : 'badge-removed');

      return `
        <div class="review-card">
          
          <!-- Left: Avatar -->
          <div class="review-avatar">${review.initial}</div>
          
          <!-- Middle: Content -->
          <div class="review-content">
            <div class="review-header">
              <div class="review-meta">
                <span class="review-author">${review.name}</span>
                <span class="review-separator">,</span>
                <span class="review-landmark">on ${review.landmark}</span>
                <span class="review-separator">•</span>
                <span class="review-date">${review.date}</span>
                ${reportWarning}
                <span class="status-badge ${badgeClass}">${tabName.charAt(0).toUpperCase() + tabName.slice(1)}</span>
              </div>
            </div>
            
            <div class="review-stars">
              ${renderStars(review.stars)}
            </div>
            
            <p class="review-text">${review.text}</p>
          </div>

          <!-- Right: Actions -->
          <div class="review-actions">
            ${buttons}
          </div>

        </div>
      `;
    }).join('');
  }

  // Handle Tab Clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active class
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Render new data
      renderReviews(tab.dataset.tab);
    });
  });

  // Sign Out Logic
  document.getElementById('adminSignOutBtn')?.addEventListener('click', () => {
    if (confirm('Sign out of the Admin Portal?')) {
      // Clear the session
      localStorage.removeItem('heritageAdmin');
      
      // Redirect back to the login page
      window.location.href = 'admin.html';
    }
  });

  // Initial Render
  renderReviews('pending');
});