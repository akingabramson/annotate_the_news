class AddUsername < ActiveRecord::Migration
  def change
    add_column :users, :iq, :integer, default: 0
    add_column :users, :username, :string
  end
end
