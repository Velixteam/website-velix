import React from 'react';
import { Section, P, CodeBlock, Callout, IC, PageNavigation } from "../../../components/DocsComponents";

export const metadata = { title: "Routing - Velix Documentation" };

export default function RoutingPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">Routing</span>
      </div>

      <Section title="File-based Routing">
        <P>Velix uses a file-system based router built on the <IC>app/</IC> directory. Each folder represents a route segment, and <IC>page.tsx</IC> makes it publicly accessible.</P>
        
        <h3 className="text-xl font-bold text-white mb-4 mt-8">Static Routes</h3>
        <CodeBlock>{`app/
├── page.tsx          # Maps to /
├── about/
│   └── page.tsx      # Maps to /about
└── contact/
    └── page.tsx      # Maps to /contact`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Dynamic Routes</h3>
        <P>To create a dynamic route, wrap a folder name in brackets (e.g. <IC>[param]</IC>).</P>
        <CodeBlock>{`app/
├── blog/
│   └── [slug]/
│       └── page.tsx  # Maps to /blog/hello-world`}</CodeBlock>
        <P>You can access the dynamic parameters via the props of your page component:</P>
        <CodeBlock filename="app/blog/[slug]/page.tsx">{`export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Catch-all Routes</h3>
        <P>Wrap the parameter in brackets and prefix with three dots to catch all subsequent segments.</P>
        <CodeBlock>{`app/
├── docs/
│   └── [...slug]/
│       └── page.tsx  # Maps to /docs/a, /docs/a/b, etc.`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Nested Layouts</h3>
        <P>Create a <IC>layout.tsx</IC> file to share UI across multiple pages. Layouts preserve state across navigations and do not re-render.</P>
        <CodeBlock filename="app/dashboard/layout.tsx">{`export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>Dashboard Nav</nav>
      <main>{children}</main>
    </section>
  );
}`}</CodeBlock>
      </Section>

      <PageNavigation 
        prev={{ title: "Getting Started", href: "/docs" }}
        next={{ title: "API Routes", href: "/docs/api-routes" }} 
      />
    </>
  );
}
