# frozen_string_literal: true

class User::RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(sign_up_params)
    if @user.save
      render json: { status: 200, email: @user.email,
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
