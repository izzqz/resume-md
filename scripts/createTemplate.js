const
    prompts = require('prompts'),
    fs = require('fs-extra'),
    kleur = require('kleur'),
    { paramCase: toKebabCase } = require("change-case")

const questions = [
  {
    type: 'text',
    name: 'name',
    message: 'Template Name:',
  },
  {
    type: 'text',
    name: 'description',
    message: 'Template description:',
  },
  {
    type: 'text',
    name: 'author',
    message: 'Author:',
  },
];

(async () => {
  const metadata = await prompts(questions);

  let templatePath = `templates/${toKebabCase(metadata.name)}`

  fs.copySync('templates/raw', templatePath)
  fs.writeJson(`${templatePath}/metadata.json`, metadata, {
    spaces: 2
  })

  console.log(kleur.green('All done!'));

  console.log(metadata);
  console.log('---');
  console.log(`Template path: ${templatePath}`);
  console.log('Any meta tag changes in:', `${templatePath}/${kleur.cyan('metadata.json')}`);
})();

