class User::PasswordsController < Devise::PasswordsController
  before_action :authorize_request, except: %i[create update]
  append_before_action :assert_reset_token_passed, only: :update

  def create
    user = User.find_by_email(params[:email])
    if user.present?
      user.send_reset_password_instructions
      render json: { status: 200,
                     message: 'password reset instructions sent to email!' }
    else
      render json: { error: 'no such email' }
    end
  end

  def update
    user = User.find_by_email(params[:email])
    if user.present?
      if user.reset_password_period_valid? &&
         user.reset_password(params[:password], params[:password_confirmation])
        render json: { status: 200, message: 'reset password successful' }
      else
        user.errors.add(:reset_password_token, :expired)
        render json: { eror: user.errors.full_messages }
      end
    else
      render json: { eror: 'User not registered!' }
    end
  end

  protected

  def assert_reset_token_passed
    return unless params[:reset_password_token].blank?

    render json: { status: :error, message: 'no reset token provided !' }
  end
end
