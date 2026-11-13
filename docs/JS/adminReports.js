//   HERITAGEGO — Admin Reports Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Handle Filter Pill Toggles 
  const filterPills = document.querySelectorAll('.filter-pill');
  
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remove active state from all
      filterPills.forEach(p => p.classList.remove('active'));
      // Add active state to clicked
      pill.classList.add('active');
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

});