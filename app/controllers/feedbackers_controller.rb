class FeedbackersController < ApplicationController

  def create
    @feedbacker = Feedbacker.new(feedbacker_params)
    @feedbacker.save!
  end

  private
    def feedbacker_params
      params.require(:feedbacker).permit(:name, :email, :description, :link, :image)
    end
end
