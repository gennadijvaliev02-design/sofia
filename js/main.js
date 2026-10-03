/**
 * Sophia Sots — Cosmetology & Aesthetic Care
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPriceTabs();
  initPriceAccordions();
  initBookingForm();
});

/* ---------------- Mobile Navigation ---------------- */
function initMobileNav() {
  const menuButton = document.querySelector('.menu-toggle');
  const navlinks = document.querySelector('.navlinks');

  if (!menuButton || !navlinks) return;

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navlinks.classList.toggle('open', !isOpen);
  });

  navlinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navlinks.classList.remove('open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !navlinks.contains(e.target) && navlinks.classList.contains('open')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navlinks.classList.remove('open');
    }
  });
}

/* ---------------- Price Tabs ---------------- */
function initPriceTabs() {
  const tabs = Array.from(document.querySelectorAll('.price-tab'));
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const isSelected = t === tab;
        t.setAttribute('aria-selected', String(isSelected));
        const panelId = t.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.toggle('active', isSelected);
        }
      });
    });
  });
}

/* ---------------- Price Accordions ---------------- */
function initPriceAccordions() {
  // Accordions for Care & Procedures
  const priceGroup = document.querySelector('#panel-care .price-group');
  if (priceGroup) {
    const nodes = Array.from(priceGroup.children);
    priceGroup.innerHTML = '';
    let current = null;

    nodes.forEach(node => {
      if (node.tagName === 'H3') {
        const section = document.createElement('section');
        section.className = 'price-accordion';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'price-accordion-toggle';
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `<span>${node.textContent}</span><span class="price-plus" aria-hidden="true"></span>`;

        const panel = document.createElement('div');
        panel.className = 'price-accordion-panel';

        const grid = document.createElement('div');
        grid.className = 'price-accordion-grid';
        panel.appendChild(grid);

        section.append(button, panel);
        priceGroup.appendChild(section);

        current = { section, button, panel, grid };

        button.addEventListener('click', () => {
          const isOpen = section.classList.toggle('open');
          button.setAttribute('aria-expanded', String(isOpen));
        });
      } else if (current) {
        current.grid.appendChild(node);
      }
    });
  }

  // Accordion for Laser Depilation
  const laserPanel = document.querySelector('#panel-laser .laser-columns');
  if (laserPanel) {
    const holder = document.createElement('section');
    holder.className = 'price-accordion';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'price-accordion-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span>Зоны лазерной эпиляции</span><span class="price-plus" aria-hidden="true"></span>';

    const panel = document.createElement('div');
    panel.className = 'price-accordion-panel';

    laserPanel.parentNode.insertBefore(holder, laserPanel);
    holder.append(button, panel);
    panel.appendChild(laserPanel);

    button.addEventListener('click', () => {
      const isOpen = holder.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  }
}

/* ---------------- Booking Form & WhatsApp Integration ---------------- */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const steps = Array.from(document.querySelectorAll('.form-step'));
  const stepper = document.querySelector('.stepper');
  const nextBtn = form.querySelector('[data-next]');
  const backBtn = form.querySelector('[data-back]');
  const successBox = document.querySelector('.success');
  const dateInput = document.getElementById('client-date');
  const phoneInput = document.getElementById('client-phone');
  const summaryBox = document.getElementById('summary');
  const waSendBtn = document.getElementById('wa-send-btn');
  const resetBtn = document.getElementById('new-booking-btn');

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Phone input formatting (+7 (XXX) XXX-XX-XX)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.startsWith('7') || val.startsWith('8')) {
        val = val.substring(1);
      }
      val = val.substring(0, 10);

      let formatted = '+7';
      if (val.length > 0) formatted += ` (${val.substring(0, 3)}`;
      if (val.length >= 3) formatted += `) ${val.substring(3, 6)}`;
      if (val.length >= 6) formatted += `-${val.substring(6, 8)}`;
      if (val.length >= 8) formatted += `-${val.substring(8, 10)}`;

      e.target.value = formatted;
    });
  }

  function showStep(n) {
    steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
    if (stepper) {
      Array.from(stepper.children).forEach((indicator, i) => {
        indicator.classList.toggle('on', i < n);
      });
      stepper.setAttribute('aria-label', `Шаг ${n} из 2`);
    }
    const heading = document.querySelector(`[data-step="${n}"] h3`);
    if (heading) heading.focus?.();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const selectedService = form.querySelector('input[name="service"]:checked');
      if (!selectedService) {
        const firstRadio = form.querySelector('input[name="service"]');
        if (firstRadio) firstRadio.focus();
        return;
      }
      showStep(2);
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => showStep(1));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const service = data.get('service') || 'Консультация';
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const rawDate = data.get('date') || '';
    const time = data.get('time') || 'по согласованию';

    // Format date in Russian (e.g. 15 октября 2026)
    let formattedDate = rawDate;
    if (rawDate) {
      const [year, month, day] = rawDate.split('-');
      const dateObj = new Date(year, month - 1, day);
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    }

    // Build WhatsApp message
    const messageLines = [
      `Здравствуйте, София! Меня зовут ${name}.`,
      `Хочу записаться на прием в Кисловодске.`,
      `— Процедура: ${service}`,
      `— Желаемая дата: ${formattedDate}`,
      `— Время: ${time}`,
      `— Мой контактный номер: ${phone}`
    ];
    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/79286966000?text=${encodedMessage}`;

    // Update receipt summary on page
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="booking-receipt">
          <p><span>Процедура:</span> <strong>${service}</strong></p>
          <p><span>Дата и время:</span> <strong>${formattedDate} (${time})</strong></p>
          <p><span>Клиент:</span> <strong>${name}</strong></p>
          <p><span>Телефон:</span> <strong>${phone}</strong></p>
        </div>
      `;
    }

    // Set WhatsApp link for manual button
    if (waSendBtn) {
      waSendBtn.href = whatsappUrl;
    }

    // Switch view
    form.style.display = 'none';
    if (stepper) stepper.style.display = 'none';
    if (successBox) successBox.style.display = 'block';

    // Auto-open WhatsApp chat in a new tab
    const waWindow = window.open(whatsappUrl, '_blank');
    if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
      // Popup blocked, user can click waSendBtn
      console.log('Popup blocked; please use direct button');
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (stepper) stepper.style.display = 'flex';
      if (successBox) successBox.style.display = 'none';
      showStep(1);
    });
  }
}
