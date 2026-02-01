/* script.js
   Responsável por:
   - Render da página principal (tiles)
   - Navegação single-page para páginas de tópico
   - Sintaxe simples para codeblocks (shell/sql/powershell)
   - Botão copiar
   - Toggle de tema (night/day) - padrão: night
*/

/* ======================
   Helper utilities
   ====================== */
function el(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"'`]/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;'
    }[m];
  });
}

/* Small syntax highlighter (regex-based) */
function highlightCode(code, lang) {
  // Escape
  let s = escapeHtml(code);

  // Comments
  s = s.replace(/(\/\*[\s\S]*?\*\/|--.*$|#.*$)/gm, m => `<span class="token-cmt">${m}</span>`);

  if (/sql/i.test(lang)) {
    // Basic SQL keywords
    const keywords = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|LIMIT|TOP|UPDATE|DELETE|INSERT INTO|VALUES|SET|AS|COUNT|AVG|SUM|DESC|ASC)\b/gi;
    s = s.replace(keywords, m => `<span class="token-key">${m}</span>`);
    // Strings
    s = s.replace(/'([^']*)'/g, m => `<span class="token-str">${m}</span>`);
    // simple formatting: line break before keywords
    s = s.replace(/\s*SELECT\s*/gi, '\n<select>SELECT</select>').replace(/\n<select>/g, 'SELECT ');
  } else {
    // Shell / windows
    // flags / options
    s = s.replace(/(\-\-[a-zA-Z\-]+|\-[a-zA-Z0-9]+)/g, m => `<span class="token-key">${m}</span>`);
    // paths
    s = s.replace(/([\/\\][\w\-\._~\/\\]+[\w\-\._~\/\\]*)/g, m => `<span class="token-fn">${m}</span>`);
    // executables / commands (first word)
    s = s.replace(/^([a-zA-Z\-\._]+)(?=\s|$)/gm, m => `<span class="token-key">${m}</span>`);
    // strings between quotes
    s = s.replace(/'([^']*)'/g, m => `<span class="token-str">${m}</span>`);
  }

  // Ensure that we didn't break tags
  return s;
}

/* Copy to clipboard with fallback */
async function copyText(text, btn) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    btn.textContent = "Copiado ✓";
    setTimeout(() => btn.textContent = "Copiar", 1600);
  } catch (e) {
    btn.textContent = "Erro";
    setTimeout(() => btn.textContent = "Copiar", 1600);
  }
}

/* ======================
   Render functions
   ====================== */

function createTile(item) {
  const t = el('div','tile');
  const top = el('div','tile-top');
  const ico = el('div','ico');
  ico.innerHTML = generateIconSVG(item.id || item.title);
  top.appendChild(ico);
  t.appendChild(top);

  const h = el('h3', null, item.title || item.title);
  t.appendChild(h);
  const p = el('p', null, item.subtitle || item.description || '');
  t.appendChild(p);

  t.addEventListener('click', () => openTopic(item.id));
  return t;
}

