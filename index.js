'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

async function addComment(octokit, context, comment) {
  // return context.github.issues.createComment(context.issue({ body: comment }));
  return octokit.issue.addComment(octokit, context, octokit.issues.createComment());


  // return octokit.issues.createComment(comment)   (  context.issue({ body: comment }));
}

// async function closeIssue(octokit, context) {
//   return octokit.issues.update(context.issue({ state: "closed" }));
// }

const main = async () => {
  const token = core.getInput('github-token')
  // const number = core.getInput('number')

  const octokit = new GitHub(token)

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify( context.payload, undefined, 2)
  console.log(`The event payload parsed: ${payload}`);
  console.log(`===================================================================`);
  console.log(`The event payload not parsed: ${context.payload}`);
  console.log(`===================================================================`);
  console.log(`The event payload PR: ${context.payload.pull_request}`);
  console.log(`===================================================================`);

  const pr = context.payload.pull_request;
  console.log(`The event pull_request: ${pr}`);

  console.log(`Token: ${token}`);

  if(!context.payload.pull_request) {
    return;
  }

  await addComment(
    octokit,
    context,
    "THIS is a comment: Contribution License Agreement signed by " +
    context.payload.pull_request.user.login
  );

  // await closeIssue(octokit, context);

//   await octokit.pulls.createReview({
//     ...context.repo,
//     pull_number: number,s
//     event: 'APPROVE'
//   })
}

main().catch(err => core.setFailed(err.message))
