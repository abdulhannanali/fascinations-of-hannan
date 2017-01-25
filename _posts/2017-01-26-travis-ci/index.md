---
title: Setting up Travis CI for Jekyll to build and deploy
summary: akdljklda
layout: post
category: [travis, ci, technology]
---
[![TravisCI Mascot](/images/travis-mascot.png)](https://travis-ci.org)

Setting up a Coninuous Integration Environment for my application is something I have slacked for quite some
long time. While building this blog, I aimed to setup a Travis CI build for this environment, otherwise
publishing a Jekyll blog becomes a hassle, especially if hosting service you are using is not 
[Github Pages](https://pages.github.io) and not everything Jekyll works automatically with Github Pages.

### Simplifying Continuous Integration
At it's core Continuous Integration is some code running automatically, which builds your application, checks
if it runs correctly (returning `0` exit code is considered a success) and then, it can do something depending
on the results such as deploying your application on a Server, notifying the maintainers about the build
status, alerting you that someone failed a build on `master` alerting you to check the codebase, the first thing 
in the mornign.

#### So What's Travis CI like?
It's like Bash Scripting, no it's actually bash scripting, if you have ever run a bash command in shell, you
are fully qualified to add Continuous Integration your project. TravisCI uses a file sanely named
`.travis.yml` for instructions on Building and deploying a project, but the beauty of TravisCI is,
it works, even if there's n `.travis.yml` file in the repository, however, in order to make build 
even a little more complex `.travis.yml` file becomes necessary.