/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URI || "mongodb://localhost/issue-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const issueSchema = new Schema({
  issueTitle: { type: String, required: true },
  issueText: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  assignedTo: String,
  open: { type: Boolean, default: true },
  statusText: String,
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
    })

    .post(function (req, res) {
      let project = req.params.project;
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
