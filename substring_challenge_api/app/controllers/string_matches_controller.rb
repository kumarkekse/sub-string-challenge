class StringMatchesController < ApplicationController
  before_action :authorize_request
  before_action :set_string_match, only: %i[destroy]

  def index
    @string_matches = @current_user.string_matches

    render json: @string_matches
  end

  def create
    @string_match = @current_user.string_matches.build(string_match_params)
    if @string_match.save
      render json: @string_match, status: :created, location: @string_match
    else
      render json: @string_match.errors, status: :unprocessable_entity
    end
  end

  def destroy
    string_match = @current_user.string_matches.find(@string_match.id)
    if string_match
      string_match.destroy
      render json: { status: 'deleted' }
    else
      render json: { status: 'String match not matched with user' }
    end
  end

  private

  def set_string_match
    @string_match = StringMatch.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { error: e }
  rescue StandardError => e
    render json: { error: e }
  end

  def string_match_params
    params.require(:string_match).permit(:first_string, :second_string)
  end
end
