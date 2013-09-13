PolianaApp::Application.routes.draw do

  get "static_pages/about"
  get "static_pages/policy"
  get "static_pages/terms"
  get "static_pages/landing"
  get "mailchimpSignup", to: "static_pages#mailchimpSignup"

  get "investors", to: 'static_pages#investors'
  get "demo", to: 'bills#index'
  get "bills/:id", to: 'bills#metadata'
  get "bills/cache/:id", to: 'bills#cache'

  root :to => "static_pages#landing"
end
