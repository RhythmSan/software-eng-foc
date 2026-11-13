//   HERITAGEGO — Admin Add Event Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Handle Filter Pill Toggles
  const pillGroups = document.querySelectorAll('.pill-group');
  
  pillGroups.forEach(group => {
    const pills = group.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });

  // 2. Handle Form Submission
  const form = document.getElementById('addEventForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Saving...';
      btn.disabled = true;

      setTimeout(() => {
        alert('Event saved successfully! (Prototype)');
        window.location.href = 'adminEvents.html';
      }, 800);
    });
  }
  // Sign Out Logic
  document.getElementById('adminSignOutBtn')?.addEventListener('click', () => {
    if (confirm('Sign out of the Admin Portal?')) {

      localStorage.removeItem('heritageAdmin');
      
      window.location.href = 'admin.html';
    }
  });
});