const
    prompts = require('prompts'),
    kleur = require('kleur'),
    {open: openUrl} = require('openurl'),
    fs = require('fs-extra'),
    path = require('path');

const {getAllTemplates, getMdResume} = require('./parsing.js');
const {
    generateQuestions,
    generateHtmlContents
} = require('./generating.js');

const HTML_RESUME_PATH = 'dist/resume.html';

(async () => {
    const mdResume = await getMdResume();
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

    await generateHtmlContents(selectedTemplate, mdResume)
        .then(html => fs.outputFile('dist/resume.html', html));

    const absoluteHtmlPath = path.resolve(HTML_RESUME_PATH);
    console.log(`${kleur.green('All done! 🎉')}`);
    console.log('Your resume path:');
    console.log(`\n\n  ${absoluteHtmlPath}\n\n`);
    if (needOpenUrl) openUrl(`file:///${absoluteHtmlPath}`);
})();
