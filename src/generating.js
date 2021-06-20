const
    ejs = require('ejs'),
    fs = require('fs'),
    prettify = require('pretty'),
    puppeteer = require('puppeteer'),
    kleur = require('kleur');

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
        title: `${t.name}${kleur.grey('  ' + t.description)}`,
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
async function generateHtmlContents(template, resume) {
  const rawEjs = fs.readFileSync(`${template.path}/index.ejs`, 'utf-8');

  const css = require('css');

  const rawCss = fs.readFileSync(`${template.path}/main.css`, 'utf-8');
  const parsedCss = css.parse(rawCss);
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

async function generatePdfContents(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.emulateMediaType('screen')

  const pdfContents = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();

  return pdfContents;
}

module.exports = {
  generateQuestions,
  generateHtmlContents,
  generatePdfContents,
};
