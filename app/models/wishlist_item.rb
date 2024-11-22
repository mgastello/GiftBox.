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
# require "httparty"

class WishlistItem < ApplicationRecord
  belongs_to :wishlist

  enum :status, [:wished, :fulfilled]

  def self.fetch_product_details(url)
    # sleep(rand(2..5))
    headers = {
      'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language' => 'en-US,en;q=0.5',
      'Accept-Encoding' => 'gzip, deflate, br',
      'Connection' => 'keep-alive',
      'Upgrade-Insecure-Requests' => '1',
      'Cache-Control' => 'max-age=0',
      'sec-ch-ua' => '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile' => '?0',
      'sec-ch-ua-platform' => '"macOS"',
      'Sec-Fetch-Dest' => 'document',
      'Sec-Fetch-Mode' => 'navigate',
      'Sec-Fetch-Site' => 'none',
      'Sec-Fetch-User' => '?1'
    }

    response = HTTParty.get(url, 
      headers: headers,
      follow_redirects: true,
      verify: false
    )

    dom = Nokogiri::HTML(response.body)
    
    # Multiple fallback selectors for title
    title = dom.css('meta[property="og:title"]').first&.[]("content") ||
            dom.css('h1').first&.text&.strip ||
            dom.css('title').first&.text&.strip

    # Multiple fallback selectors for image
    image = dom.css('meta[property="og:image"]').first&.[]("content") ||
            dom.css('meta[property="product:image"]').first&.[]("content") ||
            dom.css('img[data-main-image]').first&.[]("src")

    # Multiple fallback selectors for description
    description = dom.css('meta[name="description"]').first&.[]("content") ||
                  dom.css('meta[property="og:description"]').first&.[]("content")

    WishlistItem.new(title:, image_url: image, description:, product_url: url)
  end
end