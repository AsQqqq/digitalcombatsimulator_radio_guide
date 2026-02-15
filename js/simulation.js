// === DCS Radio Guide — Flight Simulation Builder ===

// Wizard state
var simWizardStep = 1;
var simWaypoints = [];
var simConfig = {};
var simCurrentStep = 0;
var simTotalSteps = 0;

// --- Modal control ---
function openSimModal() {
  simWizardStep = 1;
  simWaypoints = [];

  // Pre-fill from settings
  document.getElementById('simCallsign').value = callsign || 'King 7';
  document.getElementById('simType').value = acType || 'C-130';
  document.getElementById('simOpType').value = 'airfield';

  updateSimWizard();
  renderSimWaypoints();
  clearSimEmergencies();
  document.getElementById('simModal').classList.add('active');
}

function closeSimModal() {
  document.getElementById('simModal').classList.remove('active');
}

function updateSimWizard() {
  for (var i = 1; i <= 4; i++) {
    var stepEl = document.getElementById('simStep' + i);
    if (stepEl) stepEl.style.display = i === simWizardStep ? 'block' : 'none';
  }
  // Update step indicators
  var indicators = document.querySelectorAll('.sim-step-indicator');
  indicators.forEach(function(ind, idx) {
    ind.classList.toggle('active', idx + 1 === simWizardStep);
    ind.classList.toggle('done', idx + 1 < simWizardStep);
  });

  // Update origin/destination labels based on op type
  var opType = document.getElementById('simOpType').value;
  updateRouteLabels(opType);

  // Show/hide step 3 generate button text
  if (simWizardStep === 4) {
    renderSimPreview();
  }
}

function nextSimStep() {
  if (simWizardStep < 4) {
    simWizardStep++;
    updateSimWizard();
  }
}

function prevSimStep() {
  if (simWizardStep > 1) {
    simWizardStep--;
    updateSimWizard();
  }
}

function updateRouteLabels(opType) {
  var originLabel = document.getElementById('simOriginLabel');
  var destLabel = document.getElementById('simDestLabel');
  if (!originLabel || !destLabel) return;

  var originPlaceholder = document.getElementById('simOrigin');
  var destPlaceholder = document.getElementById('simDest');

  switch (opType) {
    case 'airfield':
      originLabel.textContent = '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c \u0432\u044b\u043b\u0435\u0442\u0430';
      destLabel.textContent = '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c \u043f\u043e\u0441\u0430\u0434\u043a\u0438';
      originPlaceholder.placeholder = '\u0421\u0435\u043d\u0430\u043a\u0438';
      destPlaceholder.placeholder = '\u041a\u0443\u0442\u0430\u0438\u0441\u0438';
      break;
    case 'helicopter':
      originLabel.textContent = '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c / FARP \u0432\u044b\u043b\u0435\u0442\u0430';
      destLabel.textContent = '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c / FARP \u043f\u043e\u0441\u0430\u0434\u043a\u0438';
      originPlaceholder.placeholder = '\u0421\u0435\u043d\u0430\u043a\u0438';
      destPlaceholder.placeholder = 'FARP London';
      break;
    case 'carrier-departure':
      originLabel.textContent = '\u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446';
      destLabel.textContent = '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c \u043f\u043e\u0441\u0430\u0434\u043a\u0438';
      originPlaceholder.placeholder = 'CVN-74 Stennis';
      destPlaceholder.placeholder = '\u041a\u0443\u0442\u0430\u0438\u0441\u0438';
      break;
    case 'carrier-recovery':
      originLabel.textContent = '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c \u0432\u044b\u043b\u0435\u0442\u0430';
      destLabel.textContent = '\u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446';
      originPlaceholder.placeholder = '\u041a\u0443\u0442\u0430\u0438\u0441\u0438';
      destPlaceholder.placeholder = 'CVN-74 Stennis';
      break;
    case 'carrier-full':
      originLabel.textContent = '\u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446';
      destLabel.textContent = '\u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446 (Return)';
      originPlaceholder.placeholder = 'CVN-74 Stennis';
      destPlaceholder.placeholder = 'CVN-74 Stennis';
      break;
  }
}

// --- Waypoints management ---
function addWaypoint() {
  simWaypoints.push({ name: '', type: 'waypoint' });
  renderSimWaypoints();
}

function removeWaypoint(idx) {
  simWaypoints.splice(idx, 1);
  renderSimWaypoints();
}

function updateWaypoint(idx, field, value) {
  if (simWaypoints[idx]) {
    simWaypoints[idx][field] = value;
  }
}

function renderSimWaypoints() {
  var container = document.getElementById('simWaypointsList');
  if (!container) return;
  container.innerHTML = '';

  var opType = document.getElementById('simOpType').value;

  simWaypoints.forEach(function(wp, idx) {
    var row = document.createElement('div');
    row.className = 'sim-waypoint-row';

    var typeOptions = getWaypointTypes(opType);
    var selectHtml = '<select class="sim-wp-select" onchange="updateWaypoint(' + idx + ',\'type\',this.value)">';
    typeOptions.forEach(function(opt) {
      selectHtml += '<option value="' + opt.value + '"' + (wp.type === opt.value ? ' selected' : '') + '>' + opt.label + '</option>';
    });
    selectHtml += '</select>';

    row.innerHTML =
      '<span class="sim-wp-number">' + (idx + 1) + '</span>' +
      '<input type="text" class="sim-wp-name" value="' + escapeHtml(wp.name) + '" placeholder="WP-' + (idx + 1) + '" onchange="updateWaypoint(' + idx + ',\'name\',this.value)">' +
      '<div class="sim-wp-type">' + selectHtml + '</div>' +
      '<button class="sim-wp-remove" onclick="removeWaypoint(' + idx + ')" title="\u0423\u0434\u0430\u043b\u0438\u0442\u044c">&#10005;</button>';

    container.appendChild(row);
  });
}

function getWaypointTypes(opType) {
  var types = [
    { value: 'waypoint', label: '\u041f\u0440\u043e\u043b\u0451\u0442\u043d\u0430\u044f \u0442\u043e\u0447\u043a\u0430' },
    { value: 'refuel-airfield', label: '\u0414\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0430 (\u0430\u044d\u0440\u043e\u0434\u0440\u043e\u043c)' },
    { value: 'refuel-tanker', label: '\u0414\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0430 (\u0442\u0430\u043d\u043a\u0435\u0440)' },
    { value: 'awacs-checkin', label: '\u0427\u0435\u043a-\u0438\u043d AWACS' },
    { value: 'work-zone', label: '\u0417\u043e\u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u044b (CAS/CAP/Strike)' }
  ];

  if (opType === 'helicopter') {
    types.push({ value: 'farp', label: 'FARP' });
  }

  return types;
}

function clearSimEmergencies() {
  var checkboxes = document.querySelectorAll('#simStep3 input[type="checkbox"]');
  checkboxes.forEach(function(cb) { cb.checked = false; });
}

