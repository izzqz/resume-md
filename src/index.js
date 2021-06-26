const
    prompts = require('prompts'),
    kleur = require('kleur'),
    {open: openUrl} = require('openurl'),
    console = require('consola'),
    fs = require('fs-extra'),
    path = require('path');

const {getAllTemplates, getMdResume} = require('./parsing.js');
const {
    generateQuestions,
    generateHtmlContents
} = require('./generating.js');

const
    HTML_RESUME_PATH = 'dist/resume.html',
    BANNER_PATH = 'assets/ascii-banner.txt';

(async () => {
    const banner = await fs.readFile(BANNER_PATH, 'utf-8');

    console.stdout.write(kleur.cyan(banner + '\n'));

    const mdResume = await getMdResume();
    const allTemplates = getAllTemplates();

    const alreadySelectedIndex = process.env.TEMPLATE_INDEX;
    const needOpenUrl =
        process.env.OPEN_URL === 'true' ||
        process.env.OPEN_URL === undefined;

    let selectedTemplate;

    if (alreadySelectedIndex === undefined) {
        const questions = generateQuestions(allTemplates);
        selectedTemplate = await prompts(questions).then(answer => {
            if (answer.template !== undefined) {
                return answer.template;
            } else {
                console.info('Canceled by user.');
                process.exit(0);
            }
        });
    } else {
        selectedTemplate = allTemplates[alreadySelectedIndex];
    }

    await generateHtmlContents(selectedTemplate, mdResume)
        .then(html => fs.outputFile('dist/resume.html', html));

    const absoluteHtmlPath = path.resolve(HTML_RESUME_PATH);
    console.success('All done! 🎉');
    console.info(`Check out your resume in --> ${HTML_RESUME_PATH}`);
    // TODO: Add PDF info

    if (needOpenUrl) openUrl(`file:///${absoluteHtmlPath}`);
})();

process.on('uncaughtException', err => {
    switch (err.message) {
        /**
         * This error happens in "openurl" packed.
         */
        case 'spawn xdg-open ENOENT':
            console.warn('We couldn\'t find a browser to open the resume, you\'ll have to do it by yourself.');
            break;
        default:
            console.error('There was an uncaught error', err);
            process.exit(1);
    }
});