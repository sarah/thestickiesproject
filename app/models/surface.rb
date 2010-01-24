class Surface < ActiveRecord::Base
  has_many :stickies

  validates_presence_of :name
  validates_uniqueness_of :name
  validates_format_of :name, :with => /^([\sa-zA-Z0-9_-]+)$/

  after_validation lambda {|o| o.name = o.name_was }, :if => lambda { |o| o.name.blank? }

  has_friendly_id :name, :use_slug => true
end
