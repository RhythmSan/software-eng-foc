
//   HERITAGEGO — Landing Page

document.addEventListener('DOMContentLoaded', () => {

  
   //  1. FEATURED LANDMARKS — Filtering
 
  const tabs  = document.querySelectorAll('.filter-tabs .tab');
  const cards = document.querySelectorAll('#cardGrid .card');
  const grid  = document.getElementById('cardGrid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        if (matches) {
          card.classList.remove('is-hidden');
          card.classList.remove('fade-in');
          void card.offsetWidth;      
          card.classList.add('fade-in');
        } else {
          card.classList.add('is-hidden');
          card.classList.remove('fade-in');
        }
      });

      grid.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });


    // 2. HORIZONTAL SCROLL ON WHEEL

    if (grid) {
    grid.addEventListener('wheel', (e) => {
      // If the grid can't scroll horizontally
      if (grid.scrollWidth <= grid.clientWidth) return;

      // If user is holding shift, let the browser handle it
      if (e.shiftKey) return;

      // Only intercept vertical wheel
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        // Multiply delta 

        grid.scrollLeft += e.deltaY * 1.2;
      }
    }, { passive: false });
  }


   //  3. DRAG-TO-SCROLL WITH MOUSE

  if (grid) {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    grid.addEventListener('mousedown', (e) => {
      isDown = true;
      grid.classList.add('dragging');
      startX = e.pageX - grid.offsetLeft;
      startScroll = grid.scrollLeft;
    });

    grid.addEventListener('mouseleave', () => { isDown = false; });
    grid.addEventListener('mouseup',    () => { isDown = false; });

    grid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      grid.scrollLeft = startScroll - (x - startX) * 1.5;
    });

    // Prevent text/image selection while dragging
    grid.addEventListener('dragstart', (e) => e.preventDefault());
  }


    // 4. INITIAL FADE-IN

  cards.forEach(card => card.classList.add('fade-in'));

});


//   START EXPLORING — Normal button behavior

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.search-input');
  const btn   = document.getElementById('startBtn');
  if (!input || !btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {

      input.focus();
      input.style.transition = 'transform 0.15s';
      input.style.transform = 'translateX(-4px)';
      setTimeout(() => input.style.transform = 'translateX(4px)', 80);
      setTimeout(() => input.style.transform = 'translateX(0)', 160);
      return;
    }


    const target = document.querySelector('.featured');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });


  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });
});