Rails.application.routes.draw do

  resources :items
  
  resources :buckets, only: [:new, :create, :edit, :update, :destroy]

  devise_for :users, controllers: { omniauth_callbacks: "callbacks"}

  resources :users, only: [:show] do
    resources :buckets, only: [:index, :show, :new]
  end

  root to: "buckets#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
