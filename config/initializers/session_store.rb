# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_thestickiesproject_session',
  :secret      => '2ed002b80914fcf446c0644ca4b661e96327ee1e90480fc2fad67a2646adaf075efadf3111669bab6bac4ebb731cbe431e7f8ade5cb934f2838fa7dd0c2c865c'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