// --- Preview ---
function renderSimPreview() {
  var preview = document.getElementById('simPreview');
  if (!preview) return;

  var cs = document.getElementById('simCallsign').value || 'King 7';
  var type = document.getElementById('simType').value || 'C-130';
  var opType = document.getElementById('simOpType').value;
  var origin = document.getElementById('simOrigin').value || document.getElementById('simOrigin').placeholder;
  var dest = document.getElementById('simDest').value || document.getElementById('simDest').placeholder;

  var opLabels = {
    'airfield': '\u0421\u0430\u043c\u043e\u043b\u0451\u0442 (\u0430\u044d\u0440\u043e\u0434\u0440\u043e\u043c \u2192 \u0430\u044d\u0440\u043e\u0434\u0440\u043e\u043c)',
    'helicopter': '\u0412\u0435\u0440\u0442\u043e\u043b\u0451\u0442',
    'carrier-departure': '\u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446 \u2192 \u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c',
    'carrier-recovery': '\u0410\u044d\u0440\u043e\u0434\u0440\u043e\u043c \u2192 \u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446',
    'carrier-full': '\u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446 \u2192 \u0410\u0432\u0438\u0430\u043d\u043e\u0441\u0435\u0446'
  };

  var html = '';
  html += '<div class="sim-preview-item"><span class="sim-preview-label">\u041f\u043e\u0437\u044b\u0432\u043d\u043e\u0439:</span> <span class="sim-preview-value">' + escapeHtml(cs) + ' (' + escapeHtml(type) + ')</span></div>';
  html += '<div class="sim-preview-item"><span class="sim-preview-label">\u0422\u0438\u043f:</span> <span class="sim-preview-value">' + (opLabels[opType] || opType) + '</span></div>';
  html += '<div class="sim-preview-route">';
  html += '<div class="sim-preview-point origin">\u25CF ' + escapeHtml(origin) + '</div>';

  simWaypoints.forEach(function(wp) {
    var wpName = wp.name || 'WP';
    var wpTypeLabels = {
      'waypoint': '\u043f\u0440\u043e\u043b\u0451\u0442',
      'refuel-airfield': '\u0434\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0430',
      'refuel-tanker': '\u0442\u0430\u043d\u043a\u0435\u0440',
      'awacs-checkin': 'AWACS',
      'work-zone': '\u0437\u043e\u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u044b',
      'farp': 'FARP'
    };
    html += '<div class="sim-preview-point waypoint">\u25CB ' + escapeHtml(wpName) + ' <small>(' + (wpTypeLabels[wp.type] || wp.type) + ')</small></div>';
  });

  html += '<div class="sim-preview-point dest">\u25CF ' + escapeHtml(dest) + '</div>';
  html += '</div>';

  // Emergencies
  var emergencies = getSelectedEmergencies();
  if (emergencies.length > 0) {
    html += '<div class="sim-preview-item"><span class="sim-preview-label">\u042d\u043a\u0441\u0442\u0440\u0435\u043d\u043d\u044b\u0435:</span> <span class="sim-preview-value emergency-text">' + emergencies.map(function(e) { return e.label; }).join(', ') + '</span></div>';
  }

  preview.innerHTML = html;
}

function getSelectedEmergencies() {
  var lang = document.body.classList.contains('lang-en') ? 'en' : 'ru';
  var selected = [];

  document.querySelectorAll('#simStep3 input[type="checkbox"]:checked').forEach(function(cb) {
    var label =
      (lang === 'en' ? cb.dataset.labelEn : cb.dataset.labelRu) ||
      cb.dataset.label ||
      cb.value;

    selected.push({ id: cb.value, label: label });
  });

  return selected;
}

// --- Generation ---
function generateSimulation() {
  simConfig = {
    callsign: document.getElementById('simCallsign').value || 'King 7',
    acType: document.getElementById('simType').value || 'C-130',
    opType: document.getElementById('simOpType').value,
    origin: document.getElementById('simOrigin').value || document.getElementById('simOrigin').placeholder,
    dest: document.getElementById('simDest').value || document.getElementById('simDest').placeholder,
    waypoints: simWaypoints.slice(),
    emergencies: getSelectedEmergencies()
  };

  var steps = buildFlightPlan(simConfig);
  closeSimModal();
  renderSimPage(steps);
}

function buildFlightPlan(cfg) {
  var steps = [];
  var lang = document.body.classList.contains('lang-en') ? 'en' : 'ru';

  switch (cfg.opType) {
    case 'airfield':
      steps = steps.concat(buildAirfieldDeparture(cfg.origin, cfg.callsign, lang));
      steps = steps.concat(buildIntermediateSteps(cfg, lang));
      steps = steps.concat(buildAirfieldArrival(cfg.dest, cfg.callsign, lang));
      break;

    case 'helicopter':
      steps = steps.concat(buildHeliDeparture(cfg.origin, cfg.callsign, lang));
      steps = steps.concat(buildIntermediateSteps(cfg, lang));
      steps = steps.concat(buildHeliArrival(cfg.dest, cfg.callsign, lang));
      break;

    case 'carrier-departure':
      steps = steps.concat(buildCarrierDeparture(cfg.origin, cfg.callsign, lang));
      steps = steps.concat(buildIntermediateSteps(cfg, lang));
      steps = steps.concat(buildAirfieldArrival(cfg.dest, cfg.callsign, lang));
      break;

    case 'carrier-recovery':
      steps = steps.concat(buildAirfieldDeparture(cfg.origin, cfg.callsign, lang));
      steps = steps.concat(buildIntermediateSteps(cfg, lang));
      steps = steps.concat(buildCarrierRecovery(cfg.dest, cfg.callsign, cfg.acType, lang));
      break;

    case 'carrier-full':
      steps = steps.concat(buildCarrierDeparture(cfg.origin, cfg.callsign, lang));
      steps = steps.concat(buildIntermediateSteps(cfg, lang));
      steps = steps.concat(buildCarrierRecovery(cfg.dest, cfg.callsign, cfg.acType, lang));
      break;
  }

  // Number the steps
  steps.forEach(function(step, i) {
    step.number = i + 1;
  });

  return steps;
}

