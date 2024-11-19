class CreateWishlistItems < ActiveRecord::Migration[7.0]
  def change
    create_table :wishlist_items do |t|
      t.belongs_to :wishlist
      t.string :title
      t.text :description
      t.string :image_url
      t.integer :status, default: 0
      t.text :product_url
      t.timestamps
    end
  end
end
