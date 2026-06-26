import React from 'react';
import { Section, P, CodeBlock, PageNavigation, IC } from "../../../components/DocsComponents";

export const metadata = {
  title: "Error Handling - Velix Documentation",
};

export default function ErrorHandlingPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">Error Handling</span>
      </div>

      <Section title="Error Handling">
        <P>Velix handles errors via a cascading system. If an error occurs, the framework climbs the folder tree to find the closest <IC>error.tsx</IC> or <IC>not-found.tsx</IC> file.</P>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Custom Error Pages</h3>
        <CodeBlock filename="app/error.tsx">{`"use client";
import { defineError } from 'velix';

export default defineError(({ error, reset }) => (
  <div className="error-container">
    <h2>An error occurred!</h2>
    <p>{error.message}</p>
    <button onClick={reset}>Try again</button>
  </div>
));`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-10">Throwing HTTP Errors</h3>
        <P>In your loaders and APIs, use Velix's native error classes to automatically trigger these pages:</P>
        <CodeBlock filename="server/loaders/admin.ts">{`import { ForbiddenError, UnauthorizedError, VelixHttpError } from 'velix';

export const adminLoader = defineLoader(async (ctx) => {
  if (!ctx.user) throw new UnauthorizedError();
  if (!ctx.user.isAdmin) throw new ForbiddenError();
  
  if (ctx.serverLoad > 90) {
    throw new VelixHttpError(503, 'Service overload');
  }
});`}</CodeBlock>
      </Section>

      <PageNavigation 
        prev={{ title: "Server Actions", href: "/docs/actions" }}
        next={{ title: "Deployment", href: "/docs/deployment" }} 
      />
    </>
  );
}
