require 'spec_helper'

describe Politician do
  before do
    @politician = Politician.new(
      :first_name => "Barack", 
      :last_name => "Obama", 
      :birthday => Date.new(1961, 8, 4), 
      :party => "Democrat",
      :bioguide_id => "O000167")
  end

  subject { @politician }

  it { should respond_to(:first_name) }
  it { should respond_to(:last_name) }
  it { should respond_to(:bioguide_id) }
  it { should respond_to(:party) }
  it { should respond_to(:birthday) }
  it { should be_valid }

  it { should have_searchable_field(:first_name) }
  it { should have_searchable_field(:last_name) }
  it { should have_searchable_field(:party) }

end