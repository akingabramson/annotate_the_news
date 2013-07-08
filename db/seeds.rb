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
  title: "This is a sample title.",
  topic_id: 3,
  url: "http://www.gmail.com"
  },
  {
  body: "This is another sample body.  Please let it be more interesting.",
  news_source: "Washington Ghost",
  recommended: true,
  submitter_id: 1,
  title: "Politics, politics, and more politics",
  topic_id: 2,
  url: "http://www.washingtonpost.com"
  },
  {
  body: "Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor Blah blah blah blah more text ipsum factum dolor",
  news_source: "Title 9",
  recommended: true,
  submitter_id: 1,
  title: "Third Title",
  topic_id: 1,
  url: "http://www.mlb.com"
  }])


topics = Topic.create([
  {name: "Sports"},
  {name: "Politics"},
  {name: "Economics"}])