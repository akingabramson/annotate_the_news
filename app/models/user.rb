class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username
  validates :username, presence: true, uniqueness: true

  has_many :submitted_articles, class_name: "Article", foreign_key: :submitter_id, inverse_of: :submitter
  has_many :annotations, foreign_key: :annotator_id, inverse_of: :annotator
  
end
