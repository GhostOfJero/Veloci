/* ============================================================
   VELOCI — Urban Bike Rental
   app.js
   ============================================================ */

'use strict';

/* ─── DATA ─────────────────────────────────────────────────── */

const bikes = [
  {
    id:     1,
    name:   'METRO CRUISER',
    type:   'city',
    emoji:  '🚲',
    colors: ['#C8F135', '#1CAAFF', '#FF4D1C', '#F5F5F0'],
    price:  15,
    range:  'N/A',
    speed:  '25 km/h',
    weight: '14 kg',
    avail:  'available',
    tag:    'Most Popular',
  },
  {
    id:     2,
    name:   'VOLT RIDER',
    type:   'electric',
    emoji:  '⚡',
    colors: ['#0A0A0A', '#C8F135', '#1CAAFF'],
    price:  20,
    range:  '80 km',
    speed:  '32 km/h',
    weight: '22 kg',
    avail:  'available',
    tag:    'Electric',
  },
  {
    id:     3,
    name:   'TRAIL BLAZER',
    type:   'sport',
    emoji:  '🏔️',
    colors: ['#FF4D1C', '#1C1C1C', '#C8F135'],
    price:  18,
    range:  'N/A',
    speed:  '28 km/h',
    weight: '16 kg',
    avail:  'limited',
    tag:    'Sport',
  },
  {
    id:     4,
    name:   'CARGO MAX',
    type:   'cargo',
    emoji:  '📦',
    colors: ['#1CAAFF', '#F5F5F0', '#C8F135'],
    price:  25,
    range:  '60 km',
    speed:  '22 km/h',
    weight: '35 kg',
    avail:  'available',
    tag:    'Cargo',
  },
  {
    id:     5,
    name:   'NIGHT OWL',
    type:   'electric',
    emoji:  '🌙',
    colors: ['#0A0A0A', '#C8F135', '#9333EA'],
    price:  22,
    range:  '70 km',
    speed:  '30 km/h',
    weight: '24 kg',
    avail:  'available',
    tag:    'Electric',
  },
  {
    id:     6,
    name:   'SPRINT X',
    type:   'sport',
    emoji:  '🏁',
    colors: ['#FF4D1C', '#C8F135', '#F5F5F0'],
    price:  19,
    range:  'N/A',
    speed:  '35 km/h',
    weight: '12 kg',
    avail:  'unavailable',
    tag:    'Sport',
  },
];

const locations = [
  { name: 'Central Park Hub',    address: 'Central Park W & 72nd St',        bikes: 18, icon: '🌳' },
  { name: 'Midtown East Hub',    address: 'Park Ave & 42nd St',              bikes: 12, icon: '🏙️' },
  { name: 'Brooklyn Bridge Hub', address: 'Brooklyn Bridge Park, Pier 2',    bikes:  9, icon: '🌉' },
  { name: 'Times Square Hub',    address: 'Broadway & 46th St',              bikes: 15, icon: '✨' },
  { name: 'Lower East Hub',      address: 'Delancey St & Essex St',          bikes:  7, icon: '🎸' },
];

const chargingData = [
  { hub: 'Central Park',    level: 95, color: '#22C55E', status: 'Optimal',  bikes: 18 },
  { hub: 'Midtown East',    level: 82, color: '#22C55E', status: 'Good',     bikes: 12 },
  { hub: 'Brooklyn Bridge', level: 67, color: '#F59E0B', status: 'Charging', bikes:  9 },
  { hub: 'Times Square',    level: 88, color: '#22C55E', status: 'Good',     bikes: 15 },
  { hub: 'Lower East',      level: 45, color: '#F59E0B', status: 'Low',      bikes:  7 },
  { hub: 'SoHo Hub',        level: 91, color: '#22C55E', status: 'Optimal',  bikes: 11 },
  { hub: 'Williamsburg',    level: 73, color: '#22C55E', status: 'Good',     bikes:  8 },
  { hub: 'Harlem North',    level: 30, color: '#EF4444', status: 'Critical', bikes:  6 },
];

