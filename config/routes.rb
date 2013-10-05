PolianaApp::Application.routes.draw do

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  resources :invitations

  devise_for :users, :path => '', :path_names => { :sign_in => "login", :sign_out => "logout" },
			:controllers => { omniauth_callbacks: "auth_callbacks" }
  devise_scope :user do
	  get "/signup/:key" => "beta#new", :as => :beta_signup
	  post "beta/" => "beta#create", :as => :beta_registration
  end

  get "about", :to => "static_pages#about"
  get "policy", :to => "static_pages#policy"
  get "terms", :to => "static_pages#terms"
  get "mailchimp_signup", :to => "static_pages#mailchimp_signup"
  get "team", :to => "static_pages#team"
  get "contact", :to => "static_pages#contact"
  get "faq", :to => "static_pages#faq"
  get "mission", :to => "static_pages#mission"
  get "kitchensink", :to => 'static_pages#kitchen'

  get "invite", :to => "invitations#new"

  root :to => "static_pages#index"
end