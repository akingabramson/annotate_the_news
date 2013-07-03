class User < ActiveRecord::Base

  attr_accessible :email, :password, :username
  validates :username, presence: true, uniqueness: true

  has_many :submitted_articles, class_name: "Article", foreign_key: :submitter_id, inverse_of: :submitter
  has_many :annotations, foreign_key: :annotator_id, inverse_of: :annotator

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def verify_password(password)
    BCrypt::Password.new(self.password_digest) == password
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

end
