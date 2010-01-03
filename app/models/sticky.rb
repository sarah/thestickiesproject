class Sticky < ActiveRecord::Base
  validates_presence_of :left,:top
end
