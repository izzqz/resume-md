const
    prompts = require('prompts'),
    chalk = require('chalk'),
    { open: openUrl } = require('openurl'),
    fs = require('fs'),
    path = require('path');

const { getAllTemplates, getMdResume } = require('./parsing.js');
const { generateQuestions, generateHtmlResume } = require('./generating.js');

(async () => {
  const mdResume = getMdResume();
  const templates = getAllTemplates();
  const questions = generateQuestions(templates);
  const { template } = await prompts(questions);

  const htmlResume = generateHtmlResume(template, await mdResume);

  fs.writeFileSync('dist/resume.html', await htmlResume);
  const resumePath = path.resolve('dist/resume.html');
  console.log(`${chalk.green('All done! 🎉')}`);
  console.log('Your resume path:');
  console.log(`\n\n  ${resumePath}\n\n`);
  openUrl(`file:///${resumePath}`)
})();
