/**
 * Vercel Serverless Function for Velix
 * This handles all SSR requests on Vercel
 */

import { createServer } from '@teamvelix/velix/server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

let serverInstance = null;

export default async function handler(req, res) {
  try {
    // Create or reuse server instance
    if (!serverInstance) {
      serverInstance = await createServer({
        projectRoot,
        mode: 'production'
      });
    }

    // Forward request to Velix server
    const { server } = serverInstance;
    
    // Emit the request to the internal server
    server.emit('request', req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
