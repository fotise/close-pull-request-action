'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  // const token = core.getInput('github-token')
  // const number = core.getInput('number')

  // const octokit = new GitHub(token)
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
//   await octokit.pulls.createReview({
//     ...context.repo,
//     pull_number: number,
//     event: 'APPROVE'
//   })
}

main().catch(err => core.setFailed(err.message))
