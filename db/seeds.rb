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
  }
  ])