import axios from 'axios';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import * as child from 'child_process';
import fs from 'fs';
import path from 'path';

// acciotest.json
/*
{
  'testRepo': string',
  'pathToFile': 'string'
}
*/

async function run(): Promise<void> {
  const repoWorkSpace: string | undefined = process.env['GITHUB_WORKSPACE'];
  try {
    process.stderr.write(`\n1111`)
    const githubRepo = process.env['GITHUB_REPOSITORY'];
    if (!githubRepo) throw new Error('No GITHUB_REPOSITORY');

    const [repoOwner, repoName] = githubRepo.split('/');
    // const token = process.env['ACCIO_ASGMNT_ACTION_TOKEN'];
    // const ACCIO_API_ENDPOINT =
    //   'https://accio-release-1-dot-acciojob-prod.el.r.appspot.com';

    // if (!token) throw new Error('No token given!');
    if (!repoWorkSpace) throw new Error('No GITHUB_WORKSPACE');
    // if (repoOwner !== 'acciojob') throw new Error('Error not under acciojob');
    if (!repoName) throw new Error('Failed to parse repoName');

    let studentUserName = '';
    let assignmentName = '';

    const contextPayload = github.context.payload;
    process.stderr.write(`\n${githubRepo}`)
    process.stderr.write(`\n${repoOwner}`)
    process.stderr.write(`\n${repoName}`)
    process.stderr.write(`\n${contextPayload}`)

    if (contextPayload.pusher.username) {
      if (repoName.includes(contextPayload.pusher.username)) {
        const indexOfStudentName = repoName.indexOf(
          contextPayload.pusher.username
        );
        studentUserName = repoName.substring(indexOfStudentName);
        assignmentName = repoName.substring(0, indexOfStudentName - 1);
      }
    } else if (repoName.includes(contextPayload.pusher.name)) {
      const indexOfStudentName = repoName.indexOf(contextPayload.pusher.name);
      studentUserName = repoName.substring(indexOfStudentName);
      assignmentName = repoName.substring(0, indexOfStudentName - 1);
    }

    process.stdout.write(
      `repoWorkSpace = ${repoWorkSpace}\nrepoName = ${repoName}\nstudentName = ${studentUserName}\nassignmentName = ${assignmentName}\n`
    );

    process.stdout.write(
      `Pusher Username = ${contextPayload.pusher.username}\nPusher Name = ${contextPayload.pusher.name}`
    );
    process.stderr.write(`\n2222`)

    if (true) {
      // const accioTestConfigData = fs.readFileSync(
      //   path.resolve(repoWorkSpace, 'acciotest.json')
      // );
      // const accioTestConfig = JSON.parse(accioTestConfigData.toString());

      // process.stdout.write(`Test Config: ${accioTestConfigData.toString()}`);

      // const query = new URLSearchParams();
      // query.append('repo', accioTestConfig.testRepo);
      // query.append('filePath', accioTestConfig.pathToFile);
      // query.append('token', token);

      // Get the encoded test file contents
      // const encodedTestFileData = await axios.get(
      //   `${ACCIO_API_ENDPOINT}/github/action-get-file?${query.toString()}`
      // );

      // const testFileContent = Buffer.from(
      //   encodedTestFileData.data,
      //   'base64'
      // ).toString('utf8');

      // fs.mkdirSync(path.resolve(repoWorkSpace, 'cypress/integration/tests'), {
      //   recursive: true
      // });

      // fs.writeFileSync(
      //   path.resolve(repoWorkSpace, 'cypress/integration/tests/test.spec.js'),
      //   testFileContent
      // );

      const mvnInstall = await exec.exec('mvn install', undefined, {
        cwd: repoWorkSpace
      });
      process.stderr.write(`\n3333`)
      process.stderr.write(`\n${mvnInstall}`)
      const junitReports = fs.readFileSync(
        path.resolve(repoWorkSpace, 'target/surefire-reports/com.driver.test.VehicleTest.txt')
      );
      const junitString = junitReports.toString();
      process.stderr.write(`\n${junitString}`);
      let testResults = junitString.replace(/[^0-9.]/g,' ').split(' ');
      testResults = testResults.filter(element => !['.',''].includes(element));
      process.stderr.write(`\nTest Results: ${testResults}`);
      process.stderr.write(`\nTotal Test Cases: ${parseInt(testResults[0])}`);
      process.stderr.write(`\nFailed Test Cases: ${parseInt(testResults[1])}`);

      process.stdout.write(`\nEvaluating score...\n`);

      process.exit(0);
    }
  } catch (error) {
    if(repoWorkSpace){
      const junitReports = fs.readFileSync(
        path.resolve(repoWorkSpace, 'target/surefire-reports/com.driver.test.VehicleTest.txt')
      );
      const junitString = junitReports.toString();
      process.stderr.write(`\n${junitString}`);
      let testResults = junitString.replace(/[^0-9.]/g,' ').split(' ');
      testResults = testResults.filter(element => !['.',''].includes(element));
      process.stderr.write(`\nTest Results: ${testResults}`);
      process.stderr.write(`\nTotal Test Cases: ${parseInt(testResults[0])}`);
      process.stderr.write(`\nFailed Test Cases: ${parseInt(testResults[1])}`);
    }
    if (error instanceof Error) core.setFailed(error.message);
    process.stderr.write(`\nError: ${(error as Error).message}`);
    process.exit(1);
  }
}

run();
