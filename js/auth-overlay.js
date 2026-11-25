(function () {
  if (window.__wartuneAuthInit) return;
  window.__wartuneAuthInit = true;

  var style = document.createElement('style');
  style.textContent = [
    '#wt-auth-backdrop{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(7,10,19,.68);backdrop-filter:blur(4px);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}',
    '#wt-auth-backdrop.open{display:flex}',
    '#wt-auth-card{width:100%;max-width:380px;border-radius:14px;border:1px solid rgba(212,175,55,.45);background:linear-gradient(180deg,rgba(24,28,42,.97),rgba(13,16,26,.98));box-shadow:0 24px 60px rgba(0,0,0,.75);color:#f8fafc;overflow:hidden}',
    '.wt-head{padding:16px 20px 12px;border-bottom:1px solid rgba(212,175,55,.2);text-align:center}',
    '.wt-title{margin:0;font-size:18px;font-weight:700;letter-spacing:.4px;color:#f3d078}',
    '.wt-sub{margin:4px 0 0;font-size:12px;color:#94a3b8}',
    '.wt-tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:12px 20px 0}',
    '.wt-tab{cursor:pointer;border:1px solid rgba(148,163,184,.22);border-radius:8px;padding:9px 10px;background:rgba(15,23,42,.6);color:#cbd5e1;font-size:13px;font-weight:600;transition:all .15s}',
    '.wt-tab.active{border-color:#d4af37;background:linear-gradient(180deg,rgba(212,175,55,.25),rgba(180,120,20,.18));color:#fde68a}',
    '.wt-form{padding:16px 20px 20px;display:flex;flex-direction:column;gap:12px}',
    '.wt-field label{display:block;margin-bottom:5px;font-size:12px;font-weight:500;color:#cbd5e1}',
    '.wt-field input{box-sizing:border-box;width:100%;height:40px;border-radius:8px;border:1px solid rgba(148,163,184,.3);background:#0b1120;padding:0 12px;color:#f8fafc;font-size:14px;outline:none}',
    '.wt-field input:focus{border-color:#eab308;box-shadow:0 0 0 2px rgba(234,179,8,.2)}',
    '.wt-row{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#cbd5e1}',
    '.wt-check{display:flex;align-items:center;gap:7px;cursor:pointer}',
    '.wt-err{display:none;border-radius:8px;border:1px solid rgba(244,63,94,.45);background:rgba(127,29,29,.45);padding:9px 11px;font-size:12px;color:#fecdd3;line-height:1.4}',
    '.wt-err.show{display:block}',
    '.wt-btn{cursor:pointer;height:42px;border:none;border-radius:9px;background:linear-gradient(180deg,#dc2626,#991b1b);border:1px solid rgba(248,113,113,.45);color:#fff7ed;font-size:14px;font-weight:700;letter-spacing:.3px;box-shadow:0 6px 18px rgba(185,28,28,.4)}',
    '.wt-btn:hover{filter:brightness(1.08)}',
    '.wt-btn:disabled{opacity:.6;cursor:not-allowed}',
    '.wt-hint{text-align:center;font-size:11px;color:#94a3b8}'
  ].join('');
  document.head.appendChild(style);

  var wrap = document.createElement('div');
  wrap.id = 'wt-auth-backdrop';
  wrap.innerHTML = [
    '<div id="wt-auth-card" role="dialog" aria-modal="true" aria-labelledby="wt-auth-heading">',
    '  <div class="wt-head">',
    '    <h2 id="wt-auth-heading" class="wt-title">Wartune Ultra</h2>',
    '    <p class="wt-sub">Entre com sua conta ou crie um novo usuário para jogar</p>',
    '  </div>',
    '  <div class="wt-tabs">',
    '    <button type="button" class="wt-tab active" data-mode="login">Entrar</button>',
    '    <button type="button" class="wt-tab" data-mode="register">Criar Conta</button>',
    '  </div>',
    '  <form id="wt-auth-form" class="wt-form">',
    '    <div class="wt-field">',
    '      <label for="wt-user">Conta (Usuário)</label>',
    '      <input id="wt-user" type="text" autocomplete="username" placeholder="Ex.: Guerreiro01" minlength="3" maxlength="32" required />',
    '    </div>',
    '    <div class="wt-field">',
    '      <label for="wt-pass">Senha</label>',
    '      <input id="wt-pass" type="password" autocomplete="current-password" placeholder="Mínimo 4 caracteres" minlength="4" required />',
    '    </div>',
    '    <div class="wt-field" id="wt-pass2-wrap" style="display:none">',
    '      <label for="wt-pass2">Confirmar Senha</label>',
    '      <input id="wt-pass2" type="password" autocomplete="new-password" placeholder="Repita a senha" />',
    '    </div>',
    '    <div class="wt-row" id="wt-remember-wrap">',
    '      <label class="wt-check"><input id="wt-remember" type="checkbox" checked /> Lembrar conta</label>',
    '      <button type="button" id="wt-switch-link" style="background:none;border:none;color:#fbbf24;font-size:12px;cursor:pointer;padding:0">Não tem conta? Criar agora</button>',
    '    </div>',
    '    <div id="wt-auth-err" class="wt-err"></div>',
    '    <button type="submit" id="wt-auth-submit" class="wt-btn">Começar a jogar</button>',
    '    <div class="wt-hint">Servidor S1 - EasyPanel</div>',
    '  </form>',
    '</div>'
  ].join('');
  document.body.appendChild(wrap);

  var mode = 'login';
  var activeWnd = null;
  var elForm = document.getElementById('wt-auth-form');
  var elUser = document.getElementById('wt-user');
  var elPass = document.getElementById('wt-pass');
  var elPass2 = document.getElementById('wt-pass2');
  var elPass2Wrap = document.getElementById('wt-pass2-wrap');
  var elRemember = document.getElementById('wt-remember');
  var elErr = document.getElementById('wt-auth-err');
  var elSubmit = document.getElementById('wt-auth-submit');
  var elSwitch = document.getElementById('wt-switch-link');
  var tabBtns = wrap.querySelectorAll('.wt-tab');

  function setError(msg) {
    if (!msg) {
      elErr.textContent = '';
      elErr.classList.remove('show');
    } else {
      elErr.textContent = msg;
      elErr.classList.add('show');
    }
  }

  function setMode(nextMode) {
    mode = nextMode;
    setError('');
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].classList.toggle('active', tabBtns[i].getAttribute('data-mode') === mode);
    }
    var isReg = mode === 'register';
    elPass2Wrap.style.display = isReg ? 'block' : 'none';
    elPass2.required = isReg;
    elPass.setAttribute('autocomplete', isReg ? 'new-password' : 'current-password');
    elSubmit.textContent = isReg ? 'Criar Conta e Jogar' : 'Começar a jogar';
    elSwitch.textContent = isReg ? 'Já tenho conta (Entrar)' : 'Não tem conta? Criar agora';
  }

  for (var i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener('click', function () {
      setMode(this.getAttribute('data-mode'));
    });
  }
  elSwitch.addEventListener('click', function () {
    setMode(mode === 'login' ? 'register' : 'login');
  });

  elForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    setError('');
    var username = (elUser.value || '').trim();
    var password = elPass.value || '';
    if (username.length < 3) {
      setError('Usuário precisa ter pelo menos 3 caracteres.');
      return;
    }
    if (password.length < 4) {
      setError('A senha precisa ter pelo menos 4 caracteres.');
      return;
    }
    if (mode === 'register' && password !== (elPass2.value || '')) {
      setError('As senhas digitadas não conferem.');
      return;
    }

    elSubmit.disabled = true;
    var endpoint = mode === 'register' ? '/api/player/register' : '/api/player/login';
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, status: r.status, data: d }; });
      })
      .then(function (res) {
        if (!res.ok || res.data.ok === false) {
          setError(res.data.error || ('Falha ao autenticar (HTTP ' + res.status + ')'));
          return;
        }
        try {
          if (elRemember.checked) {
            localStorage.setItem('wt_saved_user', username);
          } else {
            localStorage.removeItem('wt_saved_user');
          }
        } catch (e) {}

        wrap.classList.remove('open');
        if (activeWnd) {
          if (activeWnd.ITextPlatfrom && !activeWnd.ITextPlatfrom.text) activeWnd.ITextPlatfrom.text = '1';
          if (activeWnd.ITextAccount) activeWnd.ITextAccount.text = username;
          if (activeWnd.ITextPassword) activeWnd.ITextPassword.text = password;
          if (activeWnd.checkSaveAccount) activeWnd.checkSaveAccount.selected = !!elRemember.checked;
          if (activeWnd.checkSavePwd) activeWnd.checkSavePwd.selected = false;
          activeWnd.bSaveAccount = !!elRemember.checked;
          activeWnd.bSavePwd = false;
          if (typeof activeWnd.loginGame === 'function') {
            activeWnd.loginGame();
          }
        }
      })
      .catch(function () {
        setError('Erro de conexão com o servidor. Tente novamente.');
      })
      .finally(function () {
        elSubmit.disabled = false;
      });
  });

  window.__wartuneShowAuth = function (wnd) {
    activeWnd = wnd || null;
    try {
      var saved = localStorage.getItem('wt_saved_user') || (wnd && wnd.ITextAccount ? wnd.ITextAccount.text : '');
      if (saved && !elUser.value) elUser.value = saved;
    } catch (e) {}
    setMode('login');
    wrap.classList.add('open');
  };

  window.__wartuneHideAuth = function () {
    wrap.classList.remove('open');
  };
})();
