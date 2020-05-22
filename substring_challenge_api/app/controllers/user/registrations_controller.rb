# frozen_string_literal: true

class User::RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(sign_up_params)
    if @user.save
      token = JsonWebToken.encode(user_id: @user.id)
      render json: { status: 200, email: @user.email,
                     token: token,
                     message: 'Registration Successful!' }
    else
      render json: { errors: @user.errors.full_messages,
                     status: :unprocessable_entity }
    end
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation)
  end
end
