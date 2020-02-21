'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

async function addComment(octokit, context, comment) {
  // return context.github.issues.createComment(context.issue({ body: comment }));
  return octokit.issues.createComment(context.issue({ body: comment }));
}

async function closeIssue(octokit, context) {
  return octokit.issues.update(context.issue({ state: "closed" }));
}

const main = async () => {
  const token = core.getInput('github-token')
  // const number = core.getInput('number')

  const octokit = new GitHub(token)

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify( context.payload, undefined, 2)
  console.log(`The event payload not parsed: ${context.payload}`);
  console.log(`The event payload PR: ${context.payload.pull_request}`);

  const pr = payload.pull_request;
  console.log(`The event pull_request: ${pr}`);

  console.log(`Token: ${token}`);


  if(!pr) {
    return;
  }

  await addComment(
    octokit,
    context,
    "THIS is a comment: Contribution License Agreement signed by " +
      pr.user.login
  );

  await closeIssue(octokit, context);

//   await octokit.pulls.createReview({
//     ...context.repo,
//     pull_number: number,s
//     event: 'APPROVE'
//   })
}

main().catch(err => core.setFailed(err.message))
