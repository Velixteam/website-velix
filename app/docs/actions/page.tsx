import React from 'react';
import { Section, P, CodeBlock, Callout, IC, PageNavigation } from "../../../components/DocsComponents";

export const metadata = { title: "Server Actions - Velix Documentation" };

export default function ServerActionsPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> Server <span className="mx-2">/</span> <span className="text-velix-cyan">Server Actions</span>
      </div>

      <Section title="Mutations with Server Actions">
        <P>Server Actions are the built-in way to handle form submissions and data mutations in Velix. They provide end-to-end type safety and automatic validation via Zod.</P>
        
        <h3 className="text-xl font-bold text-white mb-4 mt-8">Defining an Action</h3>
        <P>Define actions in the <IC>server/actions/</IC> directory. Use the <IC>serverAction</IC> utility and pass a Zod schema.</P>
        <CodeBlock filename="server/actions/user.ts">{`import { serverAction } from 'velix/server';
import { z } from 'zod';
import { db } from '../lib/db';

const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export const updateProfile = serverAction(UpdateProfileSchema, async (data, ctx) => {
  // data is fully typed as { name: string, email: string }
  // and is guaranteed to be valid at this point
  
  await db.users.update(ctx.userId, data);
  
  return { success: true };
});`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Using Actions on the Client</h3>
        <P>Import the action into a client component and use the <IC>useAction</IC> hook.</P>
        <CodeBlock filename="app/profile/ProfileForm.tsx">{`"use client";
import { useAction } from 'velix/client';
import { updateProfile } from '../../server/actions/user';

export default function ProfileForm() {
  const { execute, isPending, fieldErrors } = useAction(updateProfile, {
    onSuccess: () => alert('Profile updated!'),
    onError: (err) => console.error(err)
  });

  return (
    <form action={execute}>
      <input name="name" type="text" />
      {fieldErrors?.name && <span className="error">{fieldErrors.name}</span>}
      
      <input name="email" type="email" />
      {fieldErrors?.email && <span className="error">{fieldErrors.email}</span>}
      
      <button disabled={isPending}>Save</button>
    </form>
  );
}`}</CodeBlock>
        
        <Callout type="danger" title="Validation is Mandatory">
          For security reasons, you cannot create a Server Action in Velix without providing a Zod schema. This prevents malicious payloads from bypassing client-side validation.
        </Callout>

      </Section>

      <PageNavigation 
        prev={{ title: "Loaders", href: "/docs/loaders" }}
        next={{ title: "Error Handling", href: "/docs/error-handling" }} 
      />
    </>
  );
}
