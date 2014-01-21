class EventTracker
  def initialize
    # My Google Analytics tracking code and domain are
    # stored in environment variables. That makes them
    # easy to use on Heroku.
    @gabba = Gabba::Gabba.new("UA-42980806-1", "poliana.com")
  end

  def track(category, action, label = nil, value = nil)
    label = label.to_s if label
    # Calling to_s on the arguments before we pass them in
    # allows us to call this method with symbols instead
    # of strings.
    @gabba.event(category.to_s, action.to_s, label, value)
  end

  def identify_user_via_cookies(cookies)
    # Wrapping this method allows us to DRY the logic
    # about which particular cookies to send instead of
    # duplicating it in each controller which identifies
    # users.
    @gabba.identify_user(cookies[:__utma], cookies[:__utmz])
  end
end