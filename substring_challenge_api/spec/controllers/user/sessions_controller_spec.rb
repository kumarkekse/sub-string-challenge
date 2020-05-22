require 'rails_helper'

RSpec.describe User::SessionsController, type: :controller do
  let(:user) { User.create(email: "test#{rand}@yopmail.com", password: '123456', password_confirmation: '123456') }

  describe 'create' do
    it 'should have status 200' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      post :create, params: { email: user.email, password: '123456' }
      expect(response).to have_http_status(:success)
    end

    it 'should contain a jwt token' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      post :create, params: { email: user.email, password: '123456' }
      expect(response.body).to include('token')
    end
  end
end
