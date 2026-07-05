import React from 'react';
import { Section, P, CodeBlock, Callout, IC, PageNavigation } from "../../../components/DocsComponents";

export const metadata = { title: "Error Handling - Velix Documentation" };

export default function ErrorHandlingPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> Core <span className="mx-2">/</span> <span className="text-velix-cyan">Error Handling</span>
      </div>

      <Section title="Error Boundaries">
        <P>Velix provides an intuitive, file-based error handling system based on React Error Boundaries. It catches runtime errors and displays a fallback UI instead of crashing the entire application.</P>
        
        <h3 className="text-xl font-bold text-white mb-4 mt-8">error.tsx</h3>
        <P>Create an <IC>error.tsx</IC> file to handle unexpected exceptions in your route segments.</P>
        <CodeBlock filename="app/error.tsx">{`"use client";
import { defineError } from 'velix/client';

export default defineError(({ error, reset }) => {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
});`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">not-found.tsx</h3>
        <P>Create a <IC>not-found.tsx</IC> file to customize the 404 page for a specific route segment or the entire app.</P>
        <CodeBlock filename="app/not-found.tsx">{`import { defineNotFound } from 'velix/server';

export default defineNotFound(() => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
});`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Triggering Errors</h3>
        <P>In your loaders or API routes, you can throw HTTP errors using Velix's built-in error classes.</P>
        <CodeBlock filename="server/loaders/post.ts">{`import { defineLoader, NotFoundError, ForbiddenError } from 'velix/server';

export const requireAdmin = defineLoader(async (req) => {
  const user = await getUser(req);
  
  if (!user) {
    throw new ForbiddenError('You must be logged in');
  }
  
  if (user.role !== 'admin') {
    throw new NotFoundError(); // Obfuscate existence for non-admins
  }
  
  return user;
});`}</CodeBlock>

        <Callout type="info" title="Development vs Production">
          In development, Velix displays a highly detailed error overlay with your source code and a paginated call stack. In production, this overlay is hidden to prevent leaking sensitive information, and the <IC>error.tsx</IC> UI is shown instead.
        </Callout>

      </Section>

      <PageNavigation 
        prev={{ title: "Server Actions", href: "/docs/actions" }}
        next={{ title: "Deployment", href: "/docs/deployment" }} 
      />
    </>
  );
}
