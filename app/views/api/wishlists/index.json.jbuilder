@wishlists.each do |wishlist|
  json.set! wishlist.id do
    json.extract! wishlist, :id, :name, :user_id, :created_at, :updated_at
    json.merge! wishlist.wishlist_items ? { wishlist_items: wishlist.wishlist_items.as_json(only: [:id, :title, :description, :image_url, :product_url, :status]) } : { wishlist_items: [] }
  end
end