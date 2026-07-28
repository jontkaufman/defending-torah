ALTER TABLE content_requests ADD COLUMN status TEXT NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS idx_content_requests_status ON content_requests(status);
