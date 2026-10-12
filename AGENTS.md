# GoalTree project conventions

## Structure

- Format code after edits (the equivalent of the editor's Alt+Shift+F). Run `npm run format` before finishing code changes.

- Store screens in `src/screens/` and reusable components in `src/components/`.
- Give each component its own directory, using this structure:
  - `Name.tsx`: component implementation.
  - `index.tsx`: component exports.
  - `types.ts`: component types, imported by the implementation.
- Store types shared by multiple components in a separate root-level `types/` directory.
- Use Tailwind CSS for styling, with its Vite plugin and the import in `src/index.css`. Write utility classes directly in component `className` attributes, without `styles` objects or separate `styles.ts` files. Keep dynamic palette class names complete so Tailwind can detect them.
- Use TypeScript/TSX for new components following these conventions. The initial scaffold uses JavaScript; migrate it when implementing the application.

## Product requirements

GoalTree has two tabs:

The site offers selectable color themes for its background, buttons, and surrounding interface. Keep the monthly journal sheet, goal text, MUST/WANT text, and month letter palettes independent of the site theme.

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
