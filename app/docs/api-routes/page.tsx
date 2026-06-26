import React from 'react';
import { Section, P, CodeBlock, Callout, PageNavigation, IC } from "../../../components/DocsComponents";

export const metadata = {
  title: "API Routes - Velix Documentation",
};

export default function ApiRoutesPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">API Routes</span>
      </div>

      <Section title="Server — API Routes">
        <P>Create REST endpoints in <IC>server/api/</IC> by exporting handlers for each HTTP method.</P>
        
        <Callout type="tip" title="Naming Conventions">
          <IC>users.ts</IC> → <IC>/api/users</IC><br/>
          <IC>users.[id].ts</IC> → <IC>/api/users/:id</IC><br/>
          <IC>auth/[...slug].ts</IC> → <IC>/api/auth/*</IC>
        </Callout>

        <CodeBlock filename="server/api/users.ts">{`import { defineRoute, VelixHttpError } from 'velix';

export const GET = defineRoute(async (req, ctx) => {
  const users = await db.users.findMany();
  return Response.json(users);
});

export const POST = defineRoute(async (req, ctx) => {
  const body = await req.json();
  if (!body.email) {
    throw new VelixHttpError(400, 'Email is required');
  }
  const user = await db.users.create(body);
  return Response.json(user, { status: 201 });
});`}</CodeBlock>
      </Section>

      <PageNavigation 
        prev={{ title: "Routing", href: "/docs/routing" }}
        next={{ title: "Loaders", href: "/docs/loaders" }} 
      />
    </>
  );
}
