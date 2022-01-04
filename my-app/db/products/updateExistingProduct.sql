UPDATE site_cart
SET product_quantity = ($1)
WHERE id = ($2)