function buildIntermediateSteps(cfg, lang) {
  var steps = [];

  cfg.waypoints.forEach(function(wp) {
    var wpName = wp.name || 'WP';

    switch (wp.type) {
      case 'waypoint':
        steps.push({
          phase: lang === 'en' ? 'EN ROUTE' : '\u041c\u0410\u0420\u0428\u0420\u0423\u0422',
          location: wpName,
          icon: '\u{1F4CD}',
          type: 'info',
          phrases: [],
          note: lang === 'en'
            ? 'Passing waypoint ' + wpName + '. No radio communication required.'
            : '\u041f\u0440\u043e\u043b\u0451\u0442 \u0442\u043e\u0447\u043a\u0438 ' + wpName + '. \u0420\u0430\u0434\u0438\u043e\u043e\u0431\u043c\u0435\u043d \u043d\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f.'
        });
        break;

      case 'refuel-airfield':
        steps = steps.concat(buildAirfieldArrival(wpName, cfg.callsign, lang));
        steps.push({
          phase: lang === 'en' ? 'REFUELING' : '\u0414\u041e\u0417\u0410\u041f\u0420\u0410\u0412\u041a\u0410',
          location: wpName,
          icon: '\u26FD',
          type: 'info',
          phrases: [],
          note: lang === 'en'
            ? 'Refueling at ' + wpName + '. After refueling, repeat startup and taxi procedures.'
            : '\u0414\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0430 \u043d\u0430 ' + wpName + '. \u041f\u043e\u0441\u043b\u0435 \u0434\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u0440\u043e\u0446\u0435\u0434\u0443\u0440\u0443 \u0437\u0430\u043f\u0443\u0441\u043a\u0430 \u0438 \u0440\u0443\u043b\u0435\u043d\u0438\u044f.'
        });
        steps = steps.concat(buildAirfieldDeparture(wpName, cfg.callsign, lang));
        break;

      case 'refuel-tanker':
        steps.push(buildTankerRefuel(wpName, cfg.callsign, lang));
        break;

      case 'awacs-checkin':
        steps.push(buildAwacsCheckin(wpName, cfg.callsign, lang));
        break;

      case 'work-zone':
        steps.push(buildWorkZone(wpName, cfg.callsign, lang));
        break;

      case 'farp':
        steps = steps.concat(buildHeliArrival(wpName, cfg.callsign, lang));
        steps.push({
          phase: lang === 'en' ? 'FARP OPERATIONS' : '\u041e\u041f\u0415\u0420\u0410\u0426\u0418\u0418 \u041d\u0410 FARP',
          location: wpName,
          icon: '\u{1F681}',
          type: 'info',
          phrases: [],
          note: lang === 'en'
            ? 'Refueling and rearming at FARP ' + wpName + '.'
            : '\u0414\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0430 \u0438 \u043f\u0435\u0440\u0435\u0432\u043e\u043e\u0440\u0443\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 FARP ' + wpName + '.'
        });
        steps = steps.concat(buildHeliDeparture(wpName, cfg.callsign, lang));
        break;
    }
  });

  // Insert emergencies after intermediate steps
  cfg.emergencies.forEach(function(em) {
    steps.push(buildEmergency(em.id, cfg.callsign, cfg.origin, lang));
  });

  return steps;
}

// --- Airfield Departure ---
function buildAirfieldDeparture(airfieldName, cs, lang) {
  var af = airfieldName;
  var steps = [];

  if (lang === 'en') {
    steps.push({
      phase: 'RADIO CHECK',
      location: af,
      icon: '\u{1F4FB}',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: af + ', {cs}, radio check', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, ' + af + ', read you 5', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: 'ENGINE STARTUP',
      location: af,
      icon: '\u{1F525}',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: af + ', {cs}, request start up', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, ' + af + ', start up approved, runway 27, wind 270 at 7 kts, QFE 00.00', speaker: 'atc' }
      ],
      response: { title: 'Your response', text: 'Start up approved, {cs}' }
    });
    steps.push({
      phase: 'TAXI',
      location: af,
      icon: '\u{1F6DE}',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: af + ', {cs}, request taxi', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, ' + af + ', taxi to holding point runway 27', speaker: 'atc' },
        { label: 'ACFT (at holding)', text: af + ', {cs}, holding short runway 27', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, ' + af + ', line up runway 27 and wait', speaker: 'atc' }
      ],
      response: { title: 'Your response', text: 'Line up runway 27 and wait, {cs}' }
    });
    steps.push({
      phase: 'TAKEOFF',
      location: af,
      icon: '\u2708\uFE0F',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: af + ', {cs}, request take-off', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, ' + af + ', cleared for take-off runway 27, wind 270 at 7 kts', speaker: 'atc' }
      ],
      response: { title: 'After takeoff', text: 'Taking off, {cs}' }
    });
  } else {
    steps.push({
      phase: '\u041f\u0420\u041e\u0412\u0415\u0420\u041a\u0410 \u0421\u0412\u042f\u0417\u0418',
      location: af,
      icon: '\u{1F4FB}',
      type: 'normal',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0441\u0432\u044f\u0437\u0438', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, ' + af + ', \u0441\u043b\u044b\u0448\u0443 \u0432\u0430\u0441 \u043d\u0430 5', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: '\u0417\u0410\u041f\u0423\u0421\u041a',
      location: af,
      icon: '\u{1F525}',
      type: 'normal',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0437\u0430\u043f\u0443\u0441\u043a', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, ' + af + ', \u0437\u0430\u043f\u0443\u0441\u043a \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e, \u0412\u041f\u041f 27, \u0432\u0435\u0442\u0435\u0440 270, 6 \u0443\u0437\u043b\u043e\u0432, QFE 00.00', speaker: 'atc' }
      ],
      response: { title: '\u0422\u0432\u043e\u0439 \u043e\u0442\u0432\u0435\u0442', text: '\u0417\u0430\u043f\u0443\u0441\u043a \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u043b\u0438, {cs}' }
    });
    steps.push({
      phase: '\u0420\u0423\u041b\u0415\u041d\u0418\u0415',
      location: af,
      icon: '\u{1F6DE}',
      type: 'normal',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0440\u0443\u043b\u0435\u043d\u0438\u0435', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, ' + af + ', \u0440\u0443\u043b\u0435\u043d\u0438\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e, \u043d\u0430 \u043f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 27 \u043f\u043e\u043b\u043e\u0441\u044b', speaker: 'atc' },
        { label: '\u0411\u043e\u0440\u0442 (\u043d\u0430 \u043f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u043c)', text: af + ', {cs}, \u043d\u0430 \u043f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u043c', speaker: 'pilot' },
        { label: '\u0411\u043e\u0440\u0442 (\u0437\u0430\u043f\u0440\u043e\u0441 \u0438\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0433\u043e)', text: af + ', {cs}, \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0440\u0443\u043b\u0435\u043d\u0438\u0435 \u043d\u0430 \u0438\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, ' + af + ', \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e \u0440\u0443\u043b\u0435\u043d\u0438\u0435 \u043d\u0430 \u0438\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 27 \u043f\u043e\u043b\u043e\u0441\u044b', speaker: 'atc' }
      ],
      response: { title: '\u0422\u0432\u043e\u0439 \u043e\u0442\u0432\u0435\u0442', text: '\u0420\u0443\u043b\u0435\u043d\u0438\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u043b\u0438, \u043d\u0430 \u043f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 27, {cs}' }
    });
    steps.push({
      phase: '\u0412\u0417\u041b\u0401\u0422',
      location: af,
      icon: '\u2708\uFE0F',
      type: 'normal',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u0432\u0437\u043b\u0451\u0442', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, ' + af + ', \u0432\u0437\u043b\u0451\u0442 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e, \u0432\u0435\u0442\u0435\u0440 \u0443 \u0437\u0435\u043c\u043b\u0438 270, 7 \u0443\u0437\u043b\u043e\u0432, \u0443\u0434\u0430\u0447\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0451\u0442\u0430', speaker: 'atc' }
      ],
      response: { title: '\u0422\u0432\u043e\u0439 \u043e\u0442\u0432\u0435\u0442 (\u043f\u043e\u0441\u043b\u0435 \u0432\u0437\u043b\u0451\u0442\u0430)', text: af + ', {cs}, \u0432 \u0432\u043e\u0437\u0434\u0443\u0445\u0435, \u043a\u043e\u043d\u0435\u0446 \u0441\u0432\u044f\u0437\u0438' }
    });
  }

  return steps;
}

