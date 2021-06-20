const
    ejs = require('ejs'),
    fs = require('fs'),
    prettify = require('pretty'),
    chalk = require('chalk');

/**
 * This function generates question object specially for `prompts` package
 * @param templates {template[]}
 * @return {{name: string, type: string, message: string, choices}}
 */
function generateQuestions(templates) {
  return {
    type: 'select',
    name: 'template',
    message: 'Select template',
    choices: templates.map(t => {
      return {
        title: `${t.name}${chalk.grey('  ' + t.description)}`,
        value: t,
      };
    }),
  };
}

/**
 * This function generates HTML string from ejs template and parsed Resume.md
 * @param template {template}
 * @param resume {parsedResumeMd}
 * @return {Promise<string>}
 */
async function generateHtmlResume(template, resume) {
  const rawEjs = fs.readFileSync(`${template.path}/index.ejs`).toString();

  const css = require('css');

  const rawCss = fs.readFileSync(`${template.path}/main.css`);
  const parsedCss = css.parse(rawCss.toString());
  const _cssString = css.stringify(parsedCss);

  const data = {
    template,
    ...resume,
    _cssString,
  };

  const html = await ejs.render(rawEjs, data, {
    root: 'layouts',
    views: ['layouts', template.path],
  });

  return prettify(html, { ocd: true });
}

module.exports = {
  generateQuestions,
  generateHtmlResume,
};
