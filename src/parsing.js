const
    fs = require('fs'),
    chalk = require('chalk'),
    md = require('markdown-it')(),
    metaPlugin = require('markdown-it-meta');

md.use(metaPlugin);

const validateMeta = require('./utils/validateMeta.js');

/**
 * This function get templates objects from 'templates' directory
 * @typedef {{
 *    name: string,
 *    description:string,
 *    author: string,
 *    path: string
 * }} template
 * @return {template[]}
 */
function getAllTemplates() {
  const templatesNames = fs.readdirSync('templates');

  return templatesNames.map(name => {
    const rawMeta = fs.readFileSync(`templates/${name}/metadata.json`);
    const meta = JSON.parse(rawMeta.toString());

    return {
      ...meta,
      path: `templates/${name}`,
    };
  });
}

/**
 * This function parses resume.md and returns HTML with meta tags
 * @typedef {{
 *   fullName: string,
 *   jobTitle: string,
 *   title: string,
 *   description: string,
 *   email: string,
 *   resumeUrl: string,
 *   photoUrl: string,
 *   links: object,
 *   knowsAbout: string
 * }} mdMetaTags
 * @typedef {{ mdContent: string } & mdMetaTags} parsedResumeMd
 * @return {parsedResumeMd}
 */
async function getMdResume() {
  if (!fs.existsSync('resume.md')) {
    console.error(chalk.red('File resume.md does not exists'));
    process.exit(1);
  }

  const mdContent = fs.readFileSync('resume.md').toString();
  const raw = await md.render(mdContent);

  validateMeta(md.meta);

  return {
    mdContent: raw,
    ...md.meta,
  };
}

module.exports = {
  getAllTemplates,
  getMdResume,
};