// --- Airfield Arrival ---
function buildAirfieldArrival(airfieldName, cs, lang) {
  var af = airfieldName;
  var steps = [];

  if (lang === 'en') {
    steps.push({
      phase: 'INBOUND',
      location: af,
      icon: '\u{1F6EC}',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: af + ', {cs}, inbound', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT (vectors)', text: '{cs}, continue on heading 212, descend to flight level 2000', speaker: 'atc' },
        { label: 'ATC \u2192 ACFT (clearance)', text: '{cs}, cleared to land runway 27, wind 270 degrees at 8 kts', speaker: 'atc' }
      ],
      response: { title: 'Your response', text: 'Cleared to land runway 27, {cs}' }
    });
    steps.push({
      phase: 'LANDING',
      location: af,
      icon: '\u{1F6EC}',
      type: 'normal',
      phrases: [
        { label: 'After touchdown', text: af + ', {cs}, on ground', speaker: 'pilot' }
      ]
    });
    steps.push({
      phase: 'TAXI TO PARKING',
      location: af,
      icon: '\u{1F17F}\uFE0F',
      type: 'normal',
      phrases: [
        { label: 'ATC \u2192 ACFT', text: '{cs}, contact ground Alpha, advise vacated', speaker: 'atc' },
        { label: 'ATC \u2192 ACFT (stand)', text: '{cs}, your stand 05', speaker: 'atc' }
      ]
    });
  } else {
    steps.push({
      phase: '\u0417\u0410\u041f\u0420\u041e\u0421 \u041f\u041e\u0421\u0410\u0414\u041a\u0418',
      location: af,
      icon: '\u{1F6EC}',
      type: 'normal',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f (\u0437\u0430 50 \u043a\u043c)', text: af + ', {cs}, \u0432\u043e\u0437\u0432\u0440\u0430\u0442', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442 (\u0432\u0435\u043a\u0442\u043e\u0440\u0435\u043d\u0438\u0435)', text: '{cs}, ' + af + ', \u0438\u0434\u0438\u0442\u0435 \u043a\u0443\u0440\u0441\u043e\u043c 270, \u0441\u043d\u0438\u0436\u0430\u0439\u0442\u0435\u0441\u044c \u0434\u043e 2000 ft', speaker: 'atc' },
        { label: '\u0411\u043e\u0440\u0442', text: af + ', {cs}, \u043a\u0443\u0440\u0441 270 \u0437\u0430\u043d\u044f\u043b', speaker: 'pilot' },
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442 (\u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u0435)', text: '{cs}, ' + af + ', \u043f\u043e\u0441\u0430\u0434\u043a\u0443 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e, \u0412\u041f\u041f 27, \u043f\u043e\u0441\u0430\u0434\u043e\u0447\u043d\u044b\u0439 \u043a\u0443\u0440\u0441 290, QFE 00.00, \u0432\u0435\u0442\u0435\u0440 270, 7 \u0443\u0437\u043b\u043e\u0432', speaker: 'atc' }
      ],
      response: { title: '\u0422\u0432\u043e\u0439 \u043e\u0442\u0432\u0435\u0442', text: '\u041f\u043e\u0441\u0430\u0434\u043a\u0443 \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u043b\u0438, \u0412\u041f\u041f 27, \u043a\u0443\u0440\u0441 290, {cs}' }
    });
    steps.push({
      phase: '\u041f\u041e\u0421\u0410\u0414\u041a\u0410',
      location: af,
      icon: '\u{1F6EC}',
      type: 'normal',
      phrases: [
        { label: '\u041f\u043e\u0441\u043b\u0435 \u043a\u0430\u0441\u0430\u043d\u0438\u044f', text: af + ', {cs}, \u043f\u043e\u0441\u0430\u0434\u043a\u0430', speaker: 'pilot' }
      ]
    });
    steps.push({
      phase: '\u0420\u0423\u041b\u0415\u041d\u0418\u0415 \u041d\u0410 \u0421\u0422\u041e\u042f\u041d\u041a\u0423',
      location: af,
      icon: '\u{1F17F}\uFE0F',
      type: 'normal',
      phrases: [
        { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, \u0432\u044b\u0440\u0443\u043b\u0438\u0432\u0430\u0439\u0442\u0435 \u043d\u0430 \u0410\u043b\u044c\u0444\u0443', speaker: 'atc' },
        { label: '\u0411\u043e\u0440\u0442', text: af + ', {cs}, \u043f\u043e\u043b\u043e\u0441\u0443 \u043e\u0441\u0432\u043e\u0431\u043e\u0434\u0438\u043b', speaker: 'pilot' },
        { label: '\u0420\u041f (\u0441\u0442\u043e\u044f\u043d\u043a\u0430)', text: '{cs}, \u0432\u0430\u0448\u0430 \u0441\u0442\u043e\u044f\u043d\u043a\u0430 05', speaker: 'atc' }
      ]
    });
  }

  return steps;
}

