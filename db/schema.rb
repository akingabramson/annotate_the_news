# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130707071645) do

  create_table "annotations", :force => true do |t|
    t.integer  "annotator_id"
    t.text     "body"
    t.integer  "snippet_id"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.integer  "iq",           :default => 0
  end

  create_table "article_repositories", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "articles", :force => true do |t|
    t.string   "url"
    t.string   "title"
    t.text     "body"
    t.string   "news_source"
    t.integer  "submitter_id"
    t.integer  "topic_id"
    t.boolean  "recommended",  :default => false
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
  end

  add_index "articles", ["created_at"], :name => "index_articles_on_created_at"
  add_index "articles", ["topic_id"], :name => "index_articles_on_topic_id"
  add_index "articles", ["updated_at"], :name => "index_articles_on_updated_at"

  create_table "snippets", :force => true do |t|
    t.string   "text"
    t.integer  "article_id"
    t.integer  "start"
    t.integer  "end"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "snippets", ["article_id"], :name => "index_snippets_on_article_id"

  create_table "topics", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",           :default => "", :null => false
    t.string   "password_digest", :default => "", :null => false
    t.string   "session_token"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.string   "username"
    t.integer  "iq",              :default => 0
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

  create_table "uservotes", :force => true do |t|
    t.integer  "user_id"
    t.integer  "annotation_id"
    t.boolean  "upvote"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

end
