class StringMatchesController < ApplicationController
  before_action :authorize_request
  before_action :set_string_match, only: %i[destroy]

  def index
    @string_matches = @current_user.string_matches

    render json: @string_matches
  end

  def create
    @string_match = StringMatch.new(string_match_params)
    @string_match.user = @current_user
    @string_match.result = StringCalService.call(params[:first_string])
                                           .non_continous_substr?(params[:second_string])
    if @string_match.save
      render json: @string_match, status: :created, location: @string_match
    else
      render json: @string_match.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @string_match.destroy
    render json: { status: 'deleted' }
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
