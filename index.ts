import * as core from '@actions/core';
import * as github from '@actions/github';
const axios = require('axios');
const sites: Array<string> = JSON.parse(core.getInput('sites'));

async function prLink(): Promise<void> {
  try {
    const token = core.getInput('github-token');
    console.log(token);
    const octokit = github.getOctokit(token);
    const context = github.context;

    const response = await octokit.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: 'open'
    });

    if (!response.data) return;

    const releasePr = response.data.filter(item => item.title.indexOf('Release v') !== -1)[0];
    console.log(releasePr);
  } catch (error) {
    console.log(error);
  }
}


prLink();
