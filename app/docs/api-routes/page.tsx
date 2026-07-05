import React from 'react';
import { Section, P, CodeBlock, Callout, IC, PageNavigation } from "../../../components/DocsComponents";

export const metadata = { title: "API Routes - Velix Documentation" };

export default function ApiRoutesPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> Server <span className="mx-2">/</span> <span className="text-velix-cyan">API Routes</span>
      </div>

      <Section title="API Routes">
        <P>API routes provide a solution to build your public API with Velix. Any file inside the <IC>server/api/</IC> folder is mapped to <IC>/api/*</IC> and is treated as an API endpoint instead of a page.</P>
        
        <h3 className="text-xl font-bold text-white mb-4 mt-8">Basic Usage</h3>
        <P>Use the <IC>defineRoute</IC> utility to create an API route.</P>
        <CodeBlock filename="server/api/users.ts">{`import { defineRoute, json } from 'velix/server';

export default defineRoute({
  async GET(req) {
    const users = await db.users.findMany();
    return json(users);
  },
  
  async POST(req) {
    const body = await req.json();
    const newUser = await db.users.create(body);
    return json(newUser, { status: 201 });
  }
});`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Dynamic API Routes</h3>
        <P>API routes follow the same file-based routing conventions as pages.</P>
        <CodeBlock filename="server/api/users/[id].ts">{`import { defineRoute, json, VelixHttpError } from 'velix/server';

export default defineRoute({
  async GET(req, { params }) {
    const user = await db.users.findById(params.id);
    
    if (!user) {
      throw new VelixHttpError(404, 'User not found');
    }
    
    return json(user);
  }
});`}</CodeBlock>
        
        <Callout type="info" title="Error Handling">
          Throwing a <IC>VelixHttpError</IC> inside an API route will automatically return a JSON response with the correct status code and message.
        </Callout>

      </Section>

      <PageNavigation 
        prev={{ title: "Routing", href: "/docs/routing" }}
        next={{ title: "Loaders", href: "/docs/loaders" }} 
      />
    </>
  );
}
