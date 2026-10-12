# GoalTree project conventions

## Structure

- Store screens in `src/screens/` and reusable components in `src/components/`.
- Give each component its own directory, using this structure:
  - `Name.tsx`: component implementation.
  - `index.tsx`: component exports.
  - `styles.ts`: Tailwind utility class strings, imported by the implementation and applied through `className`.
  - `types.ts`: component types, imported by the implementation.
- Store types shared by multiple components in a separate root-level `types/` directory.
- Use Tailwind CSS for styling, with its Vite plugin and the import in `src/index.css`. Keep complete utility class names in `styles.ts` so Tailwind can detect them; avoid inline style objects.
- Use TypeScript/TSX for new components following these conventions. The initial scaffold uses JavaScript; migrate it when implementing the application.

## Product requirements

GoalTree has two tabs:

### Month goal

- Follow the user's journal reference: a large uppercase month heading with each letter colored from that month's seasonal palette, a centered "5 must / 5 want" legend, and two checkbox columns labeled "MUST" and "WANT" on a warm paper background.
- Seasonal month palettes: autumn (September–November) uses brown, orange, and yellow; summer (June–August) uses blue and green; winter (December–February) uses icy blue and white-inspired silver tones that remain visible against the paper background. Spring uses soft botanical colors.
- Each month has "5 must" goals and "5 want" goals.
- Goals have checkboxes that users can check and uncheck.
- Users can select a month from a list.
- Users can add, edit, and remove goals.
- Search covers goals across all months.

### Goal Tree

- Show a list of categories.
- Each category has its own goal tree.
- Users can add goals; each goal becomes a leaf in its category's tree.
- Users can edit and remove goals.

Do not assume additional behavior, storage, or styling-library requirements without supporting user instructions.