// --- Helicopter Departure ---
function buildHeliDeparture(name, cs, lang) {
  var steps = [];

  if (lang === 'en') {
    steps.push({
      phase: 'HELI STARTUP',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: name + ', {cs}, request start up, parking 8, weather information received', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, ' + name + ', start up approved at parking', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: 'HELI TAXI & HOVER CHECK',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 ATC', text: name + ', {cs}, ready to taxi, runway takeoff from taxiway Charlie', speaker: 'pilot' },
        { label: 'ATC \u2192 ACFT', text: '{cs}, runway 31, taxi to holding point via Charlie', speaker: 'atc' },
        { label: 'ATC (hover)', text: '{cs}, cleared hover check on runway, taxiway Charlie area', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: 'HELI TAKEOFF',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: 'ACFT', text: '{cs}, ready for takeoff', speaker: 'pilot' },
        { label: 'ATC', text: '{cs}, wind calm, cleared takeoff runway 31', speaker: 'atc' }
      ]
    });
  } else {
    steps.push({
      phase: '\u0417\u0410\u041f\u0423\u0421\u041a \u0412\u0415\u0420\u0422\u041e\u041b\u0401\u0422\u0410',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: '\u0417\u0430\u043f\u0443\u0441\u043a', text: name + ', {cs}, \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0437\u0430\u043f\u0443\u0441\u043a, \u0441\u0442\u043e\u044f\u043d\u043a\u0430 8, \u043c\u0435\u0442\u0435\u043e\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u0438\u043c\u0435\u044e', speaker: 'pilot' },
        { label: '\u0417\u0430\u043f\u0443\u0441\u043a (\u043e\u0442\u0432\u0435\u0442)', text: '{cs}, ' + name + ', \u0437\u0430\u043f\u0443\u0441\u043a \u043d\u0430 \u0441\u0442\u043e\u044f\u043d\u043a\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: '\u0420\u0423\u041b\u0415\u041d\u0418\u0415 \u0418 \u041a\u041e\u041d\u0422\u0420\u041e\u041b\u042c\u041d\u041e\u0415 \u0412\u0418\u0421\u0415\u041d\u0418\u0415',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: '\u0420\u0443\u043b\u0435\u043d\u0438\u0435', text: name + ', {cs}, \u0433\u043e\u0442\u043e\u0432 \u043a \u0440\u0443\u043b\u0435\u043d\u0438\u044e, \u0432\u0437\u043b\u0451\u0442 \u043f\u043e-\u0441\u0430\u043c\u043e\u043b\u0451\u0442\u043d\u043e\u043c\u0443, \u0441 \u0412\u041f\u041f \u043e\u0442 \u0420\u0414 Charlie', speaker: 'pilot' },
        { label: '\u0420\u0443\u043b\u0435\u043d\u0438\u0435 (\u043e\u0442\u0432\u0435\u0442)', text: '{cs}, \u0412\u041f\u041f 31, \u043f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e, \u043f\u043e \u0420\u0414 Charlie', speaker: 'atc' },
        { label: '\u041a\u043e\u043d\u0442\u0440\u043e\u043b\u044c\u043d\u043e\u0435 \u0432\u0438\u0441\u0435\u043d\u0438\u0435', text: '{cs}, \u0437\u0430\u043d\u0438\u043c\u0430\u0439\u0442\u0435 \u0412\u041f\u041f 31, \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c\u043d\u043e\u0435 \u0432\u0438\u0441\u0435\u043d\u0438\u0435 \u043d\u0430 \u0412\u041f\u041f, \u0440\u0430\u0439\u043e\u043d \u0420\u0414 Charlie', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: '\u0412\u0417\u041b\u0401\u0422 \u0412\u0415\u0420\u0422\u041e\u041b\u0401\u0422\u0410',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: '\u0412\u0437\u043b\u0451\u0442', text: '{cs}, \u043a \u0432\u0437\u043b\u0451\u0442\u0443 \u0433\u043e\u0442\u043e\u0432', speaker: 'pilot' },
        { label: '\u0412\u0437\u043b\u0451\u0442 (\u043e\u0442\u0432\u0435\u0442)', text: '{cs}, \u0432\u0435\u0442\u0435\u0440 \u0442\u0438\u0445\u043e, \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e \u0432\u0437\u043b\u0451\u0442 \u0412\u041f\u041f 31', speaker: 'atc' }
      ]
    });
  }

  return steps;
}

// --- Helicopter Arrival ---
function buildHeliArrival(name, cs, lang) {
  var steps = [];

  if (lang === 'en') {
    steps.push({
      phase: 'HELI LANDING',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: 'ACFT', text: name + ', {cs}, on final, ready to land, heading 330, taxiway Charlie and runway 31 junction', speaker: 'pilot' },
        { label: 'ATC', text: '{cs}, wind 300 at 3 m/s, cleared to land', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: 'HELI TAXI AFTER',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: 'ACFT', text: '{cs}, request air taxi', speaker: 'pilot' },
        { label: 'ATC', text: '{cs}, parking 8, air taxi approved', speaker: 'atc' }
      ]
    });
  } else {
    steps.push({
      phase: '\u041f\u041e\u0421\u0410\u0414\u041a\u0410 \u0412\u0415\u0420\u0422\u041e\u041b\u0401\u0422\u0410',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: '\u041f\u043e\u0441\u0430\u0434\u043a\u0430', text: name + ', {cs}, \u043d\u0430 \u043f\u0440\u044f\u043c\u043e\u0439, \u0433\u043e\u0442\u043e\u0432 \u043a \u043f\u043e\u0441\u0430\u0434\u043a\u0435, \u043a\u0443\u0440\u0441 330, \u043d\u0430 \u0441\u043e\u043f\u0440\u044f\u0436\u0435\u043d\u0438\u0435 \u0420\u0414 Charlie \u0438 \u0412\u041f\u041f 31', speaker: 'pilot' },
        { label: '\u041f\u043e\u0441\u0430\u0434\u043a\u0430 (\u043e\u0442\u0432\u0435\u0442)', text: '{cs}, \u0432\u0435\u0442\u0435\u0440 300\u00B0 3 \u043c/\u0441, \u043f\u043e\u0441\u0430\u0434\u043a\u0443 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e', speaker: 'atc' }
      ]
    });
    steps.push({
      phase: '\u0420\u0423\u041b\u0415\u041d\u0418\u0415 \u041f\u041e\u0421\u041b\u0415 \u041f\u041e\u0421\u0410\u0414\u041a\u0418',
      location: name,
      icon: '\u{1F681}',
      type: 'normal',
      phrases: [
        { label: '\u0420\u0443\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0441\u043b\u0435', text: '{cs}, \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0440\u0443\u043b\u0435\u043d\u0438\u0435 \u043f\u043e \u0432\u043e\u0437\u0434\u0443\u0445\u0443', speaker: 'pilot' },
        { label: '\u0420\u0443\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0441\u043b\u0435 (\u043e\u0442\u0432\u0435\u0442)', text: '{cs}, \u0441\u0442\u043e\u044f\u043d\u043a\u0430 8, \u0440\u0443\u043b\u0435\u043d\u0438\u0435 \u043f\u043e \u0432\u043e\u0437\u0434\u0443\u0445\u0443 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e', speaker: 'atc' }
      ]
    });
  }

  return steps;
}

// --- Carrier Departure ---
function buildCarrierDeparture(carrierName, cs, lang) {
  var cn = carrierName;
  return [{
    phase: lang === 'en' ? 'CARRIER STARTUP & LAUNCH' : '\u0417\u0410\u041f\u0423\u0421\u041a \u041d\u0410 \u0410\u0412\u0418\u0410\u041d\u041e\u0421\u0426\u0415',
    location: cn,
    icon: '\u{1F6A2}',
    type: 'carrier',
    phrases: [
      { label: 'Ready report', text: 'Tower, {cs}, ready', speaker: 'pilot' },
      { label: 'Weapons ready', text: 'Tower, {cs}, weapon ready', speaker: 'pilot' },
      { label: 'Request start up', text: 'Tower, {cs}, request start up', speaker: 'pilot' },
      { label: 'ATC response', text: '{cs}, Tower, start up approved, catapult 1, wind 270 at 7 kts, QFE 30.00, departure CASE I', speaker: 'atc' },
      { label: 'Catapult & takeoff', text: 'Tower, {cs}, catapult 1, request take-off', speaker: 'pilot' },
      { label: 'ATC response', text: '{cs}, Tower, start-up', speaker: 'atc' },
      { label: 'Airborne', text: '{cs}, airborne', speaker: 'pilot' }
    ]
  }];
}

