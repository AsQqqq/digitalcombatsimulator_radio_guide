// === DCS Radio Guide — App Logic ===

// Categories definition (order matters for sidebar)
var CATEGORIES = [
  { id: "general", title: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435" },
  { id: "airfield", title: "\u0421\u0430\u043C\u043E\u043B\u0451\u0442 \u2014 \u0410\u044D\u0440\u043E\u0434\u0440\u043E\u043C" },
  { id: "emergency", title: "\u042D\u043A\u0441\u0442\u0440\u0435\u043D\u043D\u044B\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438" },
  { id: "helicopter", title: "\u0412\u0435\u0440\u0442\u043E\u043B\u0451\u0442\u044B" },
  { id: "carrier", title: "\u0410\u0432\u0438\u0430\u043D\u043E\u0441\u0435\u0446" },
  { id: "awacs", title: "AWACS / GCI" },
  { id: "reference", title: "\u0421\u043F\u0440\u0430\u0432\u043A\u0430" }
];

// Settings
var callsign = localStorage.getItem('dcs_callsign') || 'King 7';
var acType = localStorage.getItem('dcs_type') || 'C-130';
var acRole = localStorage.getItem('dcs_role') || '\u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 / Transport';

function updateAllCallsigns() {
  document.querySelectorAll('.cs').forEach(function(el) { el.textContent = callsign; });
  document.getElementById('headerCS').textContent = callsign;
  document.getElementById('headerType').textContent = acType;
}

function openSettings() {
  document.getElementById('inputCS').value = callsign;
  document.getElementById('inputType').value = acType;
  var sel = document.getElementById('inputRole');
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value === acRole) sel.options[i].selected = true;
  }
  document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('active');
}

function saveSettings() {
  callsign = document.getElementById('inputCS').value || 'King 7';
  acType = document.getElementById('inputType').value || 'C-130';
  acRole = document.getElementById('inputRole').value;
  localStorage.setItem('dcs_callsign', callsign);
  localStorage.setItem('dcs_type', acType);
  localStorage.setItem('dcs_role', acRole);
  updateAllCallsigns();
  closeSettings();
}

// Language toggle
function setLang(lang) {
  document.body.classList.toggle('lang-en', lang === 'en');
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.l === lang);
  });
}

// Card toggle
function toggleCard(header) {
  header.closest('.comm-card').classList.toggle('open');
}

// Mobile sidebar
function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
}

// --- Utility: replace {cs} with callsign span ---
function renderText(text) {
  return text.replace(/\{cs\}/g, '<span class="cs">' + escapeHtml(callsign) + '</span>');
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Build sidebar navigation ---
function buildSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';

  CATEGORIES.forEach(function(cat) {
    var sections = DATA_REGISTRY.filter(function(s) { return s.category === cat.id; });
    sections.sort(function(a, b) { return a.order - b.order; });

    if (sections.length === 0) return;

    var titleDiv = document.createElement('div');
    titleDiv.className = 'nav-section-title';
    titleDiv.textContent = cat.title;
    sidebar.appendChild(titleDiv);

    sections.forEach(function(section) {
      var link = document.createElement('a');
      link.className = 'nav-link';
      link.href = '#' + section.id;
      link.textContent = section.title.ru;
      link.onclick = function() { closeSidebar(); };
      sidebar.appendChild(link);
    });
  });
}

// --- Build main content ---
function buildContent() {
  var main = document.getElementById('mainContent');
  main.innerHTML = '';

  CATEGORIES.forEach(function(cat) {
    var sections = DATA_REGISTRY.filter(function(s) { return s.category === cat.id; });
    sections.sort(function(a, b) { return a.order - b.order; });

    sections.forEach(function(section) {
      main.appendChild(renderSection(section));
    });
  });
}

// --- Render a section ---
function renderSection(section) {
  var div = document.createElement('div');
  div.className = 'section';
  div.id = section.id;

  // Section header
  var header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML =
    '<span class="section-number">' + section.number + '</span>' +
    '<h2 class="section-title" data-lang="ru">' + section.title.ru + '</h2>' +
    '<h2 class="section-title" data-lang="en">' + section.title.en + '</h2>';
  div.appendChild(header);

  // Dispatch by type
  if (section.type === 'info') {
    div.appendChild(renderInfoSection(section));
  } else if (section.type === 'phonetic') {
    div.appendChild(renderPhoneticSection(section));
  } else if (section.type === 'terms') {
    div.appendChild(renderTermsSection(section));
  } else {
    // Standard cards section
    renderCardsSection(section, div);
  }

  return div;
}

