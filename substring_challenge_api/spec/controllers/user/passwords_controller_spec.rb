require 'rails_helper'

RSpec.describe User::PasswordsController, type: :controller do
  let(:user) { User.create(email: "test#{rand}@yopmail.com", password: '123456', password_confirmation: '123456') }

  describe 'create' do
    it 'should successfully send password reset instructions' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      post :create, params: { email: user.email }
      expect(JSON.parse(response.body)['message']).to eq('password reset instructions sent to email!')
    end

    it 'should contain a jwt token' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      post :create, params: { email: "test#{rand}@yopmail.com" }
      expect(JSON.parse(response.body)['error']).to eq('no such email')
    end
  end

  describe 'update' do
    it 'should successfully reset password' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      reset_token = user.send_reset_password_instructions
      params = { email: user.email, reset_password_token: reset_token, password_confirmation: 'qwerty', password: 'qwerty' }
      patch :update, params: params
      expect(JSON.parse(response.body)['message']).to eq('reset password successful')
    end

    it 'should successfully reset password' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      reset_token = 'SKJSLKSJ'
      params = { email: "test#{rand}@yopmail.com", reset_password_token: reset_token, password_confirmation: 'qwerty', password: 'qwerty' }
      patch :update, params: params
      expect(JSON.parse(response.body)['error']).to eq('User not registered!')
    end
  end
end
