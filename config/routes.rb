Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :wishlists, only: [:index, :show] do
        resources :wishlist_items, only: [:index, :show]
      end
      resources :follows, only: [:index, :create, :destroy]
    end
    resources :wishlists, only: [:create, :update, :destroy]
    resources :wishlist_items, only: [:show, :create, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
