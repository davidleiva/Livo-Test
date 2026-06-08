---
name: component
description: How to write a React component in this project. Use whenever creating a new component or refactoring an existing one, to keep TypeScript, structure, responsive and accessibility patterns consistent.
---
# Component Authoring

## Pattern
- Functional component, React + TypeScript
- Typed props via an interface named <Component>Props
- Provide sensible defaults so the component renders with no required props (good for Storybook/preview)
- Default export the component
- Style with Tailwind utility classes, mobile-first
- Icon buttons must have aria-label
- Keep components small and composable; lift shared pieces into design-system base components

## Structure of a component file
1. Imports (React, lucide icons, tokens, types)
2. Props interface
3. Component function
4. Default export

## Out of scope
No business logic in presentational components; keep mock data in src/data.
