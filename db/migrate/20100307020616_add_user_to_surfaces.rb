class AddUserToSurfaces < ActiveRecord::Migration
  def self.up
    add_column :surfaces, :user_id, :integer
  end

  def self.down
    remove_column :surfaces, :user_id
  end
end
