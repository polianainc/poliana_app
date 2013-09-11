class Bill < ActiveRecord::Base
  attr_accessible :data_id, :result, :sponsor_name, :summary, :title, :as => [:admin, :default]
  validates_presence_of :result, :sponsor_name, :summary, :title
end
