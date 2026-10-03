# ✨ Sophia Sots — Cosmetology & Aesthetic Care

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-success?style=for-the-badge&logo=githubpages&logoColor=white)](https://gennadijvaliev02-design.github.io/sofia/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile--First-blueviolet?style=for-the-badge)](https://gennadijvaliev02-design.github.io/sofia/)

> Премиальный веб-сайт и интерактивная система онлайн-записи для практикующего косметолога Софии Сотс (г. Кисловодск).  
> Разработан с упором на эстетичную эстетику «тихой роскоши» (Quiet Luxury), молниеносную скорость загрузки и удобство записи клиентов на мобильных устройствах.

🔗 **Демо / Рабочий сайт**: [https://gennadijvaliev02-design.github.io/sofia/](https://gennadijvaliev02-design.github.io/sofia/)

---

## 💎 Особенности проекта (Key Features)

- **Авторский дизайн в стиле Warm Minimal & Editorial**:
  - Гармоничная теплая палитра (`#f4efe7`, `#493328`, `#a67768`).
  - Классическая типографика с засечками (Editorial Serif) в сочетании с чистым гротеском для идеальной читаемости.
  - Кастомные векторные line-art иллюстрации процедур.
- **Интерактивный двухшаговый модуль записи**:
  - Быстрый выбор категории процедуры и времени визита.
  - Автоматическая маска ввода номера телефона (`+7 (___) ___-__-__`).
  - Ограничение выбора прошедших дат (`min date`).
  - **Прямая интеграция с WhatsApp**: после подтверждения заявка автоматически формируется в виде вежливого сообщения с деталями записи и открывает персональный диалог со специалистом.
- **Оптимизированный каталог услуг и прайс**:
  - Переключение категорий через вкладки (Tabs).
  - Динамические плавные аккордеоны с сохранением доступности (ARIA attributes).
  - Четкая сетка с разбивкой цен на уходовые комплексы, биоревитализацию, контурную пластику и лазерную эпиляцию.
- **Performance & SEO-Ready**:
  - 100% нативный стек (Vanilla JS, Zero Dependencies).
  - Современные графические форматы `.webp` с `<picture>` фоллбэком.
  - Оптимизированные метатеги Open Graph и Twitter Cards для красивых карточек в мессенджерах (Telegram, WhatsApp) и соцсетях.
  - Настроены `robots.txt` и `sitemap.xml`.

---

## 📂 Структура проекта

```text
sofia/
├── assets/
│   └── images/
│       ├── hero-sophia.webp        # Главный баннер (WebP)
│       ├── hero-sophia.jpg         # Главный баннер (JPG fallback)
│       ├── about-sophia.webp       # Раздел «Обо мне»
│       ├── about-sophia.jpg
│       ├── work-lips-1.webp        # Портфолио: губы (ракурс 1)
│       ├── work-lips-2.webp        # Портфолио: губы (ракурс 2)
│       ├── work-skin.webp          # Портфолио: сияние кожи
│       ├── og-image.jpg            # Превью для соцсетей (1200x630)
│       └── favicon.svg             # Векторная монограмма-иконка
├── css/
│   └── style.css                   # Модульные стили и адаптивная верстка
├── js/
│   └── main.js                     # Логика меню, табов, аккордеонов и WhatsApp
├── index.html                      # Семантическая разметка сайта
├── robots.txt                      # Инструкции поисковым роботам
├── sitemap.xml                     # Карта сайта
└── README.md                       # Документация проекта
```

---

## 🚀 Локальный запуск

Сайт полностью статичен и не требует сборщиков:

```bash
# Клонирование репозитория
git clone https://github.com/gennadijvaliev02-design/sofia.git

# Переход в папку
cd sofia

# Запуск любого локального сервера (например, через Python или npx)
python3 -m http.server 8000
# или
npx serve .
```

Открыть в браузере: `http://localhost:8000`.

---

## 🛠 Стек технологий

- **HTML5**: семантика, `<picture>`, атрибуты доступности WAI-ARIA.
- **CSS3**: CSS Custom Properties (Variables), Grid Layout, Flexbox, Keyframe Animations, `@media (prefers-reduced-motion)`.
- **Vanilla JavaScript (ES6+)**: чистый DOM API без тяжелых сторонних библиотек.
- **Deployment**: GitHub Pages (автоматический деплой с ветки `main`).

---

## 📬 Автор

- **GitHub**: [@gennadijvaliev02-design](https://github.com/gennadijvaliev02-design)
