@wishlist_items.each do |wishlist_item|
  json.set! wishlist_item.id do
    json.extract! wishlist_item, :id, :title, :status, :description, :image_url, :product_url, :wishlist_id, :updated_at
  end
end