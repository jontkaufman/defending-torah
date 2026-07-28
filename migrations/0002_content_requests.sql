CREATE TABLE IF NOT EXISTS content_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platforms TEXT NOT NULL DEFAULT '[]',
  platform_other TEXT,
  media_types TEXT NOT NULL DEFAULT '[]',
  media_type_other TEXT,
  subjects TEXT NOT NULL DEFAULT '[]',
  subject_other TEXT,
  message TEXT,
  email TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_content_requests_created_at ON content_requests(created_at);
