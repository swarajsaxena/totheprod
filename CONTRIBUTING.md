# Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you get started and ensure a smooth collaboration process.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0
- Git

### Initial Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/www.git
   cd www
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names following this convention:

- `feature/description` - For new features
- `fix/description` - For bug fixes
- `docs/description` - For documentation updates
- `refactor/description` - For code refactoring
- `chore/description` - For maintenance tasks

Examples:

- `feature/add-user-authentication`
- `fix/resolve-navigation-bug`
- `docs/update-api-documentation`

### Making Changes

1. **Create a new branch** from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code standards below

3. **Test your changes**

   ```bash
   bun lint
   bun build
   ```

4. **Format and fix code issues**

   ```bash
   bun run biome:fix
   bunx ultracite@latest fix
   ```

5. **Commit your changes** (see commit message guidelines below)

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** on GitHub

## Code Standards

### Code Quality

This project uses **Ultracite** and **Biome** for code formatting and linting. All code must pass these checks before merging.

**Before committing:**

```bash
# Check for issues
bun lint

# Auto-fix issues
bun run biome:fix
bunx ultracite@latest fix
```

### Key Principles

- **Type Safety**: Use explicit types, prefer `unknown` over `any`, leverage TypeScript's type system
- **Modern JavaScript**: Use arrow functions, optional chaining, template literals, destructuring
- **React Best Practices**: Function components, proper hooks usage, semantic HTML, accessibility
- **Code Organization**: Early returns, focused functions, meaningful variable names
- **Performance**: Avoid unnecessary re-renders, use proper image components, optimize imports

See `.cursor/rules/ultracite.mdc` for detailed code standards.

### Component Guidelines

- Use function components with TypeScript
- Follow the existing component structure and naming conventions
- Use TailwindCSS for styling (avoid inline styles or separate CSS files)
- Implement accessibility features (ARIA labels, keyboard navigation, semantic HTML)
- Use icons from the Hugeicons library (see `.cursor/rules/hugeicons.mdc`)

### File Structure

- Keep components focused and single-purpose
- Place shared components in appropriate directories
- Follow the existing directory structure
- Use descriptive file and folder names

## Commit Messages

Follow the **Conventional Commits** format:

```
type(scope): brief description

elaborate details in the body explaining what and why
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

### Examples

```
feat(ui): add user authentication component

implement login form with email and password validation
add error handling and loading states
include accessibility features for keyboard navigation
```

```
fix(nav): resolve navigation menu closing issue

fix bug where menu would not close on mobile devices
add proper event handlers for touch events
```

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All linting checks pass (`bun lint`)
- [ ] Code is properly formatted (`bun run biome:fix`)
- [ ] Changes are tested locally
- [ ] Commit messages follow conventional commits format
- [ ] Branch is up to date with `main`

### PR Description Template

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested your changes.

## Screenshots (if applicable)

Add screenshots for UI changes.
```

### Review Process

1. **Automated Checks**: All PRs must pass CI/CD checks
2. **Code Review**: At least one maintainer must approve
3. **Feedback**: Address any requested changes
4. **Merge**: Once approved, maintainers will merge

## Testing

- Test your changes locally before submitting
- Ensure the app builds successfully (`bun build`)
- Test in different browsers if making UI changes
- Verify accessibility features work correctly

## Questions?

If you have questions or need help:

1. Check existing documentation
2. Review similar issues or PRs
3. Open a discussion or issue on GitHub

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the project

Thank you for contributing! 🎉
