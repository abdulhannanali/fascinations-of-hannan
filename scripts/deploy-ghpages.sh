set -e

REPO="https://github.com/abdulhannanali/fascinations-of-hannan"
SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
#     echo "Skipping deploy"
#     exit 0
# fi

# REPO=`git config remote.orgin.url`
git clone $REPO build
cd build

git config user.name "Travis Hannan"
git config user.email "travis@hannanali.tech"
