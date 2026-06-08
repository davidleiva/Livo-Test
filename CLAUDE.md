# Livo Incident Resolution — Project Context

## What this is
A clickable prototype for a hospital workforce incident-resolution tool. A nursing manager handles last-minute staff absences. An AI agent proposes a resolution; the manager validates it. Built for a design challenge. Responsive: mobile (crisis) and desktop (expanded/editing).

## Core thesis
The system doesn't replace the manager's decision — it makes it safe. It shows what happens today, what's sacrificed this week, and how much "debt" the decision creates against the monthly plan. All in seconds.

## Design principles (apply everywhere)
1. Consequences, not just recommendations. Every option shows impact across three time layers: today / this week / this month.
2. Time is a design constraint. The crisis moment is mobile, on the go. Decisions possible in seconds.
3. Visible debt. "Solved today" isn't enough — if a fix leaves the plan fragile, the manager sees it before committing.
4. AI-native, human-in-the-loop. The agent decides and proposes; the human validates. Never auto-applies critical changes.
5. Deliberate friction on validation. The validate action is reachable but never optimized for a reflex tap — consequences are read first.

## The 3 key moments
- Moment 1 (Incident + agent decision): The agent has resolved the incident and presents its decision for the manager to validate.
- Moment 2 (Agent reasoning): Why it chose this option vs the ones it discarded, with consequences per option.
- Moment 3 (Validation): What changes, what does NOT change, resulting debt, who's affected. Manager validates the assignment.

## Domain rules (Catalan nursing regulation)
- System only proposes legally viable options (respects rest periods, doesn't exceed contracted hours, no collective-agreement conflict).
- Manager assigns; the nurse can reject with justified cause.
- A validated shift is "assigned, pending nurse response" — not closed until the nurse responds.

## The example case (use throughout)
- Incident: Laura García, ICU night nurse (22:00–06:00), sick leave, shift starts in 4h. High criticality. ICU needs 4 nurses, now has 3.
- Recommended: Carmen Ruiz — covers it, no overtime, same specialty, keeps plan stable with margin.
- Alternatives: Ana Torres (covers but +4h overtime, exceeds agreement), Split shift María+Sara (covers but leaves plan fragile).

## Tech stack
- React + TypeScript + Vite + Tailwind + lucide-react
- Mobile-first responsive, real desktop layout too
- Component-driven: small reusable design system
- Deploy target: Vercel

## Visual direction
- Clean, calm, healthcare-appropriate. Not flashy.
- Color is semantic only: green = stable/safe, amber = fragile/cost, red = risk/critical, blue = primary action / agent. Neutral by default; color appears only when it carries meaning.
- Generous whitespace. Hierarchy over decoration.
