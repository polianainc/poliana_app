PolianaApp::Application.routes.draw do

  devise_for :users, :path_names => {:sign_in => "login", :sign_out => "logout"}

  get "static_pages/about"
  get "static_pages/policy"
  get "static_pages/terms"
  get "static_pages/landing"
  get "mailchimp_signup", to: "static_pages#mailchimp_signup"

  get "bills/scrape", to: 'bills#scrape_congress'
  get "investors", to: 'static_pages#investors'
  get "demo", to: 'bills#index'
  get "bills/:id", to: 'bills#metadata'
  get "bills/cache/:id", to: 'bills#cache'

  root :to => "static_pages#landing"
end
