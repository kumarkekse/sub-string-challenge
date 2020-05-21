# frozen_string_literal: true

class User::SessionsController < Devise::SessionsController
  before_action :authorize_request, except: :create

  def create
    user = User.find_by_email(params[:email])
    if user&.valid_password?(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { status: 200, id: user.id, email: user.email, token: token }
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
