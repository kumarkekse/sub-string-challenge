require 'rails_helper'

RSpec.describe StringMatchesController, type: :controller do
  let(:user) { User.create(email: "test#{rand}@yopmail.com", password: '123456', password_confirmation: '123456') }
  let(:token) { JsonWebToken.encode(user_id: user.id) }

  describe 'index' do
    it 'should render successfully' do
      request.headers['Authorization'] = token
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'should render user string matches' do
      user.string_matches.create(first_string: 'abcdefg', second_string: 'beg')
      request.headers['Authorization'] = token
      get :index
      expect(JSON.parse(response.body).count).to eq(1)
    end
  end

  describe 'create' do
    it 'should create a string match with true result' do
      request.headers['Authorization'] = token
      post :create, params: { 'string_match' => { first_string: 'abcdefg', second_string: 'beg' } }
      expect(JSON.parse(response.body)['result']).to eq(true)
    end

    it 'should create a string match with false result' do
      request.headers['Authorization'] = token
      post :create, params: { 'string_match' => { first_string: 'abcadebabdeb', second_string: 'baabbd' } }
      expect(JSON.parse(response.body)['result']).to eq(false)
    end
  end

  describe 'destroy' do
    it 'should delete successfully' do
      string_match = user.string_matches.create(first_string: 'abcdefg', second_string: 'beg')
      request.headers['Authorization'] = token
      get :destroy, params: { id: string_match.id }
      expect(JSON.parse(response.body)['status']).to eq('deleted')
    end
  end
end
