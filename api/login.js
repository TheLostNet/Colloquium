// api/login.js
import bcrypt from 'bcryptjs';

const allowedHashes = [
  '$2a$10$$2b$10$YnldE6T4aL9iIpvJFwRhl.rBhgKmNKSZw1g0YqDLnnJ0t88aN9YXm'
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { password } = req.body;

  if (!password) {
    res.status(400).json({ error: 'Password missing' });
    return;
  }

  const match = allowedHashes.some(hash => bcrypt.compareSync(password, hash));

  if (!match) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  res.status(200).json({ success: true, message: 'Access granted' });
}
