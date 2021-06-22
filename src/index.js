const
    prompts = require('prompts'),
    kleur = require('kleur'),
    {open: openUrl} = require('openurl'),
    fs = require('fs-extra'),
    path = require('path');

const {getAllTemplates, getMdResume} = require('./parsing.js');
const {
    generateQuestions,
    generateHtmlContents,
    generatePdfContents
} = require('./generating.js');

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

    // FIXME: shitty pdf font and css usages
    const html = await generateHtmlContents(selectedTemplate, mdResume);

    await Promise.all([
        generatePdfContents(html).then(pdf => fs.outputFile('dist/resume.pdf', pdf)),
        fs.outputFile('dist/resume.html', html)
    ]);

    const resumePath = path.resolve('dist/resume.html');
    console.log(`${kleur.green('All done! 🎉')}`);
    console.log('Your resume path:');
    console.log(`\n\n  ${resumePath}\n\n`);
    if (needOpenUrl) openUrl(`file:///${resumePath}`);
})();
