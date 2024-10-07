# == Schema Information
#
# Table name: follows
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  followee_id :bigint           not null
#  follower_id :bigint           not null
#
# Indexes
#
#  index_follows_on_followee_id                  (followee_id)
#  index_follows_on_follower_id                  (follower_id)
#  index_follows_on_follower_id_and_followee_id  (follower_id,followee_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (followee_id => users.id)
#  fk_rails_...  (follower_id => users.id)
#
class Follow < ApplicationRecord
  validates :followee_id, :follower_id, presence: true
  validates :follower, uniqueness: {scope: :followee}
  validate :cannot_follow_self

  belongs_to :followee,
    class_name: :User,
    inverse_of: :followees

  belongs_to :follower,
    class_name: :User,
    inverse_of: :followers

  private

  def cannot_follow_self
    if follower_id == followee_id
      errors.add(:followee_id, "can't be the same as follower")
    end
  end
end
