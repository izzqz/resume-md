![Banner](assets/banner.png)

> At an early stage of development
# # Resume.md | SEO Optimized Resume Builder

## Features:

- CLI based
- its markdown
- Preview on social media
- Search Bot and parsers understanding
- Print Optimized
- Simple Templating

![cast](assets/cast.svg)

## Prerequisites

- Node version 7.10.1 or greater
- npm

## Installation

```sh
# Clone repo
git clone https://github.com/vm-agency/resume-md.git;
cd resume-md;

# Install dependencies
npm install
```

## Usage

### Build resume

To start the build, you must first edit the `Resume.md` file and run the builder script with:

```sh
npm run build
```

After that, choose a template that you like and let the program build your resume.

### Metadata



In your `Resume.md` meta tags structure is YAML inside of `---` in markdown:

```markdown
---
fullName: Jonathan Doe
jobTitle: Some Developer
description: Some Developer | ALGOL, Fortran, ReactJS and web things
---

# Heading 1
## Heading 2
```

> This is s minimal `Resume.md`. Because `fullName`, `jobTitle` and `description` are required.

[comment]: <> (TODO: Documentation)

#### All provided metadata

Also see [mdMetaTags type declaration](types/resumeMetadata.ts).

| Key           | Decryption                                                                                                                                                                                                               |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fullName`    | Just your full name                                                                                                                                                                                                      |
| `jobTitle`    | Job title                                                                                                                                                                                                                |
| `description` | This description used in social preview and meta tags.                                                                                                                                                                   |
| `title`       | Resume title. It is mainly used as tab title or in preview. If not specified, the `fullName` will be used as title.                                                                                                      |
| `email`       | Just your email. This should de valid email, because it used in `mailto:`.                                                                                                                                               |
| `phone`       | Just string phone number.                                                                                                                                                                                                |
| `resumeUrl`   | The url where this resume is published                                                                                                                                                                                   |
| `photoUrl`    | Photo url. Will be used in social previews and maybe in your template                                                                                                                                                    |
| `links`       | Your extra links that you want to put on your resume. Such as a personal website, linkedin etc. We recommend naming the link more directly. So that the printed version of your resume makes it clear that it is a link. |
| `knowsAbout`  | You can use this key to specify the scope of a competence. We don't recommend make this key too long. It is better to limit it to 2 to 7 words.                                                                          |

### Save as PDF

If you want save your resume as PDF file. Just open your HTML resume and [follow this instructions](https://www.wikihow.com/Convert-a-Webpage-to-PDF)


