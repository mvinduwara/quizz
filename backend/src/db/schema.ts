import Database from 'better-sqlite3'
import path from 'path'

const DB_PATH = path.join(__dirname, '../../quiz.db')
export const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT    NOT NULL UNIQUE,
    email      TEXT    NOT NULL UNIQUE,
    password   TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS questions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    category    TEXT    NOT NULL,
    difficulty  TEXT    NOT NULL CHECK(difficulty IN ('easy','medium','hard')),
    text        TEXT    NOT NULL,
    code        TEXT,
    opts        TEXT    NOT NULL,
    ans         INTEGER NOT NULL,
    explanation TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS scores (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
    guest_name TEXT,
    category   TEXT    NOT NULL,
    difficulty TEXT    NOT NULL,
    score      INTEGER NOT NULL,
    total      INTEGER NOT NULL,
    pct        INTEGER NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`)

export default db