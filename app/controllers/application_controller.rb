class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :add_feedbacker

  def add_feedbacker
    @feedbacker = Feedbacker.new
  end
end
