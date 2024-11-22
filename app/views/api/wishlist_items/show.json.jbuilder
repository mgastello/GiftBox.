json.wishlist_item do
  json.extract! @wishlist_item, :id, :title, :status, :description, :image_url, :product_url, :wishlist_id, :updated_at
end