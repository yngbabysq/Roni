# Design System Specification: Liquid Glass 2026

## 1. Overview & Creative North Star: "The Refractive Monolith"
This design system moves away from the static, "flat" era of software and enters the era of depth, light, and motion. The Creative North Star is **The Refractive Monolith**: an experience that feels carved from a single block of obsidian, then layered with suspended sheets of digital glass. 

We break the "standard app" template by leaning into high-contrast editorial typography and intentional asymmetry. The goal is a workspace that feels like a premium physical object—where light bends around edges, and surfaces have a tactile, "bouncy" responsiveness. By prioritizing tonal depth over structural lines, we create a focus-driven environment that feels expansive yet intimate.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the depth of `surface_container_lowest` (#0E0E0E), acting as the dark void upon which our "Liquid Glass" elements float.

### The "No-Line" Rule
Standard 1px solid dividers are strictly prohibited for sectioning. Boundaries must be defined through:
- **Tonal Shifts:** Placing a `surface_container` (#201F1F) element against the `background` (#131313).
- **Light Leaks:** Instead of a border, use a 1px inner-glow or a top-edge stroke using `outline_variant` at 20% opacity to simulate light hitting the edge of a glass pane.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack. Each level of nesting must move one step higher in the surface tier:
1.  **Base Layer:** `surface_dim` (#131313) — The app canvas.
2.  **Primary Containers:** `surface_container_low` (#1C1B1B) — The main sidebar or content area.
3.  **Floating Elements:** `surface_container_highest` (#353534) — Modals, popovers, and active cards.

### The "Glass & Gradient" Rule
To achieve the "Liquid" feel, main CTAs and active states should utilize a subtle linear gradient: `primary` (#C0C1FF) to `primary_container` (#8083FF). Use `backdrop-filter: blur(20px)` on all secondary surfaces to allow the background obsidian to bleed through with a frosted pearl texture.

---

## 3. Typography: Editorial Precision
The system uses a pairing of **Manrope** for expressive, high-end display and **Inter** for functional, native macOS clarity.

*   **Display & Headlines (Manrope):** Used for "Zen moments"—empty states, project titles, and dashboard headers. The `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) to feel like a high-end magazine.
*   **Functional Text (Inter):** `body-md` (0.875rem) is the workhorse for tasks and notes. It provides a familiar, professional "Things 3" aesthetic that ensures legibility during deep work.
*   **Hierarchy as Identity:** Use `label-sm` in all-caps with 5% letter-spacing for metadata. The contrast between a massive `headline-lg` and a tiny, tracked-out `label-sm` creates the "Signature" look.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "darkness," but rather to represent "occlusion of light."

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card sitting on a `surface_container_low` section creates a natural "sunken" feel.
*   **Ambient Shadows:** For floating glass panes, use extra-diffused shadows: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must feel like it is part of the background, not an external glow.
*   **The "Ghost Border" Fallback:** If a boundary is visually required for accessibility, use the `outline_variant` token at 10% opacity. It should be barely perceptible—a "whisper" of a line.
*   **Refractive Edge:** Apply a 1px top-stroke to cards using `primary_fixed_dim` at 15% opacity to simulate a "light leak" on the top edge of the glass.

---

## 5. Components

### Sidebar & Navigation (The "Things 3" Flow)
The sidebar uses `surface_container_low` with no right-hand border. Active states are indicated by a `secondary_container` (#6F00BE) pill with a "bouncy" spring transition. Text for inactive items should use `on_surface_variant`.

### Buttons
*   **Primary:** Gradient from `primary` to `primary_container`. On hover, the button should scale 1.02x with a `back-out` easing curve.
*   **Tertiary (Ghost):** No background. Uses `on_surface` text. On hover, a subtle `surface_bright` background fades in at 40% opacity.

### Input Fields
Inputs should not be "boxes." They are simple underlines or soft `surface_container_highest` shapes. The focus state is a 1px "light-leak" bottom border using `vibrant_violet`. 

### Cards & Lists
**Strict Rule:** No dividers between list items. Use 12px of vertical `body-md` spacing to separate tasks. Grouping is achieved by placing a set of items on a `surface_container_lowest` rounded-rect (radius: `lg`).

### Chips
Use `surface_container_high` with a `full` (pill) radius. The text should be `label-md`. When selected, the chip transforms into the `electric_indigo` accent color.

---

## 6. Do’s and Don'ts

### Do:
*   **Use Asymmetry:** Place large headlines off-center to create a modern, editorial rhythm.
*   **Embrace Motion:** Every interaction (hover, click, toggle) must have a "fluid and bouncy" spring (Damping: 0.7, Stiffness: 120).
*   **Layer Glass:** Use nested `backdrop-blur` to create a sense of "digital thickness."

### Don't:
*   **Don't use 100% Black:** Always use `surface_container_lowest` (#0E0E0E) or `background` (#131313) to keep the "obsidian" look soft and premium.
*   **Don't use solid borders:** Never use a solid 1px border to separate the sidebar from the main content. Use a transition in surface tone instead.
*   **Don't crowd the UI:** If an interface feels "busy," increase the vertical white space rather than adding more lines or containers.