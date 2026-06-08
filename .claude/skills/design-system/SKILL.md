---
name: design-system
description: Design tokens, base components and visual rules for this project. Use whenever creating or editing any UI component, screen, or visual element to keep colors, spacing, typography and patterns consistent.
---
# Design System

## Tokens (always use these, never hardcode)
Colors are semantic. Import from src/tokens.
- Neutral: backgrounds, text, borders — the default. Most of the UI is neutral.
- Green = stable / safe / resolved
- Amber = fragile / has-cost / warning
- Red = risk / critical
- Blue = primary action / the agent
Spacing scale: 4 / 8 / 12 / 16 / 18 / 24 px. Generous whitespace.
Typography: clear hierarchy, limited sizes. Body 13-14px, titles 15-18px, labels 11px uppercase.
Radius: medium for cards/buttons, large for containers.

## Base components to build and reuse
- StatusBadge: small pill, semantic color (high/medium/low criticality, stable/fragile/cost)
- ConsequenceLayer: a labeled row showing impact (today / this week / this month)
- OptionCard: a nurse option with name, pros/cons, semantic status
- StickyActionBar: bottom-anchored action area with primary + secondary buttons and a friction microcopy
- ScreenShell: header + scrollable content + sticky action bar layout, responsive

## Rules
- Mobile-first. Use Tailwind responsive prefixes (md:, lg:) to expand for desktop.
- Color only when semantic. Never decorative color.
- Every interactive element accessible (aria-labels on icon buttons).
- Components take typed props, sensible defaults.

## Out of scope
This skill does not handle deploy, routing, or data fetching.
