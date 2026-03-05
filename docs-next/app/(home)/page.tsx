import Link from "next/link";
import { SparklineGrid } from "@/components/home/SparklineGrid";
import { InteractiveDemo } from "@/components/home/HeroSparklines";
import { CodePreview } from "@/components/home/CodePreview";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 pt-24 pb-6 md:pt-32 md:pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-purple-200)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,var(--color-purple-950)_0%,transparent_70%)] opacity-60" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            React Sparklines
          </span>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-fd-muted-foreground max-w-lg">
          Composable sparkline charts for React.
          <br className="hidden sm:block" />
          Lightweight. Customizable. Built on D3.
        </p>

        <div className="mt-8 flex items-center gap-2 rounded-xl border border-fd-border bg-fd-card px-5 py-3 font-mono text-sm shadow-sm">
          <span className="text-fd-muted-foreground select-none">$</span>
          <span className="text-fd-foreground select-all">
            npm i @lueton/react-sparklines
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/Lueton/react-sparklines"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </section>

      {/* Sparkline Wall */}
      <section className="w-full px-6 py-16 md:py-20">
        <SparklineGrid />
      </section>

      {/* Stats strip */}
      <section className="w-full max-w-4xl mx-auto px-6 py-14 md:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-fd-foreground">~30kb</div>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Gzipped bundle size
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-fd-foreground">TypeScript</div>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Full type safety out of the box
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-fd-foreground">React 16-19</div>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Works with any modern React version
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 py-16 md:py-24 bg-fd-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Start building with sparklines
          </h2>
          <p className="mt-3 text-fd-muted-foreground text-lg">
            Read the docs, explore examples, and ship beautiful inline charts.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-fd-border py-8 px-6 text-center text-sm text-fd-muted-foreground">
        <p>
          Released under the MIT License. Copyright &copy; 2024-present Leon L&uuml;ttger
        </p>
      </footer>
    </>
  );
}
