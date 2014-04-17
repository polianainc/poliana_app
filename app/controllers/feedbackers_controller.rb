class FeedbackersController < ApplicationController

  def index
    @feedbackers = Feedbacker.all
  end

  def new
    @feedbacker = Feedbacker.new
  end

  def create
    @feedbacker = Feedbacker.new(feedbacker_params)
    @feedbacker.save!
  rescue ActiveRecord::RecordNotSaved
    flash[:notice] = 'Unable to create user'
  end

  private

    def feedbacker_params
      params.require(:feedbacker).permit(:name, :email, :description, :link, :image)
    end

end
