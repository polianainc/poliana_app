PolianaApp::Application.routes.draw do

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  resources :invitations

  devise_for :users, :path_names => {:sign_in => "login", :sign_out => "logout"},
              :controllers => { omniauth_callbacks: "auth_callbacks" } do
      get "users/sign_up/:key" => "beta#new", :as => :beta_signup
      post "beta/" => "beta#create", :as => :beta_registration
  end

  get "static_pages/about"
  get "static_pages/policy"
  get "static_pages/terms"
  get "static_pages/landing"
  get "mailchimp_signup", to: "static_pages#mailchimp_signup"

  get "investors", to: 'static_pages#investors'

  get "invitations/new", to: "invitations#new"

  root :to => "static_pages#landing"
end
