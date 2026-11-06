//   HERITAGEGO — Admin Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Session Check (Protects the page) ---
  // Uncomment the block below if you want to force admins to log in first.
  /*
  if (!localStorage.getItem('heritageAdmin')) {
    window.location.href = 'adminLogin.html';
    return;
  }
  */

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