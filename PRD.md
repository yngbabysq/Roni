# PRD: Roni — The Fluid Hybrid (Google Logic + Things 3 Flow)

## 1. Project Vision
**Roni** — это высокопроизводительное веб-приложение (SaaS), которое устраняет разрыв между календарным планированием и списком задач. Оно сочетает функциональную мощь Google Календаря с безупречным UX-дизайном Things 3, используя передовой визуальный язык "Liquid Glass" (живое стекло) образца 2026 года. Работает в браузере, доступно с любого устройства, синхронизируется в реальном времени.

**Tagline:** "Flow State, Mastered."

---

## 2. User Flows & Screens

### 2.1. Landing Page (Marketing)
* **Hero Section:** Крупный заголовок "Roni: Flow State, Mastered." с подзаголовком о продуктивности нового поколения.
* **CTA Buttons:** "Start Free" (primary, gradient) и "Watch Demo" (ghost/outline).
* **Feature Showcase:** Интерактивный превью основного интерфейса "My Task Stream" с демо-задачами.
* **Feature Cards:** Три блока — "Smart mapped workflows", "Zen Mode" (фокус-режим), "Swift as light" (скорость) — с иконками и описаниями.
* **Footer CTA:** "Your mind, evolved." с кнопкой "Start Free Trial".

### 2.2. Registration
* **Форма:** Поля "Full Name", "Digital Address" (email), "Security Key" (пароль).
* **Primary CTA:** "Create Account" (gradient-кнопка Electric Indigo → Vibrant Violet).
* **OAuth:** Блок "Or Connect Via" с иконками Google и Apple (облако).
* **Login link:** "Already a member? Log In" внизу экрана.
* **Note:** В дизайне присутствует email/password регистрация помимо OAuth. PRD MVP может ограничиться Google OAuth, но дизайн предусматривает расширение.

### 2.3. Onboarding (3 шага, Desktop)

#### Step 1 — "Your Focus, Visualized."
* Показывает превью интерфейса с пульсирующими задачами ("Roni Glow").
* Описание: "Active tasks gently pulse with the Roni Glow, anchoring your attention where it matters most without the noise of traditional notifications."
* Боковая панель с навигацией (Inbox, Projects, Focus, Calendar) уже видна — знакомство с layout.
* CTA: "Next Step" + "Skip Introduction".

#### Step 2 — "Create at the Speed of Thought."
* Демонстрация **Task Stream** — основного списка задач с чек-листами.
* Показывает карточку задачи "Refine Brand Identity for Roni" с подзадачами и тегом #UIUX.
* Акценты на: "Auto Contextualizing AI" и "Infinite Task Nesting".
* Боковая навигация: Welcome → **Connections** → Schedule → Finish.
* CTA: "Next Step".

#### Step 3 — "Master Your Time."
* Демонстрация **Drag-to-Schedule**: перетаскивание задач из "Pending Tasks" в календарную сетку.
* Список задач слева ("Deep Work: Liquid UI", "System Architecture Review", "Brand Identity Sync", "Client Pitch Preparation") с визуальным выделением перетаскиваемого элемента.
* Превью календаря справа (October 2026, weekly view) с уже размещёнными событиями ("Project Kickoff", "Brief to PM", "Internal Sync").
* Подпись: "Drag your tasks directly into the calendar. Snapping points and liquid transitions handle the rest."
* CTA: "Skip Intro".

---

## 3. Core Functional Requirements

### 3.1. Task Stream (Things 3 DNA)

#### Main Interface ("Roni's List" / "Task Stream")
* **Header:** "Task Stream" с вкладками Activity / Shared / Archive / AI.
* **Priority Flow Section:** Верхняя область с выделенной задачей — карточка "Deep Focus" с описанием, аватарами участников и тегом.
* **Morning Sprint Widget:** Справа от Priority Flow — карточка с текущей задачей и обратным таймером (например, "02:45"), метка "Fired by 11:00 AM".
* **Task List:** Простой список задач с чекбоксами, без разделителей (по правилу "No-Line" дизайн-системы).
* **Checklist Architecture:** Задачи поддерживают вложенные чек-листы (вложенность видна в задаче с подпунктами и чекбоксами).

