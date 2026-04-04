# Roni — Пошаговый План Разработки

> **Исполнитель:** Claude Code  
> **Стек:** Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS v4 + shadcn/ui + Motion (ex Motion) + @dnd-kit/react + Supabase + Vercel  
> **Подход:** Desktop-first, Dark theme only, English UI  
> **Бюджет инфраструктуры:** $0 (бесплатные тарифы)

---

## Фаза 0: Подготовка инфраструктуры
> Цель: настроить все сервисы и фундамент проекта

### Шаг 0.1 — Создание Supabase проекта
- Создать проект Roni через Supabase MCP
- Получить URL и ключи (anon key, service role key)
- Сохранить credentials в `.env.local`

### Шаг 0.2 — Инициализация Next.js проекта
- `npx create-next-app@latest roni --typescript --tailwind --app --src-dir`
- Установить зависимости:
  ```
  motion @dnd-kit/react @dnd-kit/helpers
  @supabase/supabase-js @supabase/ssr
  @tanstack/react-query zustand
  @radix-ui/react-* (через shadcn/ui init)
  date-fns lucide-react
  ```
- Настроить shadcn/ui (`npx shadcn@latest init -t next`) с кастомной темой Liquid Glass
- Настроить Tailwind CSS v4 (используется `@import "tailwindcss"` вместо `@tailwind` директив) с дизайн-токенами из DESIGN.md

### Шаг 0.3 — Структура проекта
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Группа: login, register
│   ├── (marketing)/        # Группа: landing page
│   ├── (app)/              # Группа: основное приложение (protected)
│   │   ├── inbox/
│   │   ├── today/
│   │   ├── upcoming/
│   │   ├── anytime/
│   │   ├── someday/
│   │   ├── calendar/
│   │   ├── focus/
│   │   ├── insights/
│   │   ├── projects/[id]/
│   │   └── settings/
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn/ui + кастомные Liquid Glass компоненты
│   ├── layout/             # Sidebar, TopBar, BottomTabBar
│   ├── tasks/              # TaskCard, TaskList, TaskForm, MagicButton
│   ├── calendar/           # CalendarGrid, EventCard, DayColumn
│   ├── focus/              # PomodoroTimer, TimerControls
│   ├── insights/           # FlowScore, FocusDistribution
│   └── onboarding/         # OnboardingStep1, Step2, Step3
├── hooks/                  # Кастомные React хуки
├── lib/                    # Утилиты, Supabase client, constants
├── stores/                 # Zustand stores
├── types/                  # TypeScript типы
└── styles/                 # Глобальные стили, Liquid Glass CSS
```

### Шаг 0.4 — Дизайн-система (Liquid Glass Foundation)
- Создать CSS-переменные для всей цветовой палитры из DESIGN.md:
  - `--surface-dim: #131313`
  - `--surface-container-low: #1C1B1B`
  - `--surface-container-lowest: #0E0E0E`
  - `--surface-container-highest: #353534`
  - `--primary: #C0C1FF`
  - `--primary-container: #8083FF`
  - `--electric-indigo: #6366F1`
  - `--vibrant-violet: #8B5CF6`
  - `--secondary-container: #6F00BE`
- Настроить шрифты: Manrope (display) + Inter (body) через `next/font`
- Создать базовый компонент `GlassCard` с `backdrop-filter: blur(20px)` и light-leak border
- Создать Tailwind utilities для Liquid Glass эффектов
- Настроить Motion (бывший Motion) `spring` presets:
  - Импорт: `import { motion } from "motion/react"`
  - `fluidExpand: { stiffness: 400, damping: 30 }`
  - `wobble: { damping: 15 }`
  - `bounce: { damping: 0.7, stiffness: 120 }`

### Шаг 0.5 — Настройка Supabase Auth
- Настроить Google OAuth provider в Supabase Dashboard
- Настроить Apple OAuth provider
- Настроить Email/Password auth
- Создать auth middleware для Next.js (protected routes)
- Создать auth callback route `/auth/callback`

