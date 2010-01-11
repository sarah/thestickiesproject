module NavigationHelpers
  def path_to(page_name)
    case page_name
    when /the sticky stage/
      stickies_path
    when /the new surface page/
      new_surface_path
    when /the surface page for "([^"]*)"/
      surface = Surface.find_by_name($1)
      surface_path(surface)
    else
      raise "Can't find mapping from \"#{page_name}\" to a path.\n" +
        "Now, go and add a mapping in #{__FILE__}"
    end
  end
end

World(NavigationHelpers)
