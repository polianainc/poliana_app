PolianaApp::Application.routes.draw do
  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  resources :invitations
  resources :feedbackers

  devise_for :users, :path => '', :path_names => { :sign_in => "signin", :sign_out => "signout", :sign_up => "120938102948019283" },
			:controllers => { omniauth_callbacks: "auth_callbacks" }

  devise_scope :user do
	  get "/signup/:key" => "beta#new", :as => :beta_signup
	  post "beta/" => "beta#create", :as => :beta_registration
  end

  get "/login", :to => redirect('/signin')
  get "/logout", :to => redirect('/signout')
  get "/signup", :to => redirect('/')

  get "policy", :to => "static_pages#policy"
  get "terms", :to => "static_pages#terms"
  get "mailchimp_signup", :to => "static_pages#mailchimp_signup"

  get "search", :to => "search#search"

  get "/404", :to => "errors#not_found"
  get "/422", :to => "errors#unacceptable"
  get "/500", :to => "errors#internal_error"

  get "/congress/politicians", :to => "politicians#index"
  get "/congress/politicians/:id", :to => "politicians#show"

  root :to => "static_pages#index"
end