#### Quick Actions (Виджеты внизу списка)
* **Quick Strike:** "Start a 25 min sprint. Make it count. Jump to a sonic flow mode." — быстрый запуск фокус-сессии.
* **De... (Deep Work?):** "2.5 h note" — блок для быстрых заметок.

#### The Magic Button (+)
* **Плавающая кнопка "+"** в правом нижнем углу (фиолетовый градиент).
* **При нажатии раскрывается меню** с 4 опциями:
  - **Quick Task** (молния) — быстрое создание задачи.
  - **Project** (папка) — создание проекта, `Cmd + P`.
  - **Reminder** (колокол) — напоминание, `Ctrl + R`.
  - **Time Block** (часы) — создание блока времени, `Ctrl + T`.
* Каждый пункт имеет иконку и клавиатурное сочетание.

#### Logical Folders (Sidebar)
* **Inbox** — входящие задачи.
* **Today** — задачи на сегодня.
* **Upcoming** — предстоящие задачи.
* **Calendar** — переход к календарю.
* **Settings** — настройки (внизу сайдбара).

### 3.2. Calendar Engine (Google Calendar DNA)

#### Представления (Views)
* **3-Day View:** Компактный вид 3 дней с почасовой сеткой (08:00–18:00+). Переключение через tab-bar внизу ("3-DAY").
* **Week View (7 дней):** Полная недельная сетка с заголовками дней (SUN–FRI) и датами. Интервалы по часам. Кнопка "Today" для возврата к текущему дню.
* **Month View:** Полный месячный календарь в виде сетки с днями. Заголовок — "Deep Focus Month" (название месяца в стиле editorial). Навигация стрелками вперёд/назад. Кнопка "Today". События отображаются как цветные чипы внутри ячеек дня.

#### Calendar Features
* **Time-Blocking Grid:** 15-минутные интервалы с привязкой (snapping).
* **Interactive Events:** Растягивание, сжатие и перетаскивание событий.
* **Color-coded Events:** Разные цвета для типов событий (фиолетовый для основных, серый для обычных, красная метка "CRITICAL" для важных).
* **Current Time Indicator:** Горизонтальная линия с точкой, показывающая текущее время.
* **Bottom Tab Bar (Mobile):** Переключатели "3-DAY" / "WEEK" / "MONTH".
* **Floating "+" Button:** Кнопка быстрого создания события доступна и в календарном виде.

#### Sidebar Navigation (Desktop — Calendar context)
* Аватар пользователя ("Roni User") с указанием плана ("Pro Plan").
* Пункты: Inbox, **Calendar** (active), Projects, Focus Mode, Settings.

### 3.3. Unified Flow
* **Drag-to-Schedule:** Перетаскивание задачи из списка "Pending Tasks" в сетку календаря превращает её в событие с фиксированным временем.
* **Task ↔ Event синхронизация:** Задача, размещённая в календаре, отображается как событие. Изменение в одном виде отражается в другом.

### 3.4. Month View Analytics (Dashboard)
В нижней части Month View расположены 3 аналитических карточки:
* **Task Completion:** Процент выполнения задач (например, "82%") с пояснением "Task completion velocity is up 12% from January. High focus intervals detected."
* **Spot Times:** Общее время в запланированных встречах (например, "14h") — "Time spent in scheduled meetings this month. Less than recommended. Shift to async updates."
* **Energy Peaks:** Пиковое время когнитивной активности (например, "10 AM") — "Your highest cognitive test capacity occurs in the early morning."

---

## 4. Focus Mode (Pomodoro / Deep Work)

### 4.1. Focus Timer (Desktop)
* **Полноэкранный режим** — минимальный интерфейс, всё внимание на таймере.
* **Крупный таймер:** Цифровой обратный отсчёт "25:00" в центре экрана внутри круглого стеклянного контейнера (Liquid Glass).
* **Метка:** "REMAINING" под таймером.
* **Название задачи:** "Design System Refinement" — текущая задача крупным шрифтом.
* **Статус:** "Current session in progress" (маркерная точка).
* **Notification Filter:** "Phones are muted. Notification filters active." (индикатор).
* **Header:** "Roni — PRODUCTIVITY MODE" + переключатель "Deep Work" + шестерёнка настроек.
* **CTA:** "END SESSION" (кнопка по центру внизу).
* **Dot indicators:** Точки-индикаторы прогресса сессий (как у карусели).

