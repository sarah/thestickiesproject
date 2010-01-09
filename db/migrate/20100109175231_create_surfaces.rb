class CreateSurfaces < ActiveRecord::Migration
  def self.up
    create_table :surfaces do |t|
      t.timestamps
    end
  end

  def self.down
    drop_table :surfaces
  end
end