// --- Info sections (intro, rules, carrier-info, awacs-general) ---
function renderInfoSection(section) {
  var frag = document.createDocumentFragment();
  var content = section.content;

  if (content.both) {
    var box = document.createElement('div');
    box.className = 'info-box';
    box.innerHTML = content.both;
    frag.appendChild(box);
  }

  if (content.ru) {
    var boxRu = document.createElement('div');
    boxRu.className = 'info-box';
    boxRu.setAttribute('data-lang', 'ru');
    boxRu.innerHTML = content.ru;
    frag.appendChild(boxRu);
  }

  if (content.en) {
    var boxEn = document.createElement('div');
    boxEn.className = 'info-box';
    boxEn.setAttribute('data-lang', 'en');
    boxEn.innerHTML = content.en;
    frag.appendChild(boxEn);
  }

  return frag;
}

// --- Phonetic alphabet ---
function renderPhoneticSection(section) {
  var grid = document.createElement('div');
  grid.className = 'phonetic-grid';

  section.alphabet.forEach(function(item) {
    var el = document.createElement('div');
    el.className = 'phonetic-item';
    el.innerHTML =
      '<div class="phonetic-letter">' + item.letter + '</div>' +
      '<div class="phonetic-word">' + item.word + '</div>';
    grid.appendChild(el);
  });

  return grid;
}

// --- Terms table ---
function renderTermsSection(section) {
  // Check if it has cardTitle (like LSO calls) — render as comm-card with term rows
  if (section.cardTitle) {
    return renderTermsCard(section);
  }

  var container = document.createElement('div');
  container.style.cssText = 'background:var(--bg-card);border:1px solid var(--border);border-radius:10px;overflow:hidden;';

  section.terms.forEach(function(term) {
    var row = document.createElement('div');
    row.className = 'term-row';
    row.innerHTML =
      '<span class="term-name">' + term.name + '</span>' +
      '<span class="term-def">' + term.def + '</span>';
    container.appendChild(row);
  });

  return container;
}

// --- Terms rendered as comm-card (LSO calls) ---
function renderTermsCard(section) {
  var card = document.createElement('div');
  card.className = 'comm-card';

  var headerClass = section.cardType ? ' ' + section.cardType : '';
  var header = document.createElement('div');
  header.className = 'comm-card-header' + headerClass;
  header.onclick = function() { toggleCard(this); };
  header.innerHTML =
    '<span class="card-icon">' + section.cardIcon + '</span>' +
    '<span class="card-title" data-lang="ru">' + section.cardTitle.ru + '</span>' +
    '<span class="card-title" data-lang="en">' + section.cardTitle.en + '</span>' +
    '<span class="card-chevron">\u25BC</span>';
  card.appendChild(header);

  var body = document.createElement('div');
  body.className = 'comm-card-body';

  section.terms.forEach(function(term) {
    var row = document.createElement('div');
    row.className = 'term-row';
    row.innerHTML =
      '<span class="term-name">' + term.name + '</span>' +
      '<span class="term-def">' + term.def + '</span>';
    body.appendChild(row);
  });

  card.appendChild(body);
  return card;
}

// --- Standard cards section ---
function renderCardsSection(section, container) {
  section.cards.forEach(function(card) {
    container.appendChild(renderCard(card));
  });
}

// --- Render a single comm card ---
function renderCard(card) {
  var el = document.createElement('div');
  el.className = 'comm-card' + (card.defaultOpen ? ' open' : '');
  if (card.lang && card.lang !== 'both') {
    el.setAttribute('data-lang', card.lang);
  }

  // Header
  var headerClass = card.type && card.type !== 'normal' ? ' ' + card.type : '';
  var header = document.createElement('div');
  header.className = 'comm-card-header' + headerClass;
  header.onclick = function() { toggleCard(this); };
  header.innerHTML =
    '<span class="card-icon">' + card.icon + '</span>' +
    '<span class="card-title">' + card.title + '</span>' +
    '<span class="card-chevron">\u25BC</span>';
  el.appendChild(header);

  // Body
  var body = document.createElement('div');
  body.className = 'comm-card-body';

  // Phrases
  if (card.phrases) {
    card.phrases.forEach(function(phrase) {
      body.appendChild(renderPhrase(phrase, card.type));
    });
  }

  // Explanation
  if (card.explanation) {
    body.appendChild(renderExplanation(card.explanation));
  }

  // Info box
  if (card.infoBox) {
    var infoBox = document.createElement('div');
    infoBox.className = 'info-box';
    infoBox.style.marginTop = '12px';
    infoBox.innerHTML = card.infoBox;
    body.appendChild(infoBox);
  }

  // Action
  if (card.action) {
    body.appendChild(renderAction(card.action));
  }

  // Response
  if (card.response) {
    body.appendChild(renderResponse(card.response));
  }

  // ResponseAfter (e.g., "after touchdown")
  if (card.responseAfter) {
    var respAfter = renderResponse(card.responseAfter);
    respAfter.style.marginTop = '8px';
    body.appendChild(respAfter);
  }

  el.appendChild(body);
  return el;
}

