Rails.application.routes.draw do
  resources :string_matches, only: %i[index create destroy]
  devise_for :users, defaults: { format: :json }, controllers: {
    sessions: 'user/sessions',
    registrations: 'user/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
