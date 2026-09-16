# Task 1 — The Interactive Mini-App (Lessons 2.1–2.5)

Student: Chea Panharith

An interactive product catalog built with React 19, TypeScript, and Tailwind CSS featuring state-driven filtering, controlled forms with inline validation, and strict interface type checking.

## Deliverables

### 1. TypeScript Deliberate Error Finding
> When `price` was deliberately passed as a string (e.g. `price: "49.99"`), TypeScript flagged `error TS2322: Type 'string' is not assignable to type 'number'` because the `Product` interface strictly defines `price` as `number`.

### 2. Screenshots
- `screenshots/1_grid_with_badges.png`: Product grid with counts and ternary in-stock / sold-out badges.
- `screenshots/2_filtered_view.png`: State-driven "In stock only" filtered view with live count updates.
- `screenshots/3_validation_error.png`: Controlled form with inline validation errors on empty/invalid inputs.
- `screenshots/4_tsc_passing.png`: Terminal output showing `npx tsc --noEmit` passing with 0 errors.

## Audit Checklist
- Value + onChange on every input (controlled form).
- Zero index keys (stable `id` keys).
- Zero `if` statements inside JSX (ternary and `&&` only).
- Clean `tsc` compilation (`npx tsc --noEmit` passes).
