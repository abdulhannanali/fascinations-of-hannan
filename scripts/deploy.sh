#!/bin/bash
set -ev

# Using node 7.4 here 
nvm use 7

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Deployment to firebase for master branch
if [ "$TRAVIS_BRANCH" == "master" ]; then
    echo "Deploying to firebase in case of master too"
    firebase deploy --token "$FIREBASE_TOKEN"

    # Purge the cache if the site is successfully deployed to production
    # We don't control other domains so we leave the purging details on them
    node --harmony_async_await --harmony ./scripts/purger/index.js
    
    # deploying to Github Pages the master version, in case we need it any time
    node ./scripts/deploy-ghpages.js
fi

# Deploy each branch to staging, a mirror of master will be deployed on surge,
# cos it's already being deployed on firebase too
# Create an automated staging environment on one website, where we can select 
# all the staging environments
surge --domain "hannan-fascinations-""$TRAVIS_BRANCH"".surge.sh" --project ./_site
