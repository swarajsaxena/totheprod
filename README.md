# WWW Monorepo

A modern monorepo powered by Turborepo.

## What's inside?

This monorepo includes the following apps:

### Apps

- `ui`: a [Next.js](https://nextjs.org/) app with TypeScript and TailwindCSS

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0

### Installation

```bash
bun install
```

### Development

To develop all apps:

```bash
bun dev
```

To develop specific app:

```bash
bun --filter ui dev
```

### Build

To build all apps:

```bash
bun build
```

### Other Commands

- `bun lint` - Lint all apps
- `bun format` - Format all files with Prettier
- `bun clean` - Clean all build artifacts

## Turborepo

This monorepo uses [Turborepo](https://turbo.build/repo) for:

- Fast incremental builds
- Smart caching
- Remote caching support
- Parallel execution

