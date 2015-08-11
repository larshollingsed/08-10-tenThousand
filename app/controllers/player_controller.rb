class PlayerController < ApplicationController
  
  def potential_score
    render :json => Player.score(params[:submitted])
  end
  
  def create_players
    noobs = []
    params[:new_players].each do |x|
      noobs << Player.create(name: x[:name], round: 0, total: 0)
    end
    render :json => noobs
  end
  
end
