import React from 'react';
import { Section, P, CodeBlock, PageNavigation, IC } from "../../../components/DocsComponents";

export const metadata = {
  title: "Server Actions - Velix Documentation",
};

export default function ActionsPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">Server Actions</span>
      </div>

      <Section title="Server — Actions">
        <P>Server Actions allow you to perform server-side mutations directly from your React components, with built-in Zod validation.</P>
        
        <CodeBlock filename="server/actions/user.ts">{`import { serverAction } from 'velix/server';
import { z } from 'zod';

export const updateProfile = serverAction(
  z.object({ name: z.string().min(2) }),
  async (input, ctx) => {
    const user = await db.users.update(ctx.userId, input);
    return { success: true, user };
  }
);`}</CodeBlock>

        <P>Use them on the client side with the <IC>useAction</IC> hook:</P>
        <CodeBlock filename="app/profile/page.tsx">{`"use client";
import { useAction } from 'velix/client';
import { updateProfile } from '../../server/actions/user';

export default function Profile() {
  const { execute, isPending, fieldErrors } = useAction(updateProfile, {
    onSuccess: (data) => toast('Profile updated!')
  });

  return (
    <form action={execute}>
      <input name="name" />
      {fieldErrors?.name && <span className="error">{fieldErrors.name}</span>}
      <button disabled={isPending}>Save</button>
    </form>
  );
}`}</CodeBlock>
      </Section>

      <PageNavigation 
        prev={{ title: "Loaders", href: "/docs/loaders" }}
        next={{ title: "Error Handling", href: "/docs/error-handling" }} 
      />
    </>
  );
}
