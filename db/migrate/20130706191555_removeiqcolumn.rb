class Removeiqcolumn < ActiveRecord::Migration
  def change
    remove_column :users, :iq
  end
end
