#!/usr/bin/env sh

# abort on errors
set -e
npm run build
cd dist
echo 'alert.org.ua' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:ukrainesoft/alert.org.ua.git master:gh-pages
cd -
