class AddTopAndLeftToSticky < ActiveRecord::Migration
  def self.up
    add_column :stickies, :left, :integer
    add_column :stickies, :top, :integer
  end

  def self.down
    remove_column :stickies, :top
    remove_column :stickies, :left
  end
end
