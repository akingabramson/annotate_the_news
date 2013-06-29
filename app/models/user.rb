class User < ActiveRecord::Base
  attr_accessible :email, :username, :password
  attr_accessor :password

  validates :email, :username, presence: true
  validates :email, :username, uniqueness: true
  validates :password, length: { in: 3..20 }
  
  before_save :encrypt_password


  def encrypt_password
    if password.present?
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def verify_password(password)
    self.password_digest == BCrypt::Password.new(password)
  end

  def reset_session_token!
    self.token = SecureRandom.urlsafe_base64
    self.save!
    self.token
  end

end