// --- Render a phrase block ---
function renderPhrase(phrase, cardType) {
  var phraseClass = 'phrase-block';
  if (cardType === 'emergency') phraseClass += ' emergency-phrase';
  else if (cardType === 'carrier') phraseClass += ' carrier-phrase';
  else if (cardType === 'awacs') phraseClass += ' awacs-phrase';

  var block = document.createElement('div');
  block.className = phraseClass;
  if (phrase.lang) {
    block.setAttribute('data-lang', phrase.lang);
  }

  block.innerHTML =
    '<div class="phrase-label">' + phrase.label + '</div>' +
    '<div class="phrase-text' + (phrase.speaker === 'atc' ? ' rp' : '') + '">' +
    renderText(phrase.text) + '</div>';

  return block;
}

// --- Render explanation ---
function renderExplanation(expl) {
  var div = document.createElement('div');
  div.className = 'explanation';

  // Title can be string or {ru, en} object
  if (typeof expl.title === 'object') {
    div.innerHTML =
      '<div class="explanation-title" data-lang="ru">' + expl.title.ru + '</div>' +
      '<div class="explanation-title" data-lang="en">' + expl.title.en + '</div>';
  } else {
    div.innerHTML = '<div class="explanation-title">' + expl.title + '</div>';
  }

  if (expl.items) {
    var ul = document.createElement('ul');
    expl.items.forEach(function(item) {
      var li = document.createElement('li');
      li.innerHTML = item;
      ul.appendChild(li);
    });
    div.appendChild(ul);
  } else if (expl.text) {
    var p = document.createElement('p');
    p.innerHTML = expl.text;
    div.appendChild(p);
  }

  return div;
}

// --- Render action block ---
function renderAction(action) {
  var div = document.createElement('div');
  div.className = 'action-block';
  div.innerHTML = '<div class="action-title">' + action.title + '</div>';

  var ul = document.createElement('ul');
  action.items.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  div.appendChild(ul);

  return div;
}

// --- Render response block ---
function renderResponse(resp) {
  var div = document.createElement('div');
  div.className = 'response-block';
  div.innerHTML =
    '<div class="response-title">' + resp.title + '</div>' +
    '<div class="response-text">' + renderText(resp.text) + '</div>';
  return div;
}

// --- Search ---
function buildSearchIndex() {
  var index = [];

  DATA_REGISTRY.forEach(function(section) {
    var catObj = CATEGORIES.find(function(c) { return c.id === section.category; });
    var catTitle = catObj ? catObj.title : '';

    // Section titles
    index.push({
      text: section.title.ru,
      sectionId: section.id,
      context: catTitle,
      type: 'title'
    });
    index.push({
      text: section.title.en,
      sectionId: section.id,
      context: catTitle,
      type: 'title'
    });

    // Info content
    if (section.type === 'info' && section.content) {
      ['ru', 'en', 'both'].forEach(function(lang) {
        if (section.content[lang]) {
          var plain = stripHtml(section.content[lang]);
          if (plain) {
            index.push({
              text: plain,
              sectionId: section.id,
              context: section.title.ru,
              type: 'info'
            });
          }
        }
      });
    }

    // Terms
    if (section.terms) {
      section.terms.forEach(function(term) {
        index.push({
          text: term.name + ' — ' + term.def,
          sectionId: section.id,
          context: section.title.ru,
          type: 'term'
        });
      });
    }

    // Phonetic
    if (section.alphabet) {
      section.alphabet.forEach(function(item) {
        index.push({
          text: item.letter + ' — ' + item.word,
          sectionId: section.id,
          context: section.title.ru,
          type: 'phonetic'
        });
      });
    }

    // Cards with phrases
    if (section.cards) {
      section.cards.forEach(function(card) {
        if (card.phrases) {
          card.phrases.forEach(function(phrase) {
            var cleanText = phrase.text.replace(/\{cs\}/g, callsign);
            index.push({
              text: cleanText,
              sectionId: section.id,
              context: section.title.ru + ' \u2192 ' + card.title,
              type: 'phrase'
            });
          });
        }

        // Explanation items
        if (card.explanation && card.explanation.items) {
          card.explanation.items.forEach(function(item) {
            index.push({
              text: stripHtml(item),
              sectionId: section.id,
              context: section.title.ru + ' \u2192 ' + card.title,
              type: 'explanation'
            });
          });
        }
        if (card.explanation && card.explanation.text) {
          index.push({
            text: stripHtml(card.explanation.text),
            sectionId: section.id,
            context: section.title.ru + ' \u2192 ' + card.title,
            type: 'explanation'
          });
        }

        // Response
        if (card.response) {
          var respText = card.response.text.replace(/\{cs\}/g, callsign);
          index.push({
            text: respText,
            sectionId: section.id,
            context: section.title.ru + ' \u2192 ' + card.title,
            type: 'phrase'
          });
        }
        if (card.responseAfter) {
          var respAfterText = card.responseAfter.text.replace(/\{cs\}/g, callsign);
          index.push({
            text: respAfterText,
            sectionId: section.id,
            context: section.title.ru + ' \u2192 ' + card.title,
            type: 'phrase'
          });
        }

        // Action items
        if (card.action && card.action.items) {
          card.action.items.forEach(function(item) {
            index.push({
              text: item,
              sectionId: section.id,
              context: section.title.ru + ' \u2192 ' + card.title,
              type: 'action'
            });
          });
        }

        // InfoBox
        if (card.infoBox) {
          index.push({
            text: stripHtml(card.infoBox),
            sectionId: section.id,
            context: section.title.ru + ' \u2192 ' + card.title,
            type: 'info'
          });
        }
      });
    }
  });

  return index;
}