---

## Фаза 1: Аутентификация и Landing Page
> Цель: пользователь может зайти на сайт, зарегистрироваться и войти

### Шаг 1.1 — Landing Page
- Реализовать маркетинговую страницу по дизайну:
  - Hero section: "Roni: Flow State, Mastered." + CTA buttons
  - Feature showcase с превью Task Stream
  - 3 feature cards (Smart workflows, Zen Mode, Swift as light)
  - Footer CTA: "Your mind, evolved."
- Применить Liquid Glass эффекты на карточки
- Анимации появления при скролле (Motion)

### Шаг 1.2 — Страница регистрации
- Форма: Full Name, Email, Password
- Кнопка "Create Account" (gradient)
- OAuth кнопки: Google, Apple
- Ссылка "Already a member? Log In"
- Подключить к Supabase Auth

### Шаг 1.3 — Страница входа
- Форма: Email, Password
- OAuth кнопки: Google, Apple
- Ссылка "Don't have an account? Sign Up"
- Подключить к Supabase Auth

### Шаг 1.4 — Auth flow
- Middleware для защиты routes `/app/*`
- Redirect неавторизованных на `/login`
- Redirect авторизованных с `/login` на `/app/inbox`
- Хранение сессии через `@supabase/ssr`

---

## Фаза 2: Онбординг
> Цель: новый пользователь проходит 3-шаговое знакомство с приложением

### Шаг 2.1 — Onboarding Step 1: "Your Focus, Visualized."
- Layout с боковой навигацией (превью sidebar)
- Превью интерфейса с "Roni Glow" эффектом (пульсация)
- Текст описания
- CTA: "Next Step" + "Skip Introduction"
- Сохранять прогресс онбординга в Supabase (user profile)

### Шаг 2.2 — Onboarding Step 2: "Create at the Speed of Thought."
- Демо карточки Task Stream с подзадачами
- Акценты: "Auto Contextualizing AI", "Infinite Task Nesting"
- Навигация: Welcome → Connections → Schedule → Finish
- CTA: "Next Step"

### Шаг 2.3 — Onboarding Step 3: "Master Your Time."
- Демо Drag-to-Schedule: список задач слева + календарь справа
- Визуальная демонстрация перетаскивания (анимация)
- CTA: "Skip Intro" → переход в основное приложение

---

## Фаза 3: База данных и API
> Цель: создать схему БД и серверные функции для задач, событий и проектов

### Шаг 3.1 — Схема базы данных (Supabase Migrations)
```sql
-- Profiles (расширение auth.users)
profiles: id, full_name, avatar_url, onboarding_completed, created_at

-- Projects
projects: id, user_id, name, color, icon, position, created_at

-- Tasks
tasks: id, user_id, project_id, title, description, 
       is_completed, priority (low/medium/high/critical),
       folder (inbox/today/upcoming/anytime/someday),
       due_date, reminder_at, position, created_at, completed_at

-- Subtasks (1 уровень)
subtasks: id, task_id, title, is_completed, position

-- Tags
tags: id, user_id, name, color
task_tags: task_id, tag_id

-- Events (собственный календарь)
events: id, user_id, title, description, 
        start_time, end_time, color, is_all_day,
        linked_task_id, created_at

-- Focus Sessions
focus_sessions: id, user_id, task_id, 
                duration_minutes, started_at, ended_at,
                type (work/short_break/long_break)

-- User Settings
user_settings: user_id, pomodoro_work (default 25),
               pomodoro_short_break (5), pomodoro_long_break (15),
               daily_focus_goal (4), auto_start_breaks, auto_start_tasks
```

### Шаг 3.2 — Row Level Security (RLS)
- Включить RLS на все таблицы
- Политики: каждый пользователь видит/редактирует только свои данные
- `auth.uid() = user_id` для всех операций

