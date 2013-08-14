PolianaApp::Application.routes.draw do

  devise_for :users, :path_names => {:sign_in => "login", :sign_out => "logout"}

  get "static_pages/about"

  get "static_pages/policy"

  get "static_pages/terms"

  get "bills/scrape", to: 'bills#scrape_congress'
  get "bills/index", to: "bills#index"
  get "bills/:id", to: 'bills#metadata'
  get "bills/cache/:id", to: 'bills#cache'
  

  root :to => "static_pages#about"
end
