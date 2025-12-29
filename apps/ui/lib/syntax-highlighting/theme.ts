/**
 * Custom Shiki theme configuration
 * Centralized theme for consistent syntax highlighting across all code viewers
 */
export const customTheme = {
  name: "custom-theme",
  colors: {
    "editor.background": "var(--background)",
    "editor.foreground":
      "color-mix(in srgb, var(--foreground) 60%, transparent)",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "var(--muted-foreground)",
        fontStyle: "italic",
      },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: {
        foreground: "var(--primary)",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 85%, transparent)",
      },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 70%, transparent)",
        fontStyle: "italic",
      },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: {
        foreground: "color-mix(in srgb, var(--primary) 90%, transparent)",
      },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.class"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 80%, transparent)",
      },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 95%, transparent)",
      },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 65%, transparent)",
      },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 85%, transparent)",
      },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 75%, transparent)",
      },
    },
    {
      scope: ["support.type.property-name"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 80%, transparent)",
      },
    },
    {
      scope: ["constant.language.boolean", "constant.language.null"],
      settings: {
        foreground: "color-mix(in srgb, var(--foreground) 85%, transparent)",
      },
    },
  ],
}
