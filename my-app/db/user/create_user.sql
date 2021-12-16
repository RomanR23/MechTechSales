INSERT INTO site_users(
    username,
    first_name,
    last_name,
    password,
    profile_pic
) VALUES ($1,$2,$3,$4,$5)
RETURNING *;