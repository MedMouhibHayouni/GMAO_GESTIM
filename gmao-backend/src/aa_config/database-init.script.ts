import { Client } from 'pg';

export async function ensureDatabaseExists() {
  const client = new Client({
    user: process.env.DB_USERNAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres', // Default DB to query pg_database
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`,
    );

    if (!res.rows[0]) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`✅ Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`🟢 Database "${process.env.DB_NAME}" already exists.`);
    }
  } catch (err) {
    console.error('❌ Error checking/creating database:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}
