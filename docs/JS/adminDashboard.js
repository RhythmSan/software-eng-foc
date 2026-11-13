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

      localStorage.removeItem('heritageAdmin');
      

      window.location.href = 'admin.html';
    }
  });

});