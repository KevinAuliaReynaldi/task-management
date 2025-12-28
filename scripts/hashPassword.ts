// scripts/hashPassword.ts
import { hash } from 'bcrypt';

async function generateHashedPasswords() {
  const passwords = ['admin123', 'user123'];
  
  for (const password of passwords) {
    const hashed = await hash(password, 10);
    console.log(`${password}: ${hashed}`);
  }
}

generateHashedPasswords();