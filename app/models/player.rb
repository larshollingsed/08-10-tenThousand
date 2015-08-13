class Player < ActiveRecord::Base
  
  # gets the score for the submitted dice
  # dice is an Array of face values
  # returns the number of points earned
  def self.score(dice)
    points = 0
    if straight?(dice)
      points = 1500
    elsif three_pairs?(dice)
      points = 750
    else
      points += three_of_kind(dice)
      points += ones(dice)
      points += fives(dice)
      if points == 0 && dice.length == 6
        points = 500
      end
    end
    
    points
    
  end
  
  # gets an organized Array of dice and how many of each was rolled
  # dice is an Array of cube.face Integers
  # Returns a Hash of values and their occurrences in the submitted dice
  def self.get_by_number(dice)
    dice.each_with_object(Hash.new(0)) { |face,counts| counts[face] += 1 }
  end
  
  # checks for a six-dice straight
  # dice is an Array of face values
  # Returns True for a scoring roll or nil for a non-scoring roll
  def self.straight?(dice)
    ([1, 2, 3, 4, 5, 6] - dice) == []
  end
  
  # checks for three pairs (four of a kind != two pairs)
  # dice is an Array of face values
  # returns True for a scoring roll or nil for a non scoring roll
  def self.three_pairs?(dice)
    get_by_number(dice).values == [2, 2, 2]
  end
  
  def self.three_of_kind(dice)
    points = 0
    by_number = get_by_number(dice)
    for x in [2, 3, 4, 5, 6]
      occurrences = by_number[x]
      if occurrences >= 3
        points += x * 100
        if occurrences >= 4
          points += x * 100
          if occurrences >= 5
            points += x * 200
            if occurrences >= 6
              points += x * 400
            end
          end
        end
      end
    end
    points
  end
  
  def self.ones(dice)
    points = 0
    ones = get_by_number(dice)[1]
    if ones == 1
      points += 100
    elsif ones == 2
      points += 200
    elsif ones >= 3
      points += 1000
      if ones >= 4
        points += 1000
        if ones >= 5
          points += 2000
          if ones >= 6 
            points += 4000
          end
        end
      end
    end
    points
  end
  
  # scores for one or two 5s
  # dice is an Array of face values
  # Returns number of points this is worth
  def self.fives(dice)
    # this gets the number of fives
    fives = get_by_number(dice)[5]
    points = 0
    if fives == 1
      points = 50
    elsif fives == 2
      points += 100
    end
    points
  end
  
end
