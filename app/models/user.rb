# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      default(""), not null
#  password_digest :string(255)      default(""), not null
#  session_token   :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  iq              :integer          default(0)
#  username        :string(255)
#

class User < ActiveRecord::Base
  
  attr_accessible :email, :password, :username
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  has_many :user_votes

  has_many :submitted_articles, class_name: "Article", foreign_key: :submitter_id, inverse_of: :submitter
  has_many :annotations, foreign_key: :annotator_id, inverse_of: :annotator

  def password=(password)
    p "making password"
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def verify_password(password)
    BCrypt::Password.new(password_digest) == password
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def as_json(options = {})
    super(options.merge({include: [:annotations, :user_votes, :submitted_articles]}))
  end

end
