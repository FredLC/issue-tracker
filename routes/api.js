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
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
  assigned_to: String,
  open: { type: Boolean, default: true },
  status_text: String,
  project_name: String,
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;

      Issue.find(
        { project_name: project },
        "-project_name -__v",
        (err, issues) => {
          if (err) {
            console.log(err);
          }

          for (const query in req.query) {
            issues = issues.filter((issue) => {
              if (typeof issue[query] === "object") {
                return issue[query].toISOString() == req.query[query];
              }
              return String(issue[query]) == req.query[query];
            });
          }

          res.send(issues);
        }
      );
      // Issue.find({}, (err, issues) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     res.send(issues);
      //   }
      // });
      // Issue.deleteMany({}, (err) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     res.send("success!");
      //   }
      // });
    })

    .post(function (req, res) {
      let project = req.params.project;
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      } = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" });
      }

      const issue = new Issue({
        issue_title,
        issue_text,
        created_by,
        assigned_to: assigned_to || "",
        status_text: status_text || "",
        project_name: project,
      });

      issue.save((err, issue) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({
            issue_title: issue.issue_title,
            _id: issue._id,
            issue_text: issue.issue_text,
            created_by: issue.created_by,
            assigned_to: issue.assigned_to,
            created_on: issue.created_on,
            updated_on: issue.updated_on,
            status_text: issue.status_text,
            open: issue.open,
          });
        }
      });
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
