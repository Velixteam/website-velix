import React from 'react';
import { Section, P, CodeBlock, Callout, IC, PageNavigation } from "../../../components/DocsComponents";

export const metadata = { title: "Loaders - Velix Documentation" };

export default function LoadersPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> Server <span className="mx-2">/</span> <span className="text-velix-cyan">Loaders</span>
      </div>

      <Section title="Data Fetching with Loaders">
        <P>Loaders are the primary way to fetch data for Server-Side Rendering (SSR) in Velix. They run securely on the server before a page is rendered.</P>
        
        <h3 className="text-xl font-bold text-white mb-4 mt-8">Defining a Loader</h3>
        <P>Create a loader in the <IC>server/loaders/</IC> directory using the <IC>defineLoader</IC> utility.</P>
        <CodeBlock filename="server/loaders/post.ts">{`import { defineLoader, NotFoundError } from 'velix/server';
import { db } from '../lib/db';

export const postLoader = defineLoader(async (req, { params }) => {
  const post = await db.posts.find(params.slug);
  
  if (!post) {
    throw new NotFoundError();
  }
  
  return { post };
});`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Using a Loader in a Page</h3>
        <P>Export the loader from your page component and use <IC>InferLoaderData</IC> for end-to-end type safety.</P>
        <CodeBlock filename="app/blog/[slug]/page.tsx">{`import { postLoader } from '../../../server/loaders/post';
import type { InferLoaderData } from 'velix/server';

export const loader = postLoader;

export default function BlogPost({ data }: { data: InferLoaderData<typeof loader> }) {
  // data.post is fully typed here!
  return (
    <article>
      <h1>{data.post.title}</h1>
      <p>{data.post.content}</p>
    </article>
  );
}`}</CodeBlock>
        
        <Callout type="tip" title="Why server/loaders?">
          Keeping your data fetching logic in the <IC>server/</IC> directory ensures that server-side secrets (like database credentials or API keys) are never accidentally leaked to the client bundle.
        </Callout>

      </Section>

      <PageNavigation 
        prev={{ title: "API Routes", href: "/docs/api-routes" }}
        next={{ title: "Server Actions", href: "/docs/actions" }} 
      />
    </>
  );
}
