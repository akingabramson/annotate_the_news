# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

articles = Article.create([
  {
  body: "This is some body.  Please let it be interesting.",
  news_source: "New York Crimes",
  recommended: true,
  submitter_id: 1,
  title: "This is some title ain't it.",
  topic_id: 1,
  url: "www.google.com"
  },
  {
  body: "This is some more body.  Please let it be more interesting.",
  news_source: "Washington Ghost",
  recommended: true,
  submitter_id: 1,
  title: "Politics, politics, and more politics",
  topic_id: 1,
  url: "www.google.com"
  },
  {
  body: "My goal:  To get in shape for the Quidditch World Cup happening in mid-April.  Specifically, I need to be able to sprint, tackle, and move laterally at full energy for three or four four-minute periods, four times a day, two days in a row.  To accomplish this, I plan to lift weights at the gym at least twice a week (one day working legs and lower back with squats and deadlifts, one day working pecs and arms with bench press and free weights), do two sets of two suicides after practices, and play pick-up basketball intermittently for six hours both days of every other weekend before the World Cup.",
  news_source: "Health Psych 150",
  recommended: true,
  submitter_id: 1,
  title: "Health Paper",
  topic_id: 2,
  url: "www.health.com"
  }])

users = User.create([
  {
    email: "test@test.com",
    password: "testing123"
    }])