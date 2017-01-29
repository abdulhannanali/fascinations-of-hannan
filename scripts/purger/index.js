/**
 * Purger.js is a helpful utility to purge the cache based on the Jekyll's sitemap
 * generated, which allows us to have a lot of great functionality in there.
 * This utility is written for blog called https://fascinations.hannanali.tech,
 * check out this article to read meaningful articles from me
 */
const Cloudflare = require('cloudflare')
const xml2js = require('xml2js')
const fs = require('fs')
const sitemapReader = require('./sitemapReader')
const chunk = require('lodash.chunk')

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
    dotenv.config()
}

const {
    CLOUDFLARE_EMAIL,
    CLOUDFLARE_ZONE_ID,
    CLOUDFLARE_KEY,
    CLOUDFLARE_SITEMAP_PATH
} = process.env

/**
 * Initailizing CloudFlare API to purge the Cloudflare urls
 */
const client = new Cloudflare({
    email: CLOUDFLARE_EMAIL,
    key: CLOUDFLARE_KEY
})

async function purge () {
    const sitemap = await sitemapReader(CLOUDFLARE_SITEMAP_PATH)
    const zone = await getZone(CLOUDFLARE_ZONE_ID)

    const isDeleted = await deleteCache(zone, sitemap, {
        limit: 15
    })

    if (isDeleted) {
        console.log("The cache is successfully perged for the zone")
        console.log("Cache purged for following files")
        console.log(sitemap.join('\n\n'))
    } else {
        throw new Error('Failed to purge the cache')
    }
}

function getZone (zoneId) {
    return client.readZone(zoneId)
}

async function deleteCache (zone, files, options = {}) {
    const deleteStatuses = await deleteFiles(zone, files, options.limit)
    console.log('Requests Made: ' + deleteStatuses.length)

    return deleteStatuses.every((status) => status)
}

/**
 * chunkPurgeCalls
 * chunks the purge calls upto a certain limit
 */
function deleteFiles (zone, files, limit = 15) {
    if (limit > 30 || limit <= 0) {
        limit = 30
    }
    
    return (
        Promise.all(
            chunk(files, limit)
            .map((fileChunk) => client.deleteCache(zone, {
                files: fileChunk
            }))
        )
    )
}

purge()

/**
 * In case of unhandledRejection
 * of which there are many
 */
process.on('unhandledRejection', function (error) {
    throw error
})