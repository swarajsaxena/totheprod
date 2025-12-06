# Component Inspirations Field Guide

## Overview

Components can now have multiple inspiration credits using the `inspirations` array.

## Type Definition

```typescript
type ComponentInspiration = {
  label: string      // Name of person, company, or project
  href?: string      // Optional link to their website/profile
}

type ComponentMetadata = {
  // ... other fields
  inspirations?: ComponentInspiration[]
}
```

## Usage Examples

### Single Inspiration with Link

```typescript
{
  id: ComponentId.COMMAND_PALETTE,
  title: "Command Palette",
  // ... other fields
  inspirations: [
    {
      label: "Raycast",
      href: "https://raycast.com",
    },
  ],
}
```

### Multiple Inspirations

```typescript
{
  id: ComponentId.TICKER_SIDEBAR,
  title: "Ticker Sidebar",
  // ... other fields
  inspirations: [
    {
      label: "Rauno Freiberg",
      href: "https://rauno.me",
    },
    {
      label: "@raunofreiberg",
      href: "https://twitter.com/raunofreiberg",
    },
  ],
}
```

### Inspiration Without Link

```typescript
{
  id: ComponentId.SOME_COMPONENT,
  title: "Some Component",
  // ... other fields
  inspirations: [
    {
      label: "John Doe", // No href - just credit
    },
    {
      label: "Jane Smith",
      href: "https://janesmith.com", // This one has a link
    },
  ],
}
```

## Current Inspirations

### Document Navigator
- **Notion** (https://notion.so)

### Command Palette
- **Raycast** (https://raycast.com)

### Ticker Sidebar
- **Rauno Freiberg** (https://rauno.me)
- **@raunofreiberg** (https://twitter.com/raunofreiberg)

## Benefits

1. ✅ **Multiple Credits** - Can credit multiple sources of inspiration
2. ✅ **Flexible Links** - href is optional for each inspiration
3. ✅ **Consistent Format** - Simple label + optional link structure
4. ✅ **Easy to Display** - Can render as badges, links, or credits section
5. ✅ **Backwards Compatible** - Empty array or undefined works fine

## Rendering Example

```tsx
// Example of how to display inspirations
{component.inspirations && component.inspirations.length > 0 && (
  <div className="flex gap-2">
    <span className="text-muted-foreground">Inspired by:</span>
    {component.inspirations.map((inspiration, i) => (
      <span key={i}>
        {inspiration.href ? (
          <a 
            href={inspiration.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {inspiration.label}
          </a>
        ) : (
          <span>{inspiration.label}</span>
        )}
      </span>
    ))}
  </div>
)}
```

