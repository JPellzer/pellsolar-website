import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

// First try generate to see what SQL would be created
console.log('=== RUNNING DRIZZLE-KIT GENERATE ===\n');
try {
  const genOutput = execSync('npx drizzle-kit generate', {
    stdio: 'pipe',
    encoding: 'utf-8',
    env: { ...process.env },
    timeout: 60000,
    maxBuffer: 10 * 1024 * 1024
  });
  console.log(genOutput);
} catch (error) {
  console.log(error.stdout || '');
  console.error(error.stderr || '');
  console.error('Generate failed:', error.message);
}

// Then try push
console.log('\n=== RUNNING DRIZZLE-KIT PUSH --FORCE ===\n');
try {
  const output = execSync('npx drizzle-kit push --force', {
    stdio: 'pipe',
    encoding: 'utf-8',
    env: { ...process.env },
    timeout: 180000, // 3 minutes
    maxBuffer: 10 * 1024 * 1024 // 10MB
  });
  console.log(output);
  process.exit(0);
} catch (error) {
  console.log(error.stdout || '');
  console.error(error.stderr || '');
  console.error(error.message);
  process.exit(error.status || 1);
}
