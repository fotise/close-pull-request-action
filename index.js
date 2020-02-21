'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

async function addComment(context, comment) {
  return context.github.issues.createComment(context.issue({ body: comment }));
}

async function closeIssue(context) {
  return context.github.issues.update(context.issue({ state: "closed" }));
}

const main = async () => {
  // const token = core.getInput('github-token')
  // const number = core.getInput('number')

  //const octokit = new GitHub(token)

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  const pr = payload.pull_request;
  console.log(`The event pull_request: ${pr}`);

  if(!pr) {
    return;
  }

  await addComment(
    context,
    "THIS is a comment: Contribution License Agreement signed by " +
      pr.user.login
  );

  await closeIssue(context);

//   await octokit.pulls.createReview({
//     ...context.repo,
//     pull_number: number,s
//     event: 'APPROVE'
//   })
}

main().catch(err => core.setFailed(err.message))
