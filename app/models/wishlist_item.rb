# == Schema Information
#
# Table name: wishlist_items
#
#  id          :bigint           not null, primary key
#  description :text
#  image_url   :string
#  product_url :text
#  status      :integer          default(0)
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  wishlist_id :bigint
#
# Indexes
#
#  index_wishlist_items_on_wishlist_id  (wishlist_id)
#
require "open-uri"

class WishlistItem < ApplicationRecord
  belongs_to :wishlist

  enum :status, [:wished, :fulfilled]

  def self.fetch_product_details(url)
    text = URI.open(url, &:read)
    dom = Nokogiri::HTML(text)
    title = dom.css('meta[property="og:title"]').first["content"]
    image = dom.css('meta[property="og:image"]').first["content"]
    description = dom.css('meta[name="description"]').first["content"]

    WishlistItem.new(title:, image_url: image, description:, product_url: url)
  end
end
