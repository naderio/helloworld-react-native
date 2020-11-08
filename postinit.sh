#!/usr/bin/env bash
set -eou pipefail -x

if [ -z "$TEMPLATE_CODE_NAME" ] || [ -z "$TEMPLATE_DISPLAY_NAME" ] || [ -z "$TEMPLATE_PACKAGE_ID" ] ; then
  echo "Make sure to define TEMPLATE_CODE_NAME, TEMPLATE_DISPLAY_NAME, and TEMPLATE_PACKAGE_ID envirenment variables" >&2
  exit 1
fi

APP_NAME_CODE=$TEMPLATE_CODE_NAME
APP_NAME_DISPLAY=$TEMPLATE_DISPLAY_NAME
APP_NAME_CODE_ALT=${APP_NAME_CODE,,}
APP_PACKAGE_ID=$TEMPLATE_PACKAGE_ID

TEMPLATE_NAME_CODE='H%elloWorld'
TEMPLATE_NAME_CODE=${TEMPLATE_NAME_CODE//%/}

TEMPLATE_NAME_CODE_ALT='h%elloworld'
TEMPLATE_NAME_CODE_ALT=${TEMPLATE_NAME_CODE_ALT//%/}

TEMPLATE_NAME_DISPLAY_1='H%ello World'
TEMPLATE_NAME_DISPLAY_1=${TEMPLATE_NAME_DISPLAY_1//%/}

TEMPLATE_NAME_DISPLAY_2='H%ello App Display Name'
TEMPLATE_NAME_DISPLAY_2=${TEMPLATE_NAME_DISPLAY_2//%/}

# replace default values

QUERY="
  s|$TEMPLATE_NAME_CODE|$APP_NAME_CODE|g
  s|$TEMPLATE_NAME_CODE_ALT|$APP_NAME_CODE_ALT|g
  s|$TEMPLATE_NAME_DISPLAY_1|$APP_NAME_DISPLAY|g
  s|$TEMPLATE_NAME_DISPLAY_2|$APP_NAME_DISPLAY|g
  s|com\.$APP_NAME_CODE_ALT\.app|$APP_PACKAGE_ID|g
  s|$APP_NAME_CODE_ALT-lib|$TEMPLATE_NAME_CODE_ALT-lib|g
"

find ./ \
  ! -path '*/node_modules/*' \
  ! -path '*/.git/*' \
  -type f -exec grep -Iq . {} \; \
  -print | while read file
do
  sed -i'' "$QUERY" "$file"
done

# template

rm ./README.md
mv ./README.template.md ./README.md

rm ./package.json
mv ./package.template.json ./package.json

rm ./.gitlab-ci.yml
mv ./.gitlab-ci.template.yml ./.gitlab-ci.yml

[ -z "${npm_execpath##*yarn*}" ] && sed -i'' "s|npm |yarn |g" ./README.md
[ -z "${npm_execpath##*yarn*}" ] && sed -i'' "s|npm |yarn |g" ./.gitlab-ci.yml

[ -z "${npm_execpath##*yarn*}" ] && mv yarn.template.lock yarn.lock
[ -z "${npm_execpath##*yarn*}" ] || mv package-lock.template.json package-lock.json

rm ./lib/$APP_NAME_CODE_ALT-lib.tgz
curl https://raw.githubusercontent.com/naderio/$TEMPLATE_NAME_CODE_ALT-react-native/master/lib/$TEMPLATE_NAME_CODE_ALT-lib.tgz --output ./lib/$TEMPLATE_NAME_CODE_ALT-lib.tgz

# cleanup

rm ./*.sh ./template.config.js .npmignore ./*.template.*

chmod u+x ./scripts/*.sh

# git

rm -fr ./.git

git init

git add .

git add -f $(find . -name .gitkeep)
