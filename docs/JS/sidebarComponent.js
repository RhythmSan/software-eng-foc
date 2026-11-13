
//   HERITAGEGO — Sidebar Component


(function () {

  function injectSidebar() {

    if (document.getElementById('sidebar')) return;


    const path = window.location.pathname.split('/').pop() || 'landingPage.html';
    const isExplore = path === 'landingPage.html' || path === '' || path === 'index.html';
    const isTrips   = path === 'mytripsPage.html';
    const isAccount = path === 'accountPage.html';

    const html = `
      <div class="sidebar-overlay" id="sidebarOverlay"></div>

      <aside class="sidebar" id="sidebar" aria-hidden="true">
        <div class="sidebar-header">
          <div class="logo">
            <span class="logo-icon"></span>
            <span class="logo-text">HeritageGo</span>
          </div>
          <button class="sidebar-close" id="sidebarClose" aria-label="Close menu">✕</button>
        </div>

        <nav class="sidebar-nav">
          <a href="landingPage.html" class="sidebar-link${isExplore ? ' is-active' : ''}" data-page="explore">
            <img src="../Images/logos/compass.png" alt="" class="sidebar-icon-img">
            <span>Explore</span>
          </a>
          <a href="mytripsPage.html" class="sidebar-link${isTrips ? ' is-active' : ''}" data-page="trips">
            <img src="../Images/logos/wishlist.png" alt="" class="sidebar-icon-img">
            <span>My Trips</span>
          </a>
          <a href="accountPage.html" class="sidebar-link${isAccount ? ' is-active' : ''}" data-page="account">
            <img src="../Images/logos/user.png" alt="" class="sidebar-icon-img">
            <span>Account</span>
          </a>
        </nav>
      </aside>
    `;


    document.body.insertAdjacentHTML('afterbegin', html);
  }

 
  if (document.body) {
    injectSidebar();
  } else {

    document.addEventListener('DOMContentLoaded', injectSidebar);
  }
})();