import React from 'react';
import { Section, P, CodeBlock, Callout, IC, PageNavigation } from "../../../components/DocsComponents";

export const metadata = { title: "Deployment - Velix Documentation" };

export default function DeploymentPage() {
  return (
    <>
      <div className="text-sm text-slate-500 mb-8 font-mono">
        Docs <span className="mx-2">/</span> Production <span className="mx-2">/</span> <span className="text-velix-cyan">Deployment</span>
      </div>

      <Section title="Deploying to Production">
        <P>Velix is designed to be deployed anywhere that supports Node.js or Edge runtimes. However, deploying to Velix Cloud offers a zero-configuration experience with automatic global CDN distribution.</P>
        
        <h3 className="text-xl font-bold text-white mb-4 mt-8">Deploying to Velix Cloud</h3>
        <P>To deploy your application to Velix Cloud, run the following command from your project root:</P>
        <CodeBlock filename="Terminal">{`velix deploy`}</CodeBlock>
        <P>This command will automatically build your application, optimize your assets, and deploy to our global Edge Network.</P>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Environment Variables</h3>
        <P>Velix automatically loads variables from <IC>.env</IC>, <IC>.env.local</IC>, <IC>.env.development</IC>, and <IC>.env.production</IC> depending on the environment.</P>
        <Callout type="warning" title="Prefixing Variables">
          Variables that should be accessible in the client browser MUST be prefixed with <IC>VELIX_PUBLIC_</IC>. All other variables are only accessible securely on the server.
        </Callout>
        
        <CodeBlock filename=".env">{`# Accessible only on the server (e.g. in loaders or API routes)
DATABASE_URL="postgres://user:pass@localhost:5432/db"

# Accessible on both server and client
VELIX_PUBLIC_API_URL="https://api.example.com"`}</CodeBlock>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Custom Domains</h3>
        <P>You can easily map a custom domain to your Velix Cloud deployment via the CLI:</P>
        <CodeBlock filename="Terminal">{`velix domains add my-awesome-app.com`}</CodeBlock>
        <P>This will automatically provision SSL certificates and set up DNS records if you are using our nameservers.</P>
      </Section>

      <PageNavigation 
        prev={{ title: "Error Handling", href: "/docs/error-handling" }}
      />
    </>
  );
}