const reviews = [
  {
    stars:   5,
    text:    'Rented the Volt Rider for a weekend trip across the city. Seamless experience from pickup to return. The battery lasted way longer than expected!',
    name:    'Sarah K.',
    role:    'Weekend Rider',
    initial: 'S',
  },
  {
    stars:   5,
    text:    'The app is buttery smooth. Unlocked my bike in 8 seconds flat. The Central Park hub is always stocked and the bikes are spotless.',
    name:    'Marcus T.',
    role:    'Daily Commuter',
    initial: 'M',
  },
  {
    stars:   4,
    text:    'Cargo Max was perfect for my grocery run. A bit heavy to maneuver but the storage capacity is unbeatable. Will rent again for sure.',
    name:    'Priya L.',
    role:    'Urban Explorer',
    initial: 'P',
  },
  {
    stars:   5,
    text:    'Sprint X is absolutely wild. Zero hesitation, climbs hills like nothing. VELOCI bikes feel premium — they clearly invest in quality.',
    name:    'David R.',
    role:    'Fitness Enthusiast',
    initial: 'D',
  },
  {
    stars:   5,
    text:    'As a tourist, this service was a lifesaver. The map and hub system made navigation so easy. Found 3 hubs within walking distance of my hotel!',
    name:    'Emma W.',
    role:    'Tourist',
    initial: 'E',
  },
  {
    stars:   4,
    text:    'Night Owl is perfect for evening rides. The light system is super bright and safety features are top notch. Slightly pricey but worth it.',
    name:    'Jordan A.',
    role:    'Night Rider',
    initial: 'J',
  },
];

/* ─── RENDER: BIKES ─────────────────────────────────────────── */

function renderBikes(filter = 'all') {
  const grid     = document.getElementById('bikesGrid');
  const filtered = filter === 'all' ? bikes : bikes.filter(b => b.type === filter);

  grid.innerHTML = filtered.map(b => `
    <div class="bike-card reveal" onclick="openModal(${b.id})">
      <div class="bike-card-img" style="background:linear-gradient(135deg,#1C1C1C,#2E2E2E)">
        <span class="bike-emoji">${b.emoji}</span>
        <div class="bike-badge">
          <span class="avail-dot ${b.avail}"></span>
          ${b.avail === 'available' ? 'Available' : b.avail === 'limited' ? 'Limited' : 'Unavailable'}
        </div>
        <div class="color-swatches">
          ${b.colors.map((c, i) => `
            <div
              class="swatch ${i === 0 ? 'active' : ''}"
              style="background:${c}"
              onclick="event.stopPropagation(); swapSwatch(this)"
            ></div>
          `).join('')}
        </div>
      </div>
      <div class="bike-card-body">
        <div class="bike-name">${b.name}</div>
        <div class="bike-type">${b.type} • ${b.tag}</div>
        <div class="bike-specs">
          <div class="bike-spec"><strong>${b.speed}</strong>Top Speed</div>
          <div class="bike-spec"><strong>${b.range}</strong>Range</div>
          <div class="bike-spec"><strong>${b.weight}</strong>Weight</div>
        </div>
        <div class="bike-footer">
          <div class="bike-price">$${b.price}<sub>/hr</sub></div>
          <button class="btn-rent" onclick="event.stopPropagation(); quickRent(${b.id})">Rent</button>
        </div>
      </div>
    </div>
  `).join('');

  initReveal();
}

function filterBikes(filter, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderBikes(filter);
}

function swapSwatch(el) {
  el.closest('.color-swatches').querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const color = el.style.background;
  el.closest('.bike-card-img').style.background = `linear-gradient(135deg, ${color}22, #1C1C1C)`;
}

/* ─── RENDER: LOCATIONS ─────────────────────────────────────── */

function renderLocations() {
  document.getElementById('locationList').innerHTML = locations.map((l, i) => `
    <div class="location-item ${i === 0 ? 'active' : ''}" onclick="setActiveLocation(this)">
      <div class="loc-icon">${l.icon}</div>
      <div class="loc-info">
        <h4>${l.name}</h4>
        <p>${l.address}</p>
      </div>
      <div class="loc-status">${l.bikes} bikes</div>
    </div>
  `).join('');
}

function setActiveLocation(el) {
  document.querySelectorAll('.location-item').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
}

/* ─── RENDER: CHARGING ──────────────────────────────────────── */

function renderCharging() {
  document.getElementById('chargingGrid').innerHTML = chargingData.map(c => `
    <div class="charge-card reveal">
      <div class="charge-glow" style="background:${c.color}"></div>
      <div class="charge-level" style="color:${c.color}">${c.level}%</div>
      <div class="charge-bar">
        <div class="charge-fill" style="width:0%;background:${c.color}" data-width="${c.level}%"></div>
      </div>
      <h4>${c.hub}</h4>
      <p>${c.status} · ${c.bikes} bikes available</p>
    </div>
  `).join('');
}

/* ─── RENDER: REVIEWS ───────────────────────────────────────── */

