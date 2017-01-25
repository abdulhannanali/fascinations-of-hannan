---
title: Setting up Travis CI for Jekyll to build and deploy
summary: My first TravisCI file
layout: post
category: [travis, ci, technology]
---
[![TravisCI Mascot](/images/travis-mascot.png)](https://travis-ci.org)

I just set up first ever Continuous Integration Build Process using [TravisCI](https://travis-ci.org),
TravisCI, is pretty cool, super simple, and a joy to use. This build process was setup for this very blog,
in order to save me hassle of rebuilding the whole blog manually and then deploying it manually too.
Life was never so fun.

### Here's my build file though
```yml
language: ruby
rvm:
 - 2.3.3
 - 2.2
node_js: 6
before_install:
    - bash ./scripts/nvm.sh
    - npm install -g surge
    - npm install -g firebase-tools
script:
    - ./scripts/cibuild.sh
after_success:
    - ./scripts/deploy.sh
cache: bundler # Add caching using bundler

branches:
    except:
        - gh-pages
```

You might have noticed paths to bash scripts, majority of what TravisCI does for this blog is located 
in these scripts. You can checkout all the bash scripts in the [scripts/](https://github.com/abdulhannanali/fascinations-of-hannan/tree/travis-ci-post/scripts)
directory of this blog's Github Repository.