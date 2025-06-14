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

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password missing' });
  }

  for (const hash of allowedHashes) {
    const match = await bcrypt.compare(password, hash);
    if (match) {
      return res.status(200).json({ success: true });
    }
  }

  return res.status(401).json({ error: 'Invalid password' });
}