### Шаг 3.3 — Server Actions / API Routes
- CRUD для Tasks (создание, чтение, обновление, удаление, завершение)
- CRUD для Subtasks
- CRUD для Projects
- CRUD для Events
- CRUD для Tags
- Focus Sessions (start, end, get history)
- User Settings (get, update)
- Optimistic updates через TanStack Query

### Шаг 3.4 — TanStack Query setup
- QueryClient с default options
- Custom hooks: `useTasks()`, `useProjects()`, `useEvents()`, etc.
- Optimistic mutations для мгновенного UI feedback
- Real-time subscriptions через Supabase Realtime

---

## Фаза 4: Основной Layout приложения
> Цель: создать каркас приложения — sidebar, content area, routing

### Шаг 4.1 — App Shell (Desktop Layout)
- Sidebar слева (фиксированная, ~240px):
  - Logo "Roni" + "PRODUCTIVITY MODE"
  - User avatar + имя
  - Nav items: Inbox, Today, Upcoming, Anytime, Someday, Calendar
  - Projects section (динамический список)
  - Settings внизу
- Content area справа (flex-grow)
- Top bar: "Task Stream" + вкладки Activity / Archive
- Liquid Glass стилизация sidebar (tonal shift, no borders)
- Active state: фиолетовый pill с spring анимацией

### Шаг 4.2 — Zustand Store для UI
- `useUIStore`: sidebar collapsed state, active view, selected task, modal states
- `useAuthStore`: current user, session

---

## Фаза 5: Task Management (Ядро)
> Цель: полнофункциональное управление задачами как в Things 3

### Шаг 5.1 — Task List View
- Компонент `TaskList` — отображение задач текущей папки
- Компонент `TaskCard` — карточка задачи:
  - Чекбокс (с "сочной" spring анимацией при завершении)
  - Название задачи
  - Тег (цветной chip)
  - Приоритет (цветная метка CRITICAL/HIGH/etc.)
  - Due date (если есть)
- Нет разделителей между задачами (No-Line Rule)
- Spacing через вертикальные отступы 12px

### Шаг 5.2 — Task Detail View
- Раскрытие задачи с fluid animation (spring expand)
- Поля: Title, Description (текстовый блок), Due Date, Priority, Tags, Project
- Subtasks список с чекбоксами
- Кнопка "Add subtask"
- Reminder picker (дата + время)

### Шаг 5.3 — Priority Flow Section
- Верхняя область Task Stream
- Выделенная карточка "Deep Focus" — текущая приоритетная задача
- Morning Sprint Widget: текущая задача + обратный таймер
- Liquid Glass карточка с backdrop-blur

### Шаг 5.4 — The Magic Button (+)
- Плавающая кнопка "+" (fixed position, bottom-right)
- Gradient: Electric Indigo → Vibrant Violet
- При клике: раскрывается меню (Motion stagger animation):
  - ⚡ Quick Task — `Cmd+K` / `Ctrl+K`
  - 📁 Project — `Cmd+P`
  - 🔔 Reminder — `Ctrl+R`
  - ⏰ Time Block — `Ctrl+T`
- Keyboard shortcut listener (global)
- Quick Task: inline input в списке для быстрого создания
- Project: модальное окно создания проекта
- Reminder: модальное окно с date/time picker
- Time Block: модальное окно → создаёт событие в календаре

### Шаг 5.5 — Drag & Drop сортировка задач
- @dnd-kit/react `useSortable` (из `@dnd-kit/react/sortable`) для изменения порядка задач
- Wobble effect при перетаскивании (damping: 15)
- Обновление `position` в БД после drop

### Шаг 5.6 — Logical Folders
- **Inbox**: все задачи без даты и папки
- **Today**: задачи с `due_date = today` или вручную перемещённые
- **Upcoming**: задачи с `due_date > today` (группировка по дням)
- **Anytime**: задачи без даты, но не в Inbox
- **Someday**: отложенные задачи
- Перемещение между папками через drag или контекстное меню

### Шаг 5.7 — Projects
- Создание проекта: имя, цвет, иконка
- Список проектов в sidebar (динамический)
- Фильтрация задач по проекту
- Страница проекта `/projects/[id]`

