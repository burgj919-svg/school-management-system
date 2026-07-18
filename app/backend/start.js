import { MongoMemoryServer } from 'mongodb-memory-server';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function start() {
  console.log('Starting shared in-memory MongoDB...');
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  console.log(`In-memory MongoDB URI: ${uri}`);
  process.env.MONGO_URI = uri;

  // Seed the database (intercept process.exit so seed doesn't kill the server)
  console.log('\nSeeding database...');
  process.exit = () => { /* seed's process.exit intercepted to keep server alive */ };
  await import('./seed.js');

  // Start the main server
  console.log('\nStarting Express server...');
  await import('./index.js');
}

start().catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1);
});
