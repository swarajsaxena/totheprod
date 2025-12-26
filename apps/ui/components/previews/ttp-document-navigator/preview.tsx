"use client"

import { TtpDocumentNavigator } from "@/components/ui/totheprod-ui/ttp-document-navigator"

export const TtpDocumentNavigatorPreview = () => {
  return (
    <div className="w-full flex-1 items-center gap-8 overflow-auto px-4 py-8">
      <div className="prose dark:prose-invert mx-auto w-full max-w-3xl pt-20 pb-[50vh]">
        <h1>How to Use the Document Navigator Component</h1>

        <h2>Getting Started</h2>
        <p>
          Learn how to use the Document Navigator component for creating table
          of contents with automatic scroll tracking and hierarchical
          navigation.
        </p>

        <h3>Installation</h3>
        <p>
          Integrate the component into your Next.js project to unlock seamless
          sidebar experiences. No custom configuration is required.
        </p>

        <h3>Basic Usage</h3>
        <p>
          Simply drop{" "}
          <code className="rounded bg-muted px-1">
            {"<TtpDocumentNavigator />"}
          </code>{" "}
          into your layout.
        </p>

        <h2>Features</h2>
        <p>
          The Document Navigator is designed for flexibility and intuitive
          navigation. Explore the rich set of features available:
        </p>

        <h3>Collapsible Sections</h3>
        <p>
          Group related pages and content together with simple, interactive
          section toggles.
        </p>

        <h3>Multi-level Nesting</h3>
        <p>
          Supports unlimited navigation depth for even the most complex
          information hierarchies.
        </p>

        <h3>Customizable Styles</h3>
        <p>
          Easily match the component styling to your app’s theme using Tailwind
          CSS utility classes.
        </p>

        <h1>Example Structure and Hierarchy Overview</h1>
        <h3>Sample Sidebar</h3>
        <ul>
          <li>
            <strong>Workspace</strong>
            <ul>
              <li>Home</li>
              <li>
                Projects
                <ul>
                  <li>Roadmap</li>
                  <li>Design Docs</li>
                  <li>
                    Releases
                    <ul>
                      <li>v1.0</li>
                      <li>v2.0</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Team</li>
            </ul>
          </li>
          <li>
            <strong>Resources</strong>
            <ul>
              <li>Documentation</li>
              <li>Tutorials</li>
            </ul>
          </li>
        </ul>

        <h2>Best Practices</h2>
        <ol>
          <li>Keep navigation concise and well-organized.</li>
          <li>Avoid too many nested levels to maintain clarity.</li>
          <li>Highlight the current active section for user orientation.</li>
        </ol>

        <h2>FAQs</h2>
        <h3>Can I customize the icons?</h3>
        <p>
          Yes, you can swap out the default icons for custom ones by providing
          your own React elements.
        </p>

        <h3>Is dark mode supported?</h3>
        <p>
          Absolutely! The component fully supports dark mode using Tailwind’s
          dark variant classes.
        </p>
      </div>
      <TtpDocumentNavigator containerId="preview-scroll-container" />
    </div>
  )
}
