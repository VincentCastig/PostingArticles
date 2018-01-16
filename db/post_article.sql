INSERT INTO articles(title, category, content) VALUES($1, $2, $3)
RETURNING *