### 4.2. Focus Timer (Mobile)
* **Круговой прогресс-бар** (кольцо с фиолетовой заливкой по мере истечения времени).
* **Таймер:** "25:00" + метка "DEEP WORK".
* **Кнопки управления:** "Pause" (||) и "End" (красный квадрат).
* **Мотивационное сообщение:** "Stay in the flow, Roni." — персонализированное.
* **Текущая задача:** Карточка с названием "Refining Brand Identity" и описанием — 'Focusing on "Liquid Glass 2026" system'.
* **Bottom Tab Bar:** FOCUS (active) / TASKS / INSIGHTS / PROFILE.

### 4.3. Focus Sounds (Ambiance)
* **Neural Audio Canvas** — экран подбора фоновых звуков для работы.
* **Spatial Mix:** Центральный круговой элемент "SPATIAL MIX — 48KHZ HIGH FIDELITY" с тремя звуковыми орбитами:
  - **Obsidian Rain** — с кнопкой Play.
  - **Deep Forest** — с кнопкой Play.
  - **Solar Wind** — с кнопкой Play.
* **Микшер:** Ползунки громкости для каждого звука (Obsidian Rain 74%, Deep Forest 42%, Solar Wind 29%).
* **Master Flow:** "Adaptive intelligence active" — автоматическая подстройка микса.
* **Bottom Tab Bar:** FOCUS / TASKS / INSIGHTS / COMMUNITY.

### 4.4. Pomodoro Settings (Timer Settings)
* **Заголовок:** "Focus Architecture" (editorial style).
* **Work Duration:** 25:00 (настраиваемое).
* **Short Break:** 05:00 (настраиваемое).
* **Long Break:** 15:00 (настраиваемое).
* **Настройки цикла:**
  - "Auto-start Breaks" — Continuous flow transition (toggle).
  - "Auto-start Tasks" — Start tasks immediately after rest (toggle).
* **Daily Goal:** 4 sessions per day (счётчик +/-).
* **Focus Mode Visuals:** "Customize your workspace ambiance" (ссылка на настройку визуалов).

---

## 5. Insights & Flow Analytics

### 5.1. Flow Analytics Dashboard (Mobile)
* **Flow Score:** Числовой рейтинг (например, "84.2 /daily") с графиком-спарклайном за период.
* **Метрики:**
  - **Focus Hours:** 12 daily (с графиком).
  - **Tasks:** 48 /wk (с графиком).
* **Focus Distribution:** Разбивка по категориям с прогресс-барами:
  - Deep Focus — 55%
  - Collaboration — 20%
  - Admin & Email — 25% (с цветовой кодировкой).
* **AI-рекомендации:** "Flow Peak Reached — Your productivity peaked at 11:24 AM today. Try starting tomorrow 15 min earlier."
* **Bottom Tab Bar:** FOCUS / TASKS / **INSIGHTS** (active) / COMMUNITY.

---

## 6. Settings & Profile

### 6.1. Settings (Desktop)
* **User Profile:** Аватар + имя + email.
* **Work Efficiency:**
  - **Productivity Mode** — "Block notifications and focus" (toggle).
  - **AI Prioritization** — "Let AI sort your daily inbox" (toggle).
* **Appearance:** Три темы на выбор с превью:
  - **Dark** (по умолчанию, основной).
  - **Light**.
  - **Glow** (с фиолетовым свечением).
* **Sync Preferences** — настройки синхронизации.
* **Privacy & Security** — настройки приватности.
* **CTA:** "Logout Roni" (фиолетовая кнопка внизу).
* **Footer:** Версия "Roni Infinite v1.1.7 Beta".

---

## 7. SaaS & Auth

### 7.1. Authentication
* **Google OAuth:** Основной метод аутентификации. Одновременно выдаёт права на Google Calendar API.
* **Apple Auth:** Предусмотрен в дизайне (иконка облака Apple на странице регистрации).
* **Email/Password:** Форма регистрации с полями Full Name, Email, Password — альтернативный метод.
* **Login:** "Already a member? Log In" — переход на страницу входа.

### 7.2. Multi-tenancy & Plans
* **Полная изоляция данных** пользователей через Supabase Row Level Security (RLS).
* **Pro Plan:** Отображается в профиле пользователя ("Pro Plan"). Stripe-подписка.
* **Free Tier:** Ограниченное количество проектов и фокус-сессий.

