const knex = require("../db/connection");

function list() {
  return knex("comments")
    .select("*")
}

function listCommenterCount() {
  return knex("comments as c")
    .join("users as u", "u.user_id", "c.commenter_id")
    .count("comment_id")
    .select("user_email as commenter_email")
    .groupBy("commenter_email")
    .orderBy("commenter_email")
}

function read(commentId) {
  return knex("comments as c")
    .join("posts as p", "p.post_id", "c.post_id")
    .join("users as u", "u.user_id", "c.commenter_id")
    .select("comment_id", "comment", "user_email as commenter_email", "post_body as commented_post")
    .where({ comment_id: commentId })
    .then((comment) => comment[0])
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
