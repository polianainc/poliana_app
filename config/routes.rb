PolianaApp::Application.routes.draw do

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  resources :invitations

  devise_for :users, :path => '', :path_names => { :sign_in => "login", :sign_out => "logout" },
			:controllers => { omniauth_callbacks: "auth_callbacks" } do
	  get "/signup/:key" => "beta#new", :as => :beta_signup
	  post "beta/" => "beta#create", :as => :beta_registration
  end

  get "static_pages/about", to: "static_pages#about"
  get "static_pages/policy", to: "static_pages#policy"
  get "static_pages/terms", to: "static_pages#terms"
  get "static_pages/landing", to: "static_pages#landing"
  get "mailchimp_signup", to: "static_pages#mailchimp_signup"

  get "investors", :to => 'static_pages#investors'

  get "invite", :to => "invitations#new"

  root :to => "static_pages#landing"
end