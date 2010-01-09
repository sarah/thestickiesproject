class AddStickiesToSurface < ActiveRecord::Migration
  def self.up
    add_column :stickies, :surface_id, :integer
  end

  def self.down
    remove_column :stickies, :surface_id
  end
end
