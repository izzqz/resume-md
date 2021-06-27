/**
 * Metadata description
 */
export type mdMetaTags = {
    /**
     * Just your full name
     * @required
     */
    fullName: string,
    /**
     * Job title
     * @example Frontend Developer
     * @required
     */
    jobTitle: string,
    /**
     * Resume title. It is mainly used as tab title or in preview.
     * If not specified, the `fullName` will be used as title.
     */
    title?: string,
    /**
     * This description used in social preview and meta tags.
     * @example Jonathan's resume
     * @required
     */
    description: string,
    /**
     * Just your email.
     * This should de valid email, because it used in `mailto:`.
     */
    email?: string,
    /**
     * Just string phone number.
     */
    phone?: string,
    /**
     * The url where this resume is published
     * @example https://example.com/resume/
     */
    resumeUrl?: string,
    /**
     * Photo url. Will be used in social previews and maybe in your template
     * @example https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400
     */
    photoUrl?: string,
    /**
     * Your extra links that you want to put on your resume. Such as a personal website, linkedin etc.
     * We recommend naming the link more directly. So that the printed version of your resume makes it clear that it is a link.
     * @example {
     *     'example.com': https://example.com
     *     'vm-agency/resume-md': https://github.com/vm-agency/resume-md
     * }
     */
    links?: {
        [name: string]: string
    },
    /**
     * You can use this key to specify the scope of a competence.
     * We don't recommend make this key too long. It is better to limit it to 2 to 7 words.
     * @example ALGOL, Fortran, ReactJS and web things
     * @see https://schema.org/knowsAbout
     */
    knowsAbout?: string
}