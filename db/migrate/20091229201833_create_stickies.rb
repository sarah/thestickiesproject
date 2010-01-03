class CreateStickies < ActiveRecord::Migration
  def self.up
    create_table :stickies do |t|
      t.text :content
      t.integer :left, :top
      t.timestamps
    end
  end

  def self.down
    drop_table :stickies
  end
end
