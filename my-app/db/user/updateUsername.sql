UPDATE site_users
SET username = ($1)
WHERE id = ($2)