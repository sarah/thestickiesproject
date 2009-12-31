class AddXAndYToSticky < ActiveRecord::Migration
  def self.up
    add_column :stickies, :x, :integer
    add_column :stickies, :y, :integer
  end

  def self.down
    remove_column :stickies, :y
    remove_column :stickies, :x
  end
end
