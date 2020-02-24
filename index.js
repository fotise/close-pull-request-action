'use strict'

const core = require('@actions/core')
const github = require('@actions/github');


const main = async () => {
  const token = core.getInput('github-token')
  // const number = core.getInput('number')

  const context = github.context;
  if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
  }
  const pull_request_number = context.payload.pull_request.number;

  const octokit = new github.GitHub(token)
  const new_comment = octokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request_number,
    body: "CLA message"
  });

  core.setFailed("Please set project or pattern input");

}

main().catch(err => core.setFailed(err.message))
