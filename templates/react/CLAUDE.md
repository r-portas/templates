# CLAUDE.md

## Code Style

- All exports need a tsdoc comment, in the following format:
  ```ts
  /**
   * <short description>
   *
   * @param myParam - <short description>
   * ...
   *
   * @remarks
   * <optional: mention any behaviour that might trip up another developer>
   *
   * @example
   * \`\`\`ts
   * <example usage>
   * \`\`\`
   */
  ```
- Inline Comments
  - Add inline comments for any non-obvious behavior
  - Inline comments should explain the _why_
  - Inline comments should be concise and useful (1-2 lines max)

## Testing

- Always use Bun's test runner (`bun test`), see [the documentation](https://bun.com/docs/test.md) for more information.
- Before writing tests, extract pure functions and presentational components out of components with side effects so tests don't need runtime context.