---

## 8. Visual & Interaction Design (Liquid Glass 2026)

### 8.1. Design System
Полная спецификация описана в `stitch_roni_fluid_productivity/liquid_glass_2026/DESIGN.md`.

### 8.2. Aesthetics
* **Material:** CSS `backdrop-filter: blur(20px) saturate(180%)` с полупрозрачным фоном.
* **Borders:** "Light-leak" эффект — тонкая светящаяся кайма без solid borders ("No-Line Rule").
* **Surface Hierarchy:** Tonal layering — `surface_dim` (#131313) → `surface_container_low` (#1C1B1B) → `surface_container_highest` (#353534).
* **Palette:**
    * **Base:** Deep Obsidian (#0E0E0E / #131313) — тёмная тема (primary). Frosted Pearl для светлой. "Glow" тема с фиолетовым свечением.
    * **Accent:** Electric Indigo (#6366F1 / #C0C1FF) и Vibrant Violet (#8B5CF6 / #6F00BE).
    * **Selection:** Мягкое свечение (Glow) вокруг активных элементов.
* **Typography:** Manrope (display/headlines, editorial) + Inter (body/functional, Things 3 aesthetic).

### 8.3. Motion Physics (Fluidity)
* **Physical Fluid Movement:** Раскрытие задачи имитирует движение вязкой жидкости через Framer Motion `spring` с `stiffness: 400, damping: 30`.
* **Wobble Effect:** При перетаскивании карточки слегка "покачиваются" (`damping: 15`).
* **Bouncy Interactions:** Каждый hover, click, toggle имеет spring (Damping: 0.7, Stiffness: 120).
* **Instant Feedback:** `useOptimistic` для мгновенного отражения изменений до подтверждения сервером.

### 8.4. Responsive Design
* **Desktop:** Полный layout с sidebar + content area + calendar. Settings/modals — в overlay.
* **Mobile:** Bottom Tab Bar навигация (FOCUS / TASKS / INSIGHTS / PROFILE или COMMUNITY). Sidebar сворачивается в hamburger-меню. Календарь адаптируется к 3-Day/Week/Month через tab bar.

---

## 9. Technical Stack

* **Frontend:** Next.js 16 (App Router) + React 19 + TypeScript 5.
* **Styling:** Tailwind CSS v4 + shadcn/ui (Radix UI primitives).
* **Animation:** Motion (бывший Framer Motion) — `import { motion } from "motion/react"` (spring physics, drag feedback, Liquid Glass transitions).
* **Drag & Drop:** @dnd-kit/react + @dnd-kit/helpers (cross-container DnD: task list → calendar grid). Используется `DragDropProvider` вместо устаревшего `DndContext`.
* **State:** TanStack Query v5 (server state, latest 5.90+) + Zustand v5 (UI state, latest 5.0+).
* **Backend/DB:** Supabase — PostgreSQL (persistence) + Auth (Google OAuth) + Realtime + RLS.
* **Calendar Sync:** Google Calendar API (read/write via stored OAuth tokens).
* **Payments:** Stripe (SaaS subscriptions).
* **NLP:** Claude API (Anthropic) для разбора естественного языка ("напомни купить кофе завтра в 9").
* **Audio:** Web Audio API для Focus Sounds / Spatial Mix (48kHz).
* **Deployment:** Vercel.
* **Performance Goal:** First Contentful Paint < 1.2 сек. Optimistic UI делает все действия мгновенными.

---

## 10. Navigation Architecture

### 10.1. Desktop
* **Sidebar (левая панель):**
  - Logo "Roni" + subtitle "PRODUCTIVITY MODE"
  - User avatar + name
  - Nav items: Inbox, Today, Upcoming, Calendar, Settings
  - Bottom: "Productivity Mode" toggle
* **Top Bar (в контексте Task Stream):**
  - "Task Stream" заголовок
  - Tabs: Activity / Shared / Archive / AI
  - Search + Notifications + Profile icons

### 10.2. Mobile
* **Bottom Tab Bar:**
  - В контексте Focus: FOCUS / TASKS / INSIGHTS / PROFILE
  - В контексте Calendar: 3-DAY / WEEK / MONTH
  - В контексте Ambiance: FOCUS / TASKS / INSIGHTS / COMMUNITY
* **Hamburger Menu:** Slide-out sidebar с аватаром, планом, и навигацией.

---

## 11. Feature Summary (Screen Map)

| # | Screen | Описание | Platform |
|---|--------|----------|----------|
| 1 | Landing Page | Marketing page с hero, features, CTA | Web |
| 2 | Registration | Email/Password + OAuth (Google, Apple) | Mobile-first |
| 3 | Onboarding Step 1 | "Your Focus, Visualized" — Roni Glow | Desktop |
| 4 | Onboarding Step 2 | "Create at the Speed of Thought" — Task Stream | Desktop |
| 5 | Onboarding Step 3 | "Master Your Time" — Drag-to-Schedule | Desktop |
| 6 | Task Stream (Main) | Основной список задач + Priority Flow | Desktop |
| 7 | Task Stream (Mobile) | Roni's List + Quick Strike виджеты | Mobile |
| 8 | Magic Button Menu | Меню "+": Quick Task, Project, Reminder, Time Block | Desktop |
| 9 | Weekly View | 7-дневная календарная сетка | Mobile |
| 10 | 3-Day View | 3-дневная сетка + sidebar | Mobile |
| 11 | Month View | Месячный календарь + аналитика | Desktop |
| 12 | Focus Mode (Desktop) | Полноэкранный Pomodoro таймер | Desktop |
| 13 | Focus Mode (Mobile) | Круговой прогресс + управление | Mobile |
| 14 | Focus Sounds | Neural Audio Canvas — Spatial Mix | Mobile |
| 15 | Pomodoro Settings | Focus Architecture — настройки таймера | Mobile |
| 16 | Flow Insights | Аналитика: Flow Score, Focus Distribution, AI tips | Mobile |
| 17 | Settings | Профиль, Appearance (Dark/Light/Glow), Privacy | Desktop |

---

## 12. Instructions for Claude Code (AI Skills)

Для реализации **Roni** Claude Code должен использовать следующие стратегии:

### 12.1. Interaction Architect (Things 3 Expert)
* **Task:** Реализовать "Magic Button" с @dnd-kit `useSortable` + вычислением индекса вставки по координатам.
* **Menu:** Выпадающее меню с 4 actions (Quick Task, Project, Reminder, Time Block) с keyboard shortcuts.

### 12.2. Math-Heavy Layout (Google Grid Expert)
* **Task:** Создать календарную сетку как React-компонент с 15-минутным snapping.
* **Views:** Реализовать 3 режима — 3-Day, Week (7-day), Month с переключением.
* **Overlap Algorithm:** Layout для пересекающихся событий.

### 12.3. Glass & Physics Specialist (Liquid Glass Web)
* **Task:** Реализовать Liquid Glass через CSS backdrop-filter + Framer Motion.
* **Themes:** Три темы — Dark (primary), Light, Glow.
* **No-Line Rule:** Границы только через тональные переходы, никогда через solid borders.

### 12.4. Focus Mode Engineer
* **Task:** Реализовать Pomodoro-таймер с полноэкранным режимом, круговым прогрессом (mobile), настройками циклов, auto-start breaks/tasks.
* **Audio:** Web Audio API для Focus Sounds — Spatial Mix с тремя каналами + mixer.

### 12.5. Analytics & Insights
* **Task:** Реализовать Flow Analytics — Flow Score, Focus Hours, Task completion rate, Focus Distribution по категориям, AI-рекомендации по оптимизации продуктивности.

### 12.6. Test-Driven Development (TDD)
* **Task:** Покрыть тестами (Vitest) логику обработки дат, overlap layout, NLP-ввода, Pomodoro timer, и analytics calculations.

---

## 13. Success Metrics
* **Time to Interactive:** < 1.5 сек на Vercel Edge.
* **Sync Latency:** < 500 мс для локальных изменений через `useOptimistic`.
* **User Delight:** Ощущение нативного десктопного приложения в браузере с премиальной анимацией.
* **Retention:** DAU/MAU > 40% через 30 дней после запуска.
* **Focus Engagement:** Средняя длительность фокус-сессии > 20 мин.
* **Flow Score Adoption:** > 60% активных пользователей проверяют Insights хотя бы раз в неделю.
