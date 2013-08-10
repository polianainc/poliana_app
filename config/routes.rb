PolianaApp::Application.routes.draw do

  devise_for :users, :path_names => {:sign_in => "login", :sign_out => "logout"}

  get "static_pages/about"

  get "static_pages/policy"

  get "static_pages/terms"

  root :to => "static_pages#about"
end
