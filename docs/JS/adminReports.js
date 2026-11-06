//   HERITAGEGO — Admin Reports Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Handle Filter Pill Toggles (7 days, 30 days, All time)
  const filterPills = document.querySelectorAll('.filter-pill');
  
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remove active state from all
      filterPills.forEach(p => p.classList.remove('active'));
      // Add active state to clicked
      pill.classList.add('active');
      
      // In a real app, you would fetch new data here based on the filter.
      // For now, it's a visual toggle.
    });
  });

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