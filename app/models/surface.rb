class Surface < ActiveRecord::Base
  has_many :stickies
  validates_presence_of :name
  validates_format_of :name, :with => /^([\sa-zA-Z0-9_-]+)$/
  after_validation lambda {|o| o.name = o.name_was }, :if => lambda { |o| o.name.blank? }
  def to_param
    name.parameterize
  end
end
