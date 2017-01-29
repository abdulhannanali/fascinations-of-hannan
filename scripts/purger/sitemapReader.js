/**
 * sitemapReader.js
 * reads the sitemap from the path and
 * parses the sitemap to provide with all the urls
 * function is async
 */
const fs = require('fs')
const path = require('path')
const pify = require('pify')
const xml2js = require('xml2js')

const readFile = pify(fs.readFile)
const parseString = pify(xml2js.parseString)

/**
 * @param {String} mapPath path of the xml sitemap to be parsed
 * @returns {Array} array of urls parsed from xml sitemap
 */
module.exports = async function (mapPath) {
    const sitemap = await readFile(mapPath, 'utf-8')
    const sitemapXml = await parseString(sitemap)

    return sitemapXml.urlset.url.map((obj) => {
        return obj.loc[0]
    })
}


process.on('unhandledRejection', (error) => {
    throw error
})