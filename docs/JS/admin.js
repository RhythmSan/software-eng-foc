//   HERITAGEGO — Admin Login Logic

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('adminLoginForm');
  const errorEl   = document.getElementById('adminError');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('adminEmail').value.trim();
      const pass  = document.getElementById('adminPassword').value;

      if (!email || !pass) {
        errorEl.textContent = 'Please fill in all fields.';
        return;
      }

      // Dummy authentication
      if (email === 'admin@heritagego.ph' && pass === 'admin123') {
        // 1. Save the login session
        localStorage.setItem('heritageAdmin', 'true');
        
        // =Redirect to the dashboard
 
        window.location.href = 'adminDashboard.html'; 
        
      } else {
        errorEl.textContent = 'Invalid credentials. (admin@heritagego.ph / admin123)';
      }
    });
  }
});