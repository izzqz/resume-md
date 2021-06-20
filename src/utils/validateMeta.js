const
    Joi = require('joi'),
    kleur = require('kleur');

/**
 * @type {Joi.ObjectSchema<mdMetaTags>}
 */
const schema = Joi.object({
  fullName: Joi.string().required(),
  jobTitle: Joi.string().required(),
  title: Joi.string(),
  description: Joi.string().max(260).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  resumeUrl: Joi.string().uri(),
  photoUrl: Joi.string().uri(),
  links: Joi.object(),
  knowsAbout: Joi.string(),
});

/**
 * Validates meta tags from Resume.md
 * @param meta {mdMetaTags}
 */
function validateMeta(meta) {
  const result = schema.validate(meta);

  if (result.error) {
    console.log(
        'Whoops! Validation failed. Check out your Resume.md file');
    console.error(kleur.red(`\n${result.error}\n`));
    // Exit with 0 because npm run build has big chonky error message
    process.exit(0);
  }
}

module.exports = validateMeta;
