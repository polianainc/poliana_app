class FeedbackersController < ApplicationController

  def create
    @feedbacker = Feedbacker.new(feedbacker_params)
    @feedbacker.save!
    flash[:success] = "Thanks so much for your feedback!"
    redirect_to root_url
  end

  private
    def feedbacker_params
      params.require(:feedbacker).permit(:name, :email, :description, :link, :image)
    end
end