function renderReviews() {
  document.getElementById('reviewsGrid').innerHTML = reviews.map(r => `
    <div class="review-card reveal">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="reviewer">
        <div class="reviewer-avatar">${r.initial}</div>
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="reviewer-role">${r.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─── MODAL ─────────────────────────────────────────────────── */

function openModal(id) {
  const bike = bikes.find(b => b.id === id);

  document.getElementById('modalTitle').textContent = bike.name;

  document.getElementById('modalImg').innerHTML =
    `<span style="font-size:6rem">${bike.emoji}</span>`;

  document.getElementById('modalSpecs').innerHTML = `
    <div class="modal-spec"><strong>${bike.speed}</strong><small>Top Speed</small></div>
    <div class="modal-spec"><strong>${bike.range}</strong><small>Range</small></div>
    <div class="modal-spec"><strong>${bike.weight}</strong><small>Weight</small></div>
  `;

  document.getElementById('modalColors').innerHTML = bike.colors.map((c, i) => `
    <div
      class="color-opt ${i === 0 ? 'selected' : ''}"
      style="background:${c}"
      onclick="selectColor(this)"
    ></div>
  `).join('');

  document.getElementById('modalPrice').textContent      = `$${bike.price}/hr`;
  document.getElementById('modalDailyPrice').textContent = `$${(bike.price * 8 * 0.8).toFixed(2)}/day`;

  document.getElementById('bikeModal').classList.add('open');
}

function closeModal() {
  document.getElementById('bikeModal').classList.remove('open');
}

function selectColor(el) {
  el.parentElement.querySelectorAll('.color-opt').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('modalImg').style.background =
    `linear-gradient(135deg, ${el.style.background}33, #1C1C1C)`;
}

function rentFromModal() {
  closeModal();
  showToast('🚲 Redirecting to booking...');
  document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
}

/* ─── BOOKING / PRICE ───────────────────────────────────────── */

function updatePrice() {
  const rate     = parseInt(document.getElementById('bikeTypeSelect').value);
  const hours    = parseInt(document.getElementById('durationSelect').value);
  const subtotal = rate * hours;

  document.getElementById('priceBase').textContent  = `$${subtotal.toFixed(2)}`;
  document.getElementById('priceTotal').textContent = `$${(subtotal + 2.5).toFixed(2)}`;
}

function bookNow() {
  showToast('🎉 Booking confirmed! Check your email.');
}

function quickRent(id) {
  const bike = bikes.find(b => b.id === id);
  if (bike.avail === 'unavailable') {
    showToast('❌ This bike is currently unavailable.');
    return;
  }
  document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => showToast(`✅ ${bike.name} selected!`), 600);
}

/* ─── TOAST ─────────────────────────────────────────────────── */

function showToast(msg) {
  const toast    = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

/* ─── COUNTER ANIMATION ─────────────────────────────────────── */

function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target   = parseInt(el.dataset.target);
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ─── PARALLAX ──────────────────────────────────────────────── */

function handleParallax() {
  const scrollY  = window.scrollY;
  const heroBg   = document.querySelector('.hero-bg');
  const heroGrid = document.querySelector('.hero-grid');
  const heroTitle = document.querySelector('.hero-title');

  if (heroBg)    heroBg.style.transform    = `translateY(${scrollY * 0.3}px)`;
  if (heroGrid)  heroGrid.style.transform  = `translateY(${scrollY * 0.15}px)`;
  if (heroTitle) heroTitle.style.transform = `translateY(${scrollY * 0.08}px)`;
}

/* ─── CHARGE BAR TRIGGER ────────────────────────────────────── */

function animateChargeBars() {
  document.querySelectorAll('.charge-fill').forEach(el => {
    const rect = el.closest('.charge-card').getBoundingClientRect();
    if (rect.top < window.innerHeight && el.style.width === '0%') {
      el.style.width = el.dataset.width;
    }
  });
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */

let cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  document.getElementById('cursor').style.left = cursorX + 'px';
  document.getElementById('cursor').style.top  = cursorY + 'px';
});

function animateCursorRing() {
  ringX += (cursorX - ringX) * 0.12;
  ringY += (cursorY - ringY) * 0.12;
  const ring = document.getElementById('cursorRing');
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}

animateCursorRing();

function attachCursorHovers() {
  document.querySelectorAll('button, a, .bike-card, .location-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.getElementById('cursor').style.transform = 'translate(-50%,-50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      document.getElementById('cursor').style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ─── NAVBAR SCROLL ─────────────────────────────────────────── */

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  handleParallax();
  animateChargeBars();
});

/* ─── MOBILE NAV ────────────────────────────────────────────── */

function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

/* ─── LOADER ────────────────────────────────────────────────── */

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    setTimeout(animateCounters, 500);
  }, 2000);
});

/* ─── MODAL OVERLAY CLOSE ───────────────────────────────────── */

document.getElementById('bikeModal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

/* ─── INIT ──────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic content
  renderBikes('all');
  renderLocations();
  renderCharging();
  renderReviews();

  // Scroll reveal
  initReveal();
  setTimeout(initReveal, 100);

  // Set tomorrow's date as default in booking form
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('dateInput').value = tomorrow.toISOString().split('T')[0];

  // Attach cursor hover effects
  attachCursorHovers();
});
