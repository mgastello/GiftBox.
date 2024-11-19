class CreateWishlists < ActiveRecord::Migration[7.0]
  def change
    create_table :wishlists do |t|
      t.string :name, null: false
      t.belongs_to :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
