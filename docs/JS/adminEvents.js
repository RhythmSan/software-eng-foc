//   HERITAGEGO — Admin Events List Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // Sample Data
  const events = [
    { title: 'Independence Day Heritage Walk', type: 'Heritage tour', landmark: 'Barasoain Church', schedule: 'Jun 12, 8:00 AM to 11:00 AM', status: 'Published' },
    { title: 'Opening hours', type: 'Opening hours', landmark: 'Casa Real Shrine', schedule: 'Tue to Sun, 8:00 AM to 5:00 PM', status: 'Published' },
    { title: 'Malolos Heritage Week', type: 'Festival', landmark: 'Paseo del Congreso', schedule: 'Sep 15 to Sep 21', status: 'Published' },
    { title: 'Feast of the Immaculate Conception', type: 'Festival', landmark: 'Malolos Cathedral', schedule: 'Dec 8', status: 'Published' }
  ];

  const tableBody = document.getElementById('eventsTableBody');

  if (tableBody) {
    tableBody.innerHTML = events.map(event => `
      <tr>
        <td class="event-title">${event.title}</td>
        <td><span class="type-badge type-${event.type.replace(/\s+/g, '-').toLowerCase()}">${event.type}</span></td>
        <td class="event-landmark">${event.landmark}</td>
        <td class="event-schedule">${event.schedule}</td>
        <td><span class="status-badge status-published">${event.status}</span></td>
        <td class="actions-cell">
          <button class="btn-action btn-edit">Edit</button>
          <button class="btn-action btn-delete">Delete</button>
        </td>
      </tr>
    `).join('');
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
});