class AddBackIqColumn < ActiveRecord::Migration
  def change
    add_column :users, :iq, :integer, default: 0
    add_column :annotations, :iq, :integer, default: 0
      
  end
end
