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
  const allTemplates = getAllTemplates();

  const alreadySelectedIndex = process.env.TEMPLATE_INDEX;
  const needOpenUrl =
      process.env.OPEN_URL === 'true' ||
      process.env.OPEN_URL === undefined;

  let selectedTemplate;

  if (alreadySelectedIndex === undefined) {
    const questions = generateQuestions(allTemplates);
    selectedTemplate = await prompts(questions).then(a => a.template);
  } else {
    selectedTemplate = allTemplates[alreadySelectedIndex];
  }

  const htmlResume = generateHtmlResume(selectedTemplate, await mdResume);

  if (!fs.existsSync('dist')) fs.mkdirSync('dist');

  fs.writeFileSync('dist/resume.html', await htmlResume);
  const resumePath = path.resolve('dist/resume.html');
  console.log(`${chalk.green('All done! 🎉')}`);
  console.log('Your resume path:');
  console.log(`\n\n  ${resumePath}\n\n`);
  if (needOpenUrl) openUrl(`file:///${resumePath}`);
})();
