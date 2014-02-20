require 'spec_helper'

describe PoliticiansController do
  it "should render a list of politicians in json" do
    request.env['HTTP_ACCEPT'] = 'application/json'
    get 'index'
    JSON.parse(response.body)
  end

  it "should render a valid politician's individual page" do
    get 'show', :id => "O000167"
    response.should render_template :show
  end
end