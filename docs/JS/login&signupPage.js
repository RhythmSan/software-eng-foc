//   HeritageGO Login / Signup Logic

document.addEventListener('DOMContentLoaded', () => {

  // --- Grab elements ---
  const toggleBtns    = document.querySelectorAll('.toggle-btn');
  const form          = document.getElementById('authForm');
  const nameField     = document.getElementById('nameField');
  const emailField    = document.getElementById('emailField');
  const passwordField = document.getElementById('passwordField');
  const confirmField  = document.getElementById('confirmField');
  const submitBtn     = document.getElementById('submitBtn');
  const formMessage   = document.getElementById('formMessage');
  const forgotLink    = document.getElementById('forgotLink');
  const nameWrap      = document.getElementById('nameWrap');
  const confirmWrap   = document.getElementById('confirmWrap');

  // Track current mode: 'login' or 'signup'
  let mode = 'login';


  //   TOGGLE HANDLERS

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (target === mode) return;   
      mode = target;
      switchMode(mode);
    });
  });

  function switchMode(newMode) {
    // Update active button state
    toggleBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.tab === newMode);
    });

    clearMessage();
    clearErrors();

    if (newMode === 'signup') {

      if (nameWrap)    nameWrap.style.display    = 'flex';
      if (confirmWrap) confirmWrap.style.display = 'flex';
      submitBtn.textContent = 'Sign up';
      forgotLink.classList.add('hidden');

    } else {

      if (nameWrap)    nameWrap.style.display    = 'none';
      if (confirmWrap) confirmWrap.style.display = 'none';
      nameField.value = '';
      confirmField.value = '';
      submitBtn.textContent = 'Log in';
      forgotLink.classList.remove('hidden');
    }
  }


  //   FORM SUBMISSION

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessage();
    clearErrors();

    const email    = emailField.value.trim();
    const password = passwordField.value;

    // --- Basic validation ---
    if (!email) {
      return showError(emailField, 'Please enter your email.');
    }
    if (!isValidEmail(email)) {
      return showError(emailField, 'Please enter a valid email address.');
    }
    if (!password) {
      return showError(passwordField, 'Please enter your password.');
    }
    if (password.length < 6) {
      return showError(passwordField, 'Password must be at least 6 characters.');
    }

    // --- Signup-specific validation ---
    if (mode === 'signup') {
      const name    = nameField.value.trim();
      const confirm = confirmField.value;

      if (!name) {
        return showError(nameField, 'Please enter your full name.');
      }
      if (!confirm) {
        return showError(confirmField, 'Please confirm your password.');
      }
      if (password !== confirm) {
        return showError(confirmField, 'Passwords do not match.');
      }
    }

    // --- Simulate an API call ---
    fakeAuthCall(email, password);
  });


  //   FAKE AUTH 

  function fakeAuthCall(email, password) {
    submitBtn.disabled = true;
    submitBtn.textContent = mode === 'login' ? 'Logging in…' : 'Creating account…';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = mode === 'login' ? 'Log in' : 'Sign up';

      // TODO: replace with real authentication endpoint
      // fetch('/api/auth', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mode, email, password })
      // }).then(...)

      window.location.href = 'landingPage.html';
    }, 800);
  }


  //   HELPERS

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  function showError(inputEl, message) {
    const wrap = inputEl.closest('.input-wrap');
    if (wrap) {
      wrap.classList.add('error', 'shake');
      setTimeout(() => wrap.classList.remove('shake'), 350);
    }
    showMessage(message, 'error');
    inputEl.focus();
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
  }

  function clearMessage() {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }

  function clearErrors() {
    document.querySelectorAll('.input-wrap').forEach(w => {
      w.classList.remove('error', 'shake');
    });
  }


  //   FORGOT PASSWORD

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailField.value.trim();

    if (!email || !isValidEmail(email)) {
      showMessage('Enter your email above, then click "Forgot password?".', 'error');
      emailField.focus();
      return;
    }


    // fetch('/api/auth/forgot', { method: 'POST', body: JSON.stringify({ email }) });

    showMessage(`Reset link sent to ${email}`, 'success');
  });

});