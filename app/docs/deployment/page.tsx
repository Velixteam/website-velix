import React from 'react';
import { Section, P, CodeBlock, Callout, PageNavigation, IC } from "../../../components/DocsComponents";

export const metadata = {
  title: "Deployment - Velix Documentation",
};

export default function DeploymentPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> <span className="text-velix-cyan">Deployment</span>
      </div>

      <Section title="Deployment">
        <P>Deploying to Velix Cloud is native and optimized for the Islands Architecture and Server Actions.</P>

        <CodeBlock filename="Terminal">{`$ velix deploy

▲ Velix Cloud Deployment
  Project: my-app
  Env:     Production

✔ Building project... (3.7s)
✔ Uploading assets...
✔ Provisioning Edge Functions...

🚀 Deployed to https://my-app.velixcloud.io`}</CodeBlock>

        <Callout type="info" title="Environment Variables">
          Manage your environment variables with the <IC>velix env set KEY=value</IC> command or via the Velix Cloud dashboard.
        </Callout>
      </Section>

      <PageNavigation 
        prev={{ title: "Error Handling", href: "/docs/error-handling" }}
      />
    </>
  );
}
