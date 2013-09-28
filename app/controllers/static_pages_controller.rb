class StaticPagesController < ApplicationController
  def about
  end

  def policy
  end

  def terms
  end
  
  def landing
  end
  
  def investors
  end
  
  def mailchimp_signup
    gb = Gibbon::API.new("e30680ef84b786d6d9cbfc173529a8e3-us7")
    
    if gb.lists.subscribe({:id => 'f21dcc0b54', :email => {:email => params[:email]}, :merge_vars => {:FNAME => params[:fname], :LNAME => params[:lname]}, :double_optin => false})
      render :inline => "Success"
    else
      render :inline => "Nope"
    end
  end
  
  def kitchen
  end
end