// --- Carrier Recovery ---
function buildCarrierRecovery(carrierName, cs, acType, lang) {
  var cn = carrierName;
  var typeShort = acType.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);

  return [
    {
      phase: lang === 'en' ? 'STRIKE CHECK-IN' : '\u0427\u0415\u041a-\u0418\u041d STRIKE',
      location: cn,
      icon: '\u{1F4E1}',
      type: 'carrier',
      phrases: [
        { label: 'Strike (50+ nm)', text: 'Strike, {cs}, flight of 1, Mother\'s 250 for 55, Angels 12. State 5.4, no alibis', speaker: 'pilot' },
        { label: 'Strike (response)', text: '{cs}, Sweet/Sweet, Mother is VFR, Case 1. Contact Marshall on Button 2', speaker: 'atc' }
      ]
    },
    {
      phase: lang === 'en' ? 'MARSHALL' : '\u041c\u0410\u0420\u0428\u0410\u041b\u041b',
      location: cn,
      icon: '\u{1F4E1}',
      type: 'carrier',
      phrases: [
        { label: 'Marshall (10+ nm)', text: 'Marshall, {cs}, 250 for 52, Angels 9, State 5.3', speaker: 'pilot' },
        { label: 'Marshall (response)', text: '{cs}, Case 1, BRC is 010, Altimeter 29.92, hold marshall stack angels 2. Report see me at 10', speaker: 'atc' },
        { label: 'At 10 nm', text: '{cs}, see you at 10', speaker: 'pilot' },
        { label: 'At 10 nm (response)', text: '{cs}, switch Tower on Button 1', speaker: 'atc' }
      ]
    },
    {
      phase: lang === 'en' ? 'CARRIER APPROACH & BALL CALL' : '\u0417\u0410\u0425\u041e\u0414 \u0418 BALL CALL',
      location: cn,
      icon: '\u{1F6EC}',
      type: 'carrier',
      phrases: [
        { label: 'LSO (\u00BE mile)', text: '{cs}, commencing', speaker: 'pilot' },
        { label: 'LSO (call the ball)', text: '3/4 mile, call the ball', speaker: 'atc' },
        { label: 'Ball call', text: '{cs}, ' + acType + ', ball, state 4.8', speaker: 'pilot' },
        { label: 'LSO (roger)', text: 'Roger ball', speaker: 'atc' }
      ]
    }
  ];
}

// --- AWACS Check-in ---
function buildAwacsCheckin(name, cs, lang) {
  var awacsName = name || 'Magic';
  if (lang === 'en') {
    return {
      phase: 'AWACS CHECK-IN',
      location: awacsName,
      icon: '\u{1F4E1}',
      type: 'awacs',
      phrases: [
        { label: 'ACFT', text: awacsName + ', {cs}, Bogey Dope', speaker: 'pilot' },
        { label: 'AWACS', text: '{cs}, ' + awacsName + ', BRAA, 257/15, 10 thousand, drag east', speaker: 'atc' }
      ]
    };
  } else {
    return {
      phase: '\u0427\u0415\u041a-\u0418\u041d AWACS',
      location: awacsName,
      icon: '\u{1F4E1}',
      type: 'awacs',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442', text: awacsName + ', {cs}, Bogey Dope', speaker: 'pilot' },
        { label: 'AWACS', text: '{cs}, ' + awacsName + ', BRAA, 257/15, 10 \u0442\u044b\u0441\u044f\u0447, \u0438\u0434\u0451\u0442 \u043d\u0430 \u0432\u043e\u0441\u0442\u043e\u043a', speaker: 'atc' }
      ]
    };
  }
}

// --- Tanker Refuel ---
function buildTankerRefuel(name, cs, lang) {
  var tankerName = name || 'Texaco';
  if (lang === 'en') {
    return {
      phase: 'TANKER REFUEL',
      location: tankerName,
      icon: '\u26FD',
      type: 'normal',
      phrases: [
        { label: 'ACFT \u2192 Tanker', text: tankerName + ', {cs}, request refueling', speaker: 'pilot' },
        { label: 'Tanker', text: '{cs}, ' + tankerName + ', cleared to contact, left wing', speaker: 'atc' },
        { label: 'ACFT (done)', text: tankerName + ', {cs}, refueling complete, departing', speaker: 'pilot' }
      ]
    };
  } else {
    return {
      phase: '\u0414\u041e\u0417\u0410\u041f\u0420\u0410\u0412\u041a\u0410 \u041e\u0422 \u0422\u0410\u041d\u041a\u0415\u0420\u0410',
      location: tankerName,
      icon: '\u26FD',
      type: 'normal',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 \u0422\u0430\u043d\u043a\u0435\u0440', text: tankerName + ', {cs}, \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u044e \u0434\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0443', speaker: 'pilot' },
        { label: '\u0422\u0430\u043d\u043a\u0435\u0440', text: '{cs}, ' + tankerName + ', \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u044e \u0441\u0442\u044b\u043a\u043e\u0432\u043a\u0443, \u043b\u0435\u0432\u043e\u0435 \u043a\u0440\u044b\u043b\u043e', speaker: 'atc' },
        { label: '\u0411\u043e\u0440\u0442 (\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0435)', text: tankerName + ', {cs}, \u0434\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430, \u0443\u0445\u043e\u0436\u0443', speaker: 'pilot' }
      ]
    };
  }
}

// --- Work Zone ---
function buildWorkZone(name, cs, lang) {
  var zoneName = name || 'AO';
  if (lang === 'en') {
    return {
      phase: 'WORK ZONE',
      location: zoneName,
      icon: '\u{1F3AF}',
      type: 'awacs',
      phrases: [
        { label: 'ACFT \u2192 AWACS', text: 'Magic, {cs}, on station ' + zoneName + ', ready for tasking', speaker: 'pilot' },
        { label: 'AWACS', text: '{cs}, Magic, roger, hold ' + zoneName + ', report when complete', speaker: 'atc' },
        { label: 'ACFT (complete)', text: 'Magic, {cs}, task complete, RTB', speaker: 'pilot' }
      ]
    };
  } else {
    return {
      phase: '\u0417\u041e\u041d\u0410 \u0420\u0410\u0411\u041e\u0422\u042b',
      location: zoneName,
      icon: '\u{1F3AF}',
      type: 'awacs',
      phrases: [
        { label: '\u0411\u043e\u0440\u0442 \u2192 AWACS', text: 'Magic, {cs}, \u043d\u0430 \u043f\u043e\u0437\u0438\u0446\u0438\u0438 ' + zoneName + ', \u0433\u043e\u0442\u043e\u0432 \u043a \u0440\u0430\u0431\u043e\u0442\u0435', speaker: 'pilot' },
        { label: 'AWACS', text: '{cs}, Magic, \u043f\u0440\u0438\u043d\u044f\u043b, \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439 ' + zoneName + ', \u0434\u043e\u043b\u043e\u0436\u0438 \u043f\u043e \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0438', speaker: 'atc' },
        { label: '\u0411\u043e\u0440\u0442 (\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0435)', text: 'Magic, {cs}, \u0437\u0430\u0434\u0430\u0447\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0430, \u0432\u043e\u0437\u0432\u0440\u0430\u0442', speaker: 'pilot' }
      ]
    };
  }
}

