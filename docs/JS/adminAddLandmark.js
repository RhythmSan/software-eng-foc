//   HERITAGEGO — Admin Add Landmark Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Handle Filter Pill Toggles (Category & Status)
  const pillGroups = document.querySelectorAll('.pill-group');
  
  pillGroups.forEach(group => {
    const pills = group.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Remove active from all in this group
        pills.forEach(p => p.classList.remove('active'));
        // Add active to clicked
        pill.classList.add('active');
      });
    });
  });

  // 2. Handle Form Submission
  const form = document.getElementById('addLandmarkForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Since this is a prototype, we'll just simulate saving and redirect
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Saving...';
      btn.disabled = true;

      setTimeout(() => {
        alert('Landmark saved successfully! (Prototype)');
        window.location.href = 'adminLandmarks.html';
      }, 800);
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

});