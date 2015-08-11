class PlayerController < ApplicationController
  
  def potential_score
    render :json => Player.score(params[:submitted])
  end
  
end