// --- Emergency ---
function buildEmergency(type, cs, nearestAirfield, lang) {
  var af = nearestAirfield || '\u0421\u0435\u043d\u0430\u043a\u0438';
  var emergencySteps = {
    'go-around': {
      phase: lang === 'en' ? 'GO AROUND' : '\u0423\u0425\u041e\u0414 \u041d\u0410 \u0412\u0422\u041e\u0420\u041e\u0419 \u041a\u0420\u0423\u0413',
      icon: '\u{1F504}',
      type: 'emergency',
      phrases: lang === 'en'
        ? [
            { label: 'ATC \u2192 ACFT', text: '{cs}, go around', speaker: 'atc' },
            { label: 'Your response', text: 'Going around, {cs}', speaker: 'pilot' }
          ]
        : [
            { label: '\u0420\u041f \u2192 \u0411\u043e\u0440\u0442', text: '{cs}, ' + af + ', \u043f\u043e\u0441\u0430\u0434\u043a\u0443 \u0437\u0430\u043f\u0440\u0435\u0449\u0430\u044e, \u0443\u0445\u043e\u0434\u0438\u0442\u0435 \u043d\u0430 \u0432\u0442\u043e\u0440\u043e\u0439 \u043a\u0440\u0443\u0433', speaker: 'atc' }
          ]
    },
    'emergency-land': {
      phase: lang === 'en' ? 'EMERGENCY LANDING' : '\u042d\u041a\u0421\u0422\u0420\u0415\u041d\u041d\u0410\u042f \u041f\u041e\u0421\u0410\u0414\u041a\u0410',
      icon: '\u{1F6A8}',
      type: 'emergency',
      phrases: lang === 'en'
        ? [{ label: 'ACFT \u2192 ATC', text: 'MAYDAY MAYDAY MAYDAY, {cs}, request priority landing', speaker: 'pilot' }]
        : [{ label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u044e \u044d\u043a\u0441\u0442\u0440\u0435\u043d\u043d\u0443\u044e', speaker: 'pilot' }]
    },
    'instrument-fail': {
      phase: lang === 'en' ? 'INSTRUMENT FAILURE' : '\u041e\u0422\u041a\u0410\u0417 \u041f\u0420\u0418\u0411\u041e\u0420\u041e\u0412',
      icon: '\u26A0\uFE0F',
      type: 'emergency',
      phrases: lang === 'en'
        ? [{ label: 'ACFT \u2192 ATC', text: 'MAYDAY MAYDAY MAYDAY, {cs}, total instruments failure, request vectors to nearest', speaker: 'pilot' }]
        : [{ label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u043f\u043e\u043b\u043d\u044b\u0439 \u043e\u0442\u043a\u0430\u0437 \u043f\u0440\u0438\u0431\u043e\u0440\u043e\u0432, \u043f\u0440\u043e\u0448\u0443 \u0432\u0435\u043a\u0442\u043e\u0440\u0435\u043d\u0438\u0435', speaker: 'pilot' }]
    },
    'fire': {
      phase: lang === 'en' ? 'ENGINE FIRE' : '\u041f\u041e\u0416\u0410\u0420',
      icon: '\u{1F525}',
      type: 'emergency',
      phrases: lang === 'en'
        ? [{ label: 'ACFT \u2192 ATC', text: '{cs}, engine on fire, making forced landing ' + af, speaker: 'pilot' }]
        : [{ label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u043f\u043e\u0436\u0430\u0440 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u0435\u0439, \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u044e \u044d\u043a\u0441\u0442\u0440\u0435\u043d\u043d\u0443\u044e \u043f\u043e\u0441\u0430\u0434\u043a\u0443', speaker: 'pilot' }]
    },
    'engine-fail': {
      phase: lang === 'en' ? 'ENGINE FAILURE' : '\u041e\u0422\u041a\u0410\u0417 \u0414\u0412\u0418\u0413\u0410\u0422\u0415\u041b\u042f',
      icon: '\u2699\uFE0F',
      type: 'emergency',
      phrases: lang === 'en'
        ? [{ label: 'ACFT \u2192 ATC', text: 'MAYDAY MAYDAY MAYDAY, {cs}, engine failure, 1800 meters, 317 knots', speaker: 'pilot' }]
        : [{ label: '\u0411\u043e\u0440\u0442 \u2192 \u0420\u041f', text: af + ', {cs}, \u043e\u0442\u043a\u0430\u0437 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f, \u0432\u044b\u0441\u043e\u0442\u0430 1800 \u043c\u0435\u0442\u0440\u043e\u0432, 317 \u0443\u0437\u043b\u043e\u0432', speaker: 'pilot' }]
    },
    'decompression': {
      phase: lang === 'en' ? 'DECOMPRESSION' : '\u0420\u0410\u0417\u0413\u0415\u0420\u041c\u0415\u0422\u0418\u0417\u0410\u0426\u0418\u042f',
      icon: '\u{1F4A8}',
      type: 'emergency',
      phrases: lang === 'en'
        ? [{ label: 'ACFT', text: '{cs}, EMERGENCY DESCENT, explosive decompression', speaker: 'pilot' }]
        : [{ label: '\u0411\u043e\u0440\u0442', text: '{cs}, \u0430\u0432\u0430\u0440\u0438\u0439\u043d\u043e\u0435 \u0441\u043d\u0438\u0436\u0435\u043d\u0438\u0435, \u043f\u043e\u043b\u043d\u0430\u044f \u0440\u0430\u0437\u0433\u0435\u0440\u043c\u0435\u0442\u0438\u0437\u0430\u0446\u0438\u044f', speaker: 'pilot' }]
    },
    'low-fuel': {
      phase: lang === 'en' ? 'LOW FUEL' : '\u041c\u0410\u041b\u041e \u0422\u041e\u041f\u041b\u0418\u0412\u0410',
      icon: '\u26FD',
      type: 'emergency',
      phrases: lang === 'en'
        ? [
            { label: 'ACFT \u2192 ATC', text: af + ', {cs}, low on fuel', speaker: 'pilot' },
            { label: 'ATC', text: '{cs}, ' + af + ', do you wish to declare an emergency?', speaker: 'atc' },
            { label: 'ACFT', text: af + ', {cs}, declare emergency', speaker: 'pilot' }
          ]
        : [
            { label: '\u0411\u043e\u0440\u0442', text: af + ', {cs}, \u043d\u0438\u0437\u043a\u0438\u0439 \u043e\u0441\u0442\u0430\u0442\u043e\u043a \u0442\u043e\u043f\u043b\u0438\u0432\u0430', speaker: 'pilot' },
            { label: '\u0411\u043e\u0440\u0442 (\u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0435)', text: af + ', {cs}, \u043e\u0431\u044a\u044f\u0432\u043b\u044f\u044e \u0430\u0432\u0430\u0440\u0438\u0439\u043d\u0443\u044e \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e', speaker: 'pilot' },
            { label: '\u0420\u041f', text: '{cs}, \u0434\u043e\u043b\u043e\u0436\u0438\u0442\u0435 \u043e\u0441\u0442\u0430\u0442\u043e\u043a \u0442\u043e\u043f\u043b\u0438\u0432\u0430', speaker: 'atc' }
          ]
    }
  };

  var em = emergencySteps[type];
  if (!em) return null;

  return {
    phase: em.phase,
    location: af,
    icon: em.icon,
    type: em.type,
    phrases: em.phrases//,
    // response: em.response
  };
}

function renderTextSim(text, cs) {
  return text.replace(/\{cs\}/g, '<span class="sim-cs">' + escapeHtml(cs) + '</span>');
}

// --- Render Simulation Page ---
function renderSimPage(steps) {
  simCurrentStep = 0;
  simTotalSteps = steps.length;

  var page = document.getElementById('simPage');
  page.innerHTML = '';
  page.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Header
  var header = document.createElement('div');
  header.className = 'sim-page-header';
  header.innerHTML =
    '<div class="sim-page-title">' +
      '<span class="sim-page-icon">\u{1F399}\uFE0F</span>' +
      '<span>' + (document.body.classList.contains('lang-en') ? 'Flight Simulation' : '\u0421\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u044f \u043f\u043e\u043b\u0451\u0442\u0430') + ': <strong>' + escapeHtml(simConfig.callsign) + '</strong></span>' +
    '</div>' +
    '<div class="sim-page-controls">' +
      '<span class="sim-progress" id="simProgress">1 / ' + simTotalSteps + '</span>' +
      '<button class="sim-close-btn" onclick="closeSimPage()">\u2715</button>' +
    '</div>';
  page.appendChild(header);

  // Timeline
  var timeline = document.createElement('div');
  timeline.className = 'sim-timeline';
  timeline.id = 'simTimeline';

  steps.forEach(function(step, idx) {
    var stepEl = document.createElement('div');
    stepEl.className = 'sim-step' + (idx === 0 ? ' active' : '') + (step.type === 'emergency' ? ' emergency' : '') + (step.type === 'carrier' ? ' carrier' : '') + (step.type === 'awacs' ? ' awacs' : '');
    stepEl.id = 'simStep_' + idx;
    stepEl.dataset.index = idx;

    // Step header
    var stepHeader = document.createElement('div');
    stepHeader.className = 'sim-step-header';
    stepHeader.innerHTML =
      '<div class="sim-step-number">' + step.icon + ' ' + (document.body.classList.contains('lang-en') ? 'STEP' : 'ШАГ') + ' ' + step.number + '</div>' +
      '<div class="sim-step-phase">' + step.phase + '</div>' +
      '<div class="sim-step-location">' + escapeHtml(step.location) + '</div>';
    stepEl.appendChild(stepHeader);

    // Step body
    var stepBody = document.createElement('div');
    stepBody.className = 'sim-step-body';

    // Note (for waypoints without radio)
    if (step.note) {
      var noteDiv = document.createElement('div');
      noteDiv.className = 'sim-step-note';
      noteDiv.textContent = step.note;
      stepBody.appendChild(noteDiv);
    }

    // Phrases
    if (step.phrases && step.phrases.length > 0) {
      step.phrases.forEach(function(phrase) {
        var phraseBlock = document.createElement('div');
        phraseBlock.className = 'phrase-block' + (step.type === 'emergency' ? ' emergency-phrase' : '') + (step.type === 'carrier' ? ' carrier-phrase' : '') + (step.type === 'awacs' ? ' awacs-phrase' : '');
        phraseBlock.innerHTML =
          '<div class="phrase-label">' + phrase.label + '</div>' +
          '<div class="phrase-text' + (phrase.speaker === 'atc' ? ' rp' : '') + '">' +
          renderText(phrase.text.replace(/\{cs\}/g, '{cs}')) + '</div>';
        stepBody.appendChild(phraseBlock);
      });
    }

    // Response
    if (step.response) {
      var respBlock = document.createElement('div');
      respBlock.className = 'response-block';
      respBlock.innerHTML =
        '<div class="response-title">' + step.response.title + '</div>' +
        '<div class="response-text">' + renderText(step.response.text) + '</div>';
      stepBody.appendChild(respBlock);
    }

    stepEl.appendChild(stepBody);

    // Navigation buttons inside step
    var navDiv = document.createElement('div');
    navDiv.className = 'sim-step-nav';
    if (idx > 0) {
      navDiv.innerHTML += '<button class="sim-nav-btn prev" onclick="goToSimStep(' + (idx - 1) + ')">\u2190 ' + (document.body.classList.contains('lang-en') ? 'Previous' : '\u041d\u0430\u0437\u0430\u0434') + '</button>';
    }
    if (idx < steps.length - 1) {
      navDiv.innerHTML += '<button class="sim-nav-btn next" onclick="goToSimStep(' + (idx + 1) + ')">' + (document.body.classList.contains('lang-en') ? 'Next' : '\u0414\u0430\u043b\u0435\u0435') + ' \u2192</button>';
    } else {
      navDiv.innerHTML += '<button class="sim-nav-btn finish" onclick="closeSimPage()">' + (document.body.classList.contains('lang-en') ? 'Finish' : '\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c') + ' \u2714</button>';
    }
    stepEl.appendChild(navDiv);

    timeline.appendChild(stepEl);
  });

  page.appendChild(timeline);
}

function goToSimStep(idx) {
  simCurrentStep = idx;

  // Update active class
  var allSteps = document.querySelectorAll('.sim-step');
  allSteps.forEach(function(el, i) {
    el.classList.toggle('active', i === idx);
    el.classList.toggle('done', i < idx);
  });

  // Scroll to step
  var targetStep = document.getElementById('simStep_' + idx);
  if (targetStep) {
    targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Update progress
  var progress = document.getElementById('simProgress');
  if (progress) {
    progress.textContent = (idx + 1) + ' / ' + simTotalSteps;
  }
}

function closeSimPage() {
  var page = document.getElementById('simPage');
  page.classList.remove('active');
  page.innerHTML = '';
  document.body.style.overflow = '';
}
