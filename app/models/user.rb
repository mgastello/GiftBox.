# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
  has_secure_password

  validates :first_name, :last_name, :email, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validate :custom_password_validation, on: :create, if: :password
  validates :password, length: { in: 8..20 }, allow_nil: true

  has_many :follower_relationships,
    foreign_key: :followee_id,
    class_name: :Follow,
    inverse_of: :followee,
    dependent: :destroy
    
    has_many :followers,
    through: :follower_relationships,
    source: :follower
    
    
    has_many :followee_relationships,
    foreign_key: :follower_id,
    class_name: :Follow,
    inverse_of: :follower,
    dependent: :destroy

  has_many :followees,
    through: :followee_relationships,
    source: :followee

  

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    if user && user.authenticate(password)
      user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64
    end

    token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def custom_password_validation
    valid_patterns = [
        /^(?=.*[a-z])(?=.*[A-Z])(?!.*[<>\s]).{8,20}$/,
        /^(?=.*[a-z])(?=.*\d)(?!.*[<>\s]).{8,20}$/,
        /^(?=.*[a-z])(?=.*[^<>\w\s])(?!.*[<>\s]).{8,20}$/, 
        /^(?=.*[A-Z])(?=.*[^<>\w\s])(?!.*[<>\s]).{8,20}$/, 
        /^(?=.*[A-Z])(?=.*\d)(?!.*[<>\s]).{8,20}$/, 
        /^(?=.*\d)(?=.*[^<>\w\s])(?!.*[<>\s]).{8,20}$/
    ]

    valid_password = valid_patterns.any? { |pattern| password.match?(pattern) }

    unless valid_password
        errors.add(:password, "must contain: 8-20 characters. And 2 of the following: Lowercase letters, Uppercase letters, Numbers, Special characters, except < >")
    end
  end
end
