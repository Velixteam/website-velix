import React from 'react';
import { Section, P, CodeBlock, PageNavigation, IC } from "../../../components/DocsComponents";

export const metadata = {
  title: "Loaders - Velix Documentation",
};

export default function LoadersPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">Loaders</span>
      </div>

      <Section title="Server — Loaders">
        <P>Loaders fetch data on the server side before rendering the page. They are defined in <IC>server/loaders/</IC>.</P>
        
        <CodeBlock filename="server/loaders/post.ts">{`import { defineLoader, NotFoundError } from 'velix';

export const postLoader = defineLoader(async (ctx) => {
  const post = await db.posts.findById(ctx.params.id);
  if (!post) throw new NotFoundError('Post not found');
  
  return { post };
});`}</CodeBlock>

        <P>Then, bind the loader to your page:</P>
        <CodeBlock filename="app/blog/[id]/page.tsx">{`import { postLoader } from '../../../server/loaders/post';
import type { InferLoaderData } from 'velix';

export const loader = postLoader;

export default function PostPage({ data }: { data: InferLoaderData<typeof loader> }) {
  return <h1>{data.post.title}</h1>;
}`}</CodeBlock>
      </Section>

      <PageNavigation 
        prev={{ title: "API Routes", href: "/docs/api-routes" }}
        next={{ title: "Server Actions", href: "/docs/actions" }} 
      />
    </>
  );
}