### Шаг 5.8 — Tags
- Создание тегов с цветом
- Привязка тегов к задачам (многие ко многим)
- Фильтрация по тегам

### Шаг 5.9 — Search
- Command Palette (`Cmd+K`): поиск по задачам и событиям
- Поиск по названию и описанию
- Результаты с группировкой (Tasks / Events / Projects)

### Шаг 5.10 — Archive
- Завершённые задачи автоматически перемещаются в Archive
- Вкладка "Archive" в Task Stream
- Возможность восстановить задачу из архива

---

## Фаза 6: Calendar Engine
> Цель: полнофункциональный календарь с 3 видами и drag-to-schedule

### Шаг 6.1 — Calendar Data Layer
- Хук `useEvents()` — получение событий за период
- Хук `useCalendarNavigation()` — текущая дата, навигация, вид
- Утилиты: расчёт позиций событий, overlap algorithm, snapping

### Шаг 6.2 — Week View (основной)
- 7-дневная сетка с заголовками (SUN–SAT + даты)
- Часовая сетка (00:00–23:00) с 15-минутными интервалами
- Current time indicator (горизонтальная линия)
- Кнопка "Today" для возврата к текущему дню
- Навигация стрелками (неделя вперёд/назад)

### Шаг 6.3 — Event Card
- Позиционирование через absolute (top/height в px из start_time/end_time)
- Цветовая кодировка
- Метка CRITICAL для важных
- Drag для перемещения (изменение start_time)
- Resize handles для изменения длительности
- 15-минутный snapping при drag/resize

### Шаг 6.4 — Overlap Algorithm
- Расчёт колонок для пересекающихся событий
- Максимизация ширины каждого события
- Формула: `left = (columnIndex / totalColumns) * 100%`, `width = (1 / totalColumns) * 100%`

### Шаг 6.5 — 3-Day View
- Аналогична Week View, но 3 колонки
- Свайп/навигация по 3 дня

### Шаг 6.6 — Month View
- Сетка дней месяца (6 строк × 7 столбцов)
- События как цветные chips внутри ячеек
- Навигация по месяцам
- Заголовок "Deep Focus Month" (editorial, Manrope)
- Кнопка "Today"

### Шаг 6.7 — Month View Analytics (Dashboard Cards)
- 3 карточки внизу Month View:
  - Task Completion % (из данных за месяц)
  - Spot Times (суммарное время в событиях)
  - Energy Peaks (пиковое время — на основе focus sessions)

### Шаг 6.8 — Создание события
- Клик на пустом слоте → модальное окно создания
- Поля: Title, Description, Start Time, End Time, Color
- Или: клик + drag по сетке для выбора временного диапазона

### Шаг 6.9 — Drag-to-Schedule (Cross-Container DnD)
- @dnd-kit/react с `DragDropProvider` и cross-container drag
- Задача из Task List → перетаскивается в Calendar Grid
- При drop: создаётся Event с linked_task_id
- Snapping к 15-минутным интервалам
- Визуальный preview при перетаскивании (ghost card)

### Шаг 6.10 — View Switcher
- Переключатель видов: 3-Day / Week / Month
- Сохранение выбранного вида в localStorage

---

## Фаза 7: Focus Mode (Pomodoro Timer)
> Цель: полноэкранный таймер фокусировки с настройками

### Шаг 7.1 — Pomodoro Timer Engine
- Zustand store: `useFocusStore`
  - currentSession (work/short_break/long_break)
  - timeRemaining, isRunning, isPaused
  - sessionsCompleted, dailyGoal
- Точный таймер через `requestAnimationFrame` или `setInterval` с drift correction
- Auto-start breaks/tasks (из настроек)

