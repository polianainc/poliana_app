class Vote
  include Mongoid::Document
  store_in collection: "votes"
  belongs_to :bill


  def self.find_with_nested_fields(id)
    vote = Vote.find(id)
    yea_ids = vote.yeas.map { |l| l["$id"] }
    nay_ids = vote.nays.map { |l| l["$id"] }
    not_voting_ids = vote.notVoting.map { |l| l["$id"] }
    present_ids = vote.present.map { |l| l["$id"] }


    vote.yeas = Legislator.find(yea_ids)
    vote.nays = Legislator.find(nay_ids)
    vote.notVoting = Legislator.find(not_voting_ids)
    vote.present = Legislator.find(present_ids)
    return vote
  end

end