function generateIconSVG(key) {
  // Create simple SVG icons inline based on key
  if (!key) key = 'misc';
  const k = key.toString().toLowerCase();
  if (k.includes('linux')) {
    // penguin simplified
    return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><circle cx="32" cy="32" r="30" fill="#111827"/><path d="M20 26q1-8 12-8t12 8q0 14-12 18Q21 40 20 26z" fill="#fff"/><circle cx="28" cy="24" r="2.6" fill="#111827"/><circle cx="36" cy="24" r="2.6" fill="#111827"/></g></svg>`;
  }
  if (k.includes('windows')) {
    return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="52" height="44" rx="6" fill="#0ea5e9"/><g transform="translate(6,10)"><rect x="2" y="2" width="24" height="18" fill="#fff" opacity="0.12"/><rect x="2" y="22" width="24" height="18" fill="#fff" opacity="0.06"/><rect x="30" y="2" width="24" height="38" fill="#fff" opacity="0.08"/></g></svg>`;
  }
  if (k.includes('network') || k.includes('networking')) {
    return `<svg viewBox="0 0 64 64"><circle cx="16" cy="16" r="6" fill="#34d399"/><circle cx="48" cy="16" r="6" fill="#60a5fa"/><circle cx="32" cy="44" r="6" fill="#f59e0b"/><path d="M22 18 L30 38 L42 18" stroke="#94a3b8" stroke-width="2" fill="none"/></svg>`;
  }
  if (k.includes('sql')) {
    return `<svg viewBox="0 0 64 64"><rect x="8" y="8" width="48" height="48" rx="8" fill="#7c3aed"/><text x="32" y="38" font-size="18" text-anchor="middle" fill="#fff" font-family="monospace">SQL</text></svg>`;
  }
  if (k.includes('trouble') || k.includes('troubleshooting')) {
    return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="#f97316"/><text x="32" y="36" font-size="18" text-anchor="middle" fill="#111827">!</text></svg>`;
  }
  return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#60a5fa"/></svg>`;
}

/* Render the main menu tiles */
function renderMenu() {
  const tiles = document.getElementById('tiles');
  tiles.innerHTML = '';
  for (const item of portalData) {
    const tile = el('div','tile');
    const ico = el('div','ico');
    ico.innerHTML = generateIconSVG(item.id);
    tile.appendChild(ico);

    const title = el('h3', null, item.title);
    tile.appendChild(title);
    const subtitle = el('p', null, item.subtitle || item.description || '');
    tile.appendChild(subtitle);

    tile.addEventListener('click', () => openTopic(item.id));
    tiles.appendChild(tile);
  }
}

/* Build content page for a topic */
function openTopic(id) {
  const data = portalData.find(x => x.id === id);
  const menuPage = document.getElementById('menuPage');
  const contentPage = document.getElementById('contentPage');
  const contentInner = document.getElementById('contentInner');

  menuPage.classList.add('hidden');
  contentPage.classList.remove('hidden');
  contentInner.innerHTML = '';

  // Title
  const title = el('h2','page-title', data.title);
  contentInner.appendChild(title);

  // Subtitle and description
  const sub = el('p','lead', data.subtitle || data.description || '');
  contentInner.appendChild(sub);

  // If there is a glossary summary for the topic, render it
  if (data.glossary && data.glossary.length) {
    const gwrap = el('div','glossary');
    const gtitle = el('b', '', 'Glossário rápido:');
    gwrap.appendChild(gtitle);
    const ul = el('ul', '');
    data.glossary.forEach((g, i) => {
      const li = el('li', '', `*${i+1}* ${g.term}: ${g.text}`);
      ul.appendChild(li);
    });
    gwrap.appendChild(ul);
    contentInner.appendChild(gwrap);
  }

  // Items: each item becomes um painel com título, explicação e codebox
  for (const item of data.items) {
    const card = el('div','panel');
    const itTitle = el('h3','', item.title || item.title);
    card.appendChild(itTitle);
    if (item.explanation) {
      const p = el('p','', item.explanation);
      card.appendChild(p);
    }
    if (item.code) {
      const codeBox = el('div','code-box');
      codeBox.innerHTML = `<pre class="code-pre" data-lang="${detectLang(data.id, item.code)}">${highlightCode(item.code, data.id)}</pre>`;
      const copyBtn = el('button','copy-btn','Copiar');
      copyBtn.addEventListener('click', () => {
        copyText(item.code, copyBtn);
      });
      codeBox.appendChild(copyBtn);
      card.appendChild(codeBox);
    }
    contentInner.appendChild(card);
  }

  // Scroll to top of content
  contentPage.scrollIntoView({behavior:'smooth'});
}

function detectLang(topicId, code) {
  if (topicId === 'sql') return 'sql';
  if (topicId === 'linux' || topicId === 'networking') return 'shell';
  if (topicId === 'windows') return code.toLowerCase().includes('powershell') ? 'powershell' : 'cmd';
  return 'text';
}

/* Back to menu */
document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('contentPage').classList.add('hidden');
  document.getElementById('menuPage').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Theme toggle */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
  const root = document.body;
  if (themeToggle.checked) {
    root.classList.remove('theme-day');
    root.classList.add('theme-night');
    document.querySelector('.toggle-label').textContent = 'Night';
  } else {
    root.classList.remove('theme-night');
    root.classList.add('theme-day');
    document.querySelector('.toggle-label').textContent = 'Day';
  }
});

/* Init */
function init() {
  renderMenu();
  // inject small svg logo into header
  const logo = document.getElementById('logoSvg');
  logo.innerHTML = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="56" height="56" rx="10" fill="#0ea5e9"/><text x="32" y="38" text-anchor="middle" font-size="14" fill="#fff" font-family="sans-serif">SG</text></svg>`;
}
init();
