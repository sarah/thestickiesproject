module NavigationHelpers
  def path_to(page_name)
    case page_name
    when /the homepage/i
      root_path
    when /the sign up page/i
      new_user_path
    when /the sign in page/i
      new_session_path
    when /the password reset request page/i
      new_password_path
    when /the new surface page/
      new_surface_path
    when /the surface page for "([^"]*)"$/
      surface = Surface.find_by_name($1)
      surface_path(surface)
    when /the surface page for "([^"]*)" claimed by "([^"]*)"$/
      surface = Surface.find_by_name($1)
      user = User.find_by_email($2)
      user_surface_path(user,surface)
    when /^the surfaces list page$/
      surfaces_path
    when /^the surfaces list page for "([^"]*)"$/
      user = User.find_by_email($1)
      user_surfaces_path(user)
    else
      raise "Can't find mapping from \"#{page_name}\" to a path.\n" +
        "Now, go and add a mapping in #{__FILE__}"
    end
  end
end

World(NavigationHelpers)
