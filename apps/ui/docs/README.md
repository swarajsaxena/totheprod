# Component Documentation

This directory contains MDX documentation files for all UI components.

## Structure

```
docs/
└── components/
    ├── ttp-rauno-sidebar.mdx
    ├── ttp-pixel-loader.mdx
    ├── ttp-wavy-text.mdx
    ├── ttp-horizontal-fade-in.mdx
    └── ttp-perspective-carousel.mdx
```

## Adding New Documentation

1. **Create an MDX file** in the `components/` directory
2. **Reference it** in `app/components/[id]/constants.tsx`

### Example

**File:** `docs/components/my-component.mdx`

````mdx
# My Component

Brief description of your component.

## Features

- Feature 1
- Feature 2

## Installation

```bash
npm install required-packages
```
````

## Usage

```tsx
import { MyComponent } from '@/components/ui/my-component'

export const Example = () => {
  return <MyComponent />
}
```

## Props

| Prop    | Type   | Default   | Description       |
| ------- | ------ | --------- | ----------------- |
| variant | string | 'default' | Component variant |
| size    | string | 'md'      | Component size    |

````

**Reference:** In `constants.tsx`

```tsx
{
  id: ComponentId.MY_COMPONENT,
  title: 'My Component',
  description: 'Brief description',
  preview: <MyComponentPreview />,
  docsPath: 'my-component.mdx',  // Reference this file
}
````

## MDX Features

All standard markdown features are supported:

### Headings

```md
# H1

## H2

### H3
```

### Lists

```md
- Unordered list
- Item 2

1. Ordered list
2. Item 2
```

### Code Blocks

````md
```tsx
const Example = () => <div>Code here</div>
```
````

### Tables

```md
| Column 1 | Column 2 |
| -------- | -------- |
| Data 1   | Data 2   |
```

### Emphasis

```md
**bold** _italic_ ~~strikethrough~~
```

### Links & Images

```md
[Link text](https://example.com)
![Alt text](/image.png)
```

### Blockquotes

```md
> This is a blockquote
```

### GitHub Flavored Markdown

- [x] Task lists
- [ ] Checkboxes
- Tables (shown above)
- Strikethrough

## Best Practices

1. **Be Consistent** - Follow the same structure across all docs
2. **Include Examples** - Show real code examples
3. **Document Props** - Always include a props table
4. **Show Usage** - Demonstrate how to import and use
5. **Add Tips** - Use blockquotes for important notes

### Template Structure

````mdx
# Component Name

Brief one-line description.

## Features

- List key features

## Installation

```bash
npm install packages
```
````

## Usage

```tsx
// Basic example
```

## Props

| Prop  | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| prop1 | type | default | description |

## Examples

### Example 1

Description and code

### Example 2

Description and code

## Best Practices

> Tips and recommendations

## Accessibility

Notes about accessibility features

```

## Notes

- MDX files are read at **build time** and **on-demand** in development
- Files must be in `docs/components/` directory
- File names should match the component ID (kebab-case)
- Use `.mdx` extension for all documentation files

```
