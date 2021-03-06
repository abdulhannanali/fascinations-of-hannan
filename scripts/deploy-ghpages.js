/**
 * deploy-ghpages.js
 * Uses awesome gh-pages module to deploy to Github pages
 * AWESOME!
 */

const ghpages = require('gh-pages')
const path = require('path')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_URL = 'https://github.com/abdulhannanali/fascinations-of-hannan.git'

const githubUrl = generateGithubUrl(REPO_URL, GITHUB_TOKEN)
const options = {
    branch: 'gh-pages',
    message: 'Commit to gh-pages TravisCI :tada:',
    user: {
        name: "Travis Hannan",
        email: "travis@noreply.hannanali.tech"
    },
    repo: githubUrl,
    logger: function (message) {
        if (message.match(GITHUB_TOKEN)) {
            message = message.replace(GITHUB_TOKEN, '{SECURE_TOKEN}')
        }
        console.log('Ghpages log ' + message)
    }
}

ghpages.clean()
ghpages.publish(path.join(__dirname, '../_site'), options, function (error) {
    if (error) {
        console.error('Error occured while deploying to ghpages')
        console.error(error)
        process.exit(1)
    } else {
        console.log('Deployed  to gh-pages successfully')
    }
})

/**
 * generateGithubUrl
 * generates github url along with a token
 */
function generateGithubUrl (repoUrl, github_token) {
    return repoUrl.replace('https://', 'https://' + github_token + ':x-oauth-basic@')
}
