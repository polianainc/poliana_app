class TracksEvents
  def self.track_sign_up(cookies)
    # We don't want any possibility of pounding the 
    # Analytics API when running our test suite.
    return if analytics_turned_off

    tracker = EventTracker.new
    tracker.identify_user_via_cookies(cookies)
    tracker.track(:users, :create)
  end

private

  def self.analytics_turned_off
    Rails.env.test?
  end
end