### Шаг 7.2 — Focus Mode Page (Desktop)
- Полноэкранный layout (скрывает sidebar)
- Крупный таймер "25:00" в центре (Liquid Glass circle)
- Метка "REMAINING"
- Название текущей задачи (крупный шрифт, Manrope)
- "Current session in progress" статус
- Dot indicators (прогресс сессий)
- "END SESSION" кнопка
- Header: "Roni — PRODUCTIVITY MODE" + "Deep Work" badge

### Шаг 7.3 — Timer Controls
- Start/Pause/Resume/End
- Skip break
- Switch between work/break

### Шаг 7.4 — Focus Settings Page
- "Focus Architecture" заголовок (editorial)
- Work duration: 25:00 (adjustable stepper)
- Short Break: 05:00 (adjustable)
- Long Break: 15:00 (adjustable)
- Auto-start Breaks toggle
- Auto-start Tasks toggle
- Daily Goal: counter (sessions per day)
- Сохранение в Supabase `user_settings`

### Шаг 7.5 — Focus Session Tracking
- Запись каждой сессии в `focus_sessions` таблицу
- Связь с задачей (optional)
- Данные для Flow Insights

---

## Фаза 8: Flow Insights & Analytics
> Цель: дашборд продуктивности с метриками

### Шаг 8.1 — Data Aggregation
- Серверные функции для расчёта метрик:
  - Flow Score (формула на основе completed tasks + focus time + consistency)
  - Focus Hours (сумма focus sessions за период)
  - Tasks completed per week
  - Focus Distribution (Deep Focus vs Admin vs Collaboration — на основе тегов/проектов)
  - Energy Peaks (в какое время больше всего фокус-сессий)

### Шаг 8.2 — Insights Page
- Flow Score: число + sparkline график (за 7/30 дней)
- Focus Hours: число + мини-график
- Tasks: число/week
- Focus Distribution: прогресс-бары по категориям
- Рекомендации (статические шаблоны, не AI):
  - "Flow Peak Reached — Your productivity peaked at [time]. Try starting tomorrow 15 min earlier."
  - "Great streak! You've completed [N] tasks this week."

### Шаг 8.3 — Month View Analytics Integration
- Те же данные, но агрегированные за месяц
- 3 карточки под Month View calendar

---

## Фаза 9: Settings
> Цель: страница настроек как в дизайне

### Шаг 9.1 — Settings Page
- User Profile: аватар + имя + email (из Supabase Auth)
- Appearance: Dark theme (заблокированный, единственный вариант в MVP, но UI-ready для Light/Glow)
- Sync Preferences (placeholder для будущей Google Calendar синхронизации)
- Privacy & Security (изменение пароля, удаление аккаунта)
- "Logout Roni" кнопка
- Версия "Roni Infinite v1.0.0 Beta"

---

## Фаза 10: Анимации и полировка
> Цель: довести визуал до уровня Liquid Glass 2026

### Шаг 10.1 — Liquid Glass эффекты (финальная полировка)
- Backdrop-blur на всех Glass поверхностях
- Light-leak borders (animated box-shadow)
- Refractive edge (1px top-stroke primary_fixed_dim at 15%)
- Ghost borders для accessibility (outline_variant at 10%)

### Шаг 10.2 — Motion Design
- Задача expand/collapse: fluid spring animation
- Task completion: "сочная" анимация (scale → opacity → remove)
- Magic Button: stagger menu appearance
- Page transitions: fade + slide
- Sidebar active state: bouncy pill transition
- Calendar event drag: wobble effect
- Hover effects: scale 1.02x with back-out easing

### Шаг 10.3 — Micro-interactions
- Checkbox: spring scale + color fill
- Button hover: subtle glow
- Input focus: light-leak bottom border
- Card hover: ambient shadow shift
- Loading states: skeleton с shimmer в Liquid Glass стиле

---

## Фаза 11: Тестирование
> Цель: убедиться что приложение работает надёжно

### Шаг 11.1 — Настройка Vitest
- Установить Vitest + Testing Library + jsdom
- Настроить конфиг и test utilities

