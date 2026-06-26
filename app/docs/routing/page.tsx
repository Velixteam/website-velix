import React from 'react';
import { Section, P, CodeBlock, PageNavigation, IC } from "../../../components/DocsComponents";

export const metadata = {
  title: "Routing - Velix Documentation",
};

export default function RoutingPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">Routing</span>
      </div>

      <Section title="Routing">
        <P>Velix uses a file-system based router built on the <IC>app/</IC> directory concept.</P>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Static and Dynamic Routes</h3>
        <P>Each <IC>page.tsx</IC> file corresponds to a URL route.</P>
        <CodeBlock>{`app/page.tsx               → /
app/about/page.tsx         → /about
app/blog/[id]/page.tsx     → /blog/123
app/docs/[...slug]/page.tsx→ /docs/a/b/c`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-10">Nested Layouts</h3>
        <P>A <IC>layout.tsx</IC> file wraps all pages within its directory and any subdirectories.</P>
        <CodeBlock filename="app/dashboard/layout.tsx">{`export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
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
