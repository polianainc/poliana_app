class StaticPagesController < ApplicationController
  caches_page :index
  caches_page :policy
  caches_page :terms

  def index
  end

  def policy
  end

  def terms
  end

  def mailchimp_signup
    gb = Gibbon::API.new("e30680ef84b786d6d9cbfc173529a8e3-us7")

    if gb.lists.subscribe({:id => 'f21dcc0b54', :email => {:email => params[:email]}, :merge_vars => {:FNAME => params[:fname], :LNAME => params[:lname]}, :double_optin => false})
      render :inline => "Success"
    else
      render :inline => "Nope"
    end
  end
end