### Шаг 11.2 — Unit Tests (критическая логика)
- Date utilities (расчёт позиций событий, snapping, overlap algorithm)
- Pomodoro timer logic (state transitions, auto-start)
- Task folder logic (фильтрация по inbox/today/upcoming)
- Flow Score calculation
- Calendar navigation (next/prev week/month, date ranges)

### Шаг 11.3 — Integration Tests
- Auth flow (register → login → redirect)
- Task CRUD (create → edit → complete → archive)
- Event CRUD (create → drag → resize → delete)
- Drag-to-Schedule (task → calendar → creates event)

---

## Фаза 12: Performance & Deploy
> Цель: оптимизировать и задеплоить на Vercel

### Шаг 12.1 — Performance Optimization
- `React.lazy` + `Suspense` для Calendar и Focus Mode
- Image optimization через `next/image`
- Font optimization через `next/font` (Manrope + Inter subset)
- Bundle analysis + tree shaking
- Preload critical data (TanStack Query prefetch)
- Цель: FCP < 1.2 сек

### Шаг 12.2 — SEO
- Meta tags для Landing Page
- Open Graph tags (preview в соцсетях)
- `robots.txt` и `sitemap.xml`
- Structured data (JSON-LD)

### Шаг 12.3 — Deploy на Vercel
- Подключить GitHub repo к Vercel
- Настроить environment variables
- Настроить Supabase URL и ключи
- Первый deploy + smoke test

### Шаг 12.4 — Подготовка к блогу / SEO контенту
- Раздел `/blog` (опционально) — SSG страницы через MDX
- Статьи о продуктивности для органического трафика

---

## Порядок выполнения (Timeline)

| Фаза | Название | Зависимости | Приоритет |
|------|----------|-------------|-----------|
| 0 | Подготовка инфраструктуры | — | 🔴 Критический |
| 1 | Auth + Landing Page | Фаза 0 | 🔴 Критический |
| 2 | Онбординг | Фаза 1 | 🟡 Высокий |
| 3 | База данных и API | Фаза 0 | 🔴 Критический |
| 4 | App Shell (Layout) | Фаза 1, 3 | 🔴 Критический |
| 5 | Task Management | Фаза 4 | 🔴 Критический |
| 6 | Calendar Engine | Фаза 4, 5 | 🔴 Критический |
| 7 | Focus Mode | Фаза 4, 3 | 🟡 Высокий |
| 8 | Flow Insights | Фаза 7, 5 | 🟡 Высокий |
| 9 | Settings | Фаза 4 | 🟢 Средний |
| 10 | Анимации и полировка | Фазы 5–9 | 🟡 Высокий |
| 11 | Тестирование | Фазы 5–9 | 🟡 Высокий |
| 12 | Performance & Deploy | Все фазы | 🔴 Критический |

---

## Рекомендуемый порядок работы

```
Фаза 0 → Фаза 1 → Фаза 3 → Фаза 4 → Фаза 5 → Фаза 6 → 
→ Фаза 7 → Фаза 8 → Фаза 2 → Фаза 9 → Фаза 10 → Фаза 11 → Фаза 12
```

> **Почему онбординг (Фаза 2) после основных фич?**  
> Онбординг показывает превью функций приложения. Логичнее сначала создать эти функции, а потом сделать их демо-версии для онбординга.

---

## Ключевые принципы разработки

1. **Liquid Glass — с первого дня.** Каждый компонент сразу создаётся с правильными цветами, blur, анимациями. Не "сначала работает, потом красиво".

2. **Optimistic UI.** Каждое действие (создание задачи, завершение, drag) отражается мгновенно, до ответа сервера.

3. **No-Line Rule.** Никаких `border: 1px solid`. Границы только через тональные переходы поверхностей.

4. **Spring physics.** Все анимации через Motion `spring`, никогда `ease-in-out`.

5. **Чистый код.** Понятные имена переменных и функций. Без комментариев, но с self-documenting подходом.

6. **Бесплатная инфраструктура.** Всё на free tiers: Supabase Free, Vercel Hobby, Google OAuth (бесплатен).
