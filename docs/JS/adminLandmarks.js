//   HERITAGEGO — Admin Landmarks Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // Data matching the screenshot
  const landmarks = [
    { name: 'Barasoain Church', category: 'Historical', coords: '14.8456, 120.8108', photos: '2 photo(s)', rating: 4.8, status: 'Published' },
    { name: 'Casa Real Shrine', category: 'Historical', coords: '14.8447, 120.8120', photos: '1 photo(s)', rating: 4.6, status: 'Published' },
    { name: 'Malolos Cathedral', category: 'Cultural', coords: '14.8430, 120.8120', photos: '1 photo(s)', rating: 4.7, status: 'Published' },
    { name: 'Kamestizuhan District', category: 'Cultural', coords: '14.8411, 120.8095', photos: '1 photo(s)', rating: 4.4, status: 'Published' },
    { name: 'Paseo del Congreso', category: 'Parks', coords: '14.8461, 120.8125', photos: '0 photo(s)', rating: 4.5, status: 'Published' }
  ];

  const tableBody = document.getElementById('landmarkTableBody');
  const filterBtns = document.querySelectorAll('.filter-pill');
  
  let currentFilter = 'all';

  // Render Table
  function renderTable() {
    if (!tableBody) return;

    const filtered = landmarks.filter(place => {
      return currentFilter === 'all' || place.category.toLowerCase() === currentFilter;
    });

    tableBody.innerHTML = filtered.map(place => `
      <tr>
        <td>
          <div class="landmark-name">${place.name}</div>
          <div class="landmark-details">${place.coords} • ${place.photos}</div>
        </td>
        <td>${place.category}</td>
        <td>
          <span class="star-icon">★</span> ${place.rating}
        </td>
        <td>
          <span class="status-badge status-published">${place.status}</span>
        </td>
        <td class="actions-cell">
          <button class="btn-action btn-edit">Edit</button>
          <button class="btn-action btn-delete">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // Filter Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTable();
    });
  });

  // ==========================================
  // LOGIC FOR "ADD LANDMARK" BUTTON
  // ==========================================
  const addLandmarkBtn = document.querySelector('.header-btn');
  
  if (addLandmarkBtn) {
    addLandmarkBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Stop any default button behavior
      window.location.href = 'adminAddLandmark.html'; // Redirect to the form
    });
  }

  // Sign Out Logic
  document.getElementById('adminSignOutBtn')?.addEventListener('click', () => {
    if (confirm('Sign out of the Admin Portal?')) {
      // Clear the session
      localStorage.removeItem('heritageAdmin');
      
      // Redirect back to the login page (admin.html)
      window.location.href = 'admin.html';
    }
  });

  // Initial Render
  renderTable();
});