function stripHtml(html) {
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function performSearch(query) {
  var resultsEl = document.getElementById('searchResults');

  if (!query || query.length < 2) {
    resultsEl.classList.remove('active');
    resultsEl.innerHTML = '';
    return;
  }

  var lowerQuery = query.toLowerCase();
  var seen = {};
  var matches = [];

  window._searchIndex.forEach(function(entry) {
    if (matches.length >= 20) return;
    var lowerText = entry.text.toLowerCase();
    var pos = lowerText.indexOf(lowerQuery);
    if (pos === -1) return;

    // Deduplicate by sectionId + truncated text
    var key = entry.sectionId + '|' + entry.text.substring(0, 80);
    if (seen[key]) return;
    seen[key] = true;

    matches.push({
      entry: entry,
      pos: pos
    });
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = '<div class="search-no-results">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>';
    resultsEl.classList.add('active');
    return;
  }

  resultsEl.innerHTML = '';

  matches.forEach(function(match) {
    var entry = match.entry;
    var item = document.createElement('a');
    item.className = 'search-result-item';
    item.href = '#' + entry.sectionId;

    item.onclick = function(e) {
      e.preventDefault();
      resultsEl.classList.remove('active');
      document.getElementById('searchInput').value = '';

      var target = document.getElementById(entry.sectionId);
      if (target) {
        // Open all cards in that section
        target.querySelectorAll('.comm-card:not(.open)').forEach(function(card) {
          card.classList.add('open');
        });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeSidebar();
    };

    // Highlight match in text
    var displayText = entry.text;
    if (displayText.length > 120) {
      var start = Math.max(0, match.pos - 30);
      var end = Math.min(displayText.length, match.pos + query.length + 60);
      displayText = (start > 0 ? '...' : '') + displayText.substring(start, end) + (end < entry.text.length ? '...' : '');
    }
    var highlighted = highlightMatch(displayText, query);

    item.innerHTML =
      '<div class="search-result-section">' + escapeHtml(entry.context) + '</div>' +
      '<div class="search-result-text">' + highlighted + '</div>';

    resultsEl.appendChild(item);
  });

  resultsEl.classList.add('active');
}

function highlightMatch(text, query) {
  var escaped = escapeHtml(text);
  var lowerEscaped = escaped.toLowerCase();
  var lowerQuery = query.toLowerCase();
  var result = '';
  var lastIndex = 0;

  while (true) {
    var idx = lowerEscaped.indexOf(lowerQuery, lastIndex);
    if (idx === -1) break;
    result += escaped.substring(lastIndex, idx);
    result += '<mark>' + escaped.substring(idx, idx + query.length) + '</mark>';
    lastIndex = idx + query.length;
  }
  result += escaped.substring(lastIndex);
  return result;
}

function initSearch() {
  window._searchIndex = buildSearchIndex();

  var input = document.getElementById('searchInput');
  var resultsEl = document.getElementById('searchResults');
  var debounceTimer;

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    var q = input.value.trim();
    debounceTimer = setTimeout(function() {
      performSearch(q);
    }, 150);
  });

  // Close on click outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-wrapper')) {
      resultsEl.classList.remove('active');
    }
  });

  // Reopen on focus if there's a query
  input.addEventListener('focus', function() {
    if (input.value.trim().length >= 2) {
      performSearch(input.value.trim());
    }
  });

  // Escape to close
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      resultsEl.classList.remove('active');
      input.blur();
    }
  });
}

// --- Initialize ---
function init() {
  buildSidebar();
  buildContent();
  updateAllCallsigns();
  initSearch();

  // Settings modal close on overlay click
  document.getElementById('settingsModal').addEventListener('click', function(e) {
    if (e.target === this) closeSettings();
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
