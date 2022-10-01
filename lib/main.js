"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
// acciotest.json
/*
{
  'testRepo': string',
  'pathToFile': 'string'
}
*/
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            process.stderr.write(`1111`);
            const githubRepo = process.env['GITHUB_REPOSITORY'];
            if (!githubRepo)
                throw new Error('No GITHUB_REPOSITORY');
            const [repoOwner, repoName] = githubRepo.split('/');
            const repoWorkSpace = process.env['GITHUB_WORKSPACE'];
            // const token = process.env['ACCIO_ASGMNT_ACTION_TOKEN'];
            // const ACCIO_API_ENDPOINT =
            //   'https://accio-release-1-dot-acciojob-prod.el.r.appspot.com';
            // if (!token) throw new Error('No token given!');
            if (!repoWorkSpace)
                throw new Error('No GITHUB_WORKSPACE');
            if (repoOwner !== 'acciojob')
                throw new Error('Error not under acciojob');
            if (!repoName)
                throw new Error('Failed to parse repoName');
            let studentUserName = '';
            let assignmentName = '';
            const contextPayload = github.context.payload;
            if (contextPayload.pusher.username) {
                if (repoName.includes(contextPayload.pusher.username)) {
                    const indexOfStudentName = repoName.indexOf(contextPayload.pusher.username);
                    studentUserName = repoName.substring(indexOfStudentName);
                    assignmentName = repoName.substring(0, indexOfStudentName - 1);
                }
            }
            else if (repoName.includes(contextPayload.pusher.name)) {
                const indexOfStudentName = repoName.indexOf(contextPayload.pusher.name);
                studentUserName = repoName.substring(indexOfStudentName);
                assignmentName = repoName.substring(0, indexOfStudentName - 1);
            }
            process.stdout.write(`repoWorkSpace = ${repoWorkSpace}\nrepoName = ${repoName}\nstudentName = ${studentUserName}\nassignmentName = ${assignmentName}\n`);
            process.stdout.write(`Pusher Username = ${contextPayload.pusher.username}\nPusher Name = ${contextPayload.pusher.name}`);
            if (assignmentName && studentUserName) {
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
                // const cypressInstallExitCode = await exec.exec('npm install', undefined, {
                //   cwd: repoWorkSpace
                // });
                // process.stdout.write(
                //   `\nnpm install exit code ${cypressInstallExitCode}\n`
                // );
                // const startServer = exec.exec('npm start', undefined, {
                //   cwd: repoWorkSpace
                // });
                // process.stdout.write(`\nnpm start exit code ${startServer}`);
                // const cypressPath =
                //   require.resolve('cypress', {
                //     paths: [repoWorkSpace]
                //   }) || 'cypress';
                // const cypress = require(cypressPath);
                // const testResults = await cypress.run();
                process.stdout.write(`\nEvaluating score...\n`);
                // const {data: score} = await axios.post(
                //   `${ACCIO_API_ENDPOINT}/github/get-score`,
                //   {
                //     token,
                //     testResults,
                //     assignmentName,
                //     repoName,
                //     studentGithubUserName: studentUserName
                //   }
                // );
                // core.setOutput('totalScore', score.totalScore);
                // core.setOutput('scoreReceived', score.scoreReceived);
                // process.stdout.write(
                //   `\nScore: ${score.scoreReceived}/${score.totalScore}\n`
                // );
                process.exit(0);
            }
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
            process.stderr.write(`Error: ${error.message}`);
            process.exit(1);
        }
    });
}
run();
