const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to UI App
        </h1>

        <p className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          A modern Next.js application built with TypeScript and TailwindCSS in a Turborepo monorepo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-2">Next.js 14</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Built with the latest App Router and React Server Components.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-2">TypeScript</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fully typed for better developer experience and code quality.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-pink-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-2">TailwindCSS</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Utility-first CSS framework for rapid UI development.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            tabIndex={0}
            aria-label="Read Next.js documentation"
          >
            Documentation
          </a>

          <a
            href="https://turbo.build/repo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
            tabIndex={0}
            aria-label="Learn about Turborepo"
          >
            Learn Turborepo
          </a>
        </div>
      </div>
    </main>
  )
}

export default Home

