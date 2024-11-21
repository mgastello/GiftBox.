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

  require 'zlib'

  def self.fetch_product_details(url)
    headers = {
      'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language' => 'en-US,en;q=0.5',
      'Accept-Encoding' => 'identity',
      'Connection' => 'keep-alive',
      'Cache-Control' => 'no-cache',
      'Pragma' => 'no-cache'
    }

    text = URI.open(url, headers).read
    dom = Nokogiri::HTML(text)
    title = dom.css('meta[property="og:title"]').first["content"]
    image = dom.css('meta[property="og:image"]').first["content"]
    description = dom.css('meta[name="description"]').first["content"]

    WishlistItem.new(title:, image_url: image, description:, product_url: url)
  end
end