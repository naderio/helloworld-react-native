#!/usr/bin/env bash
set -eou pipefail -x

BUILD=$1

if [ -z "$BUILD" ] || [ ! -f "$BUILD" ] ; then
  echo 'No build is found' >&2
  exit 1
fi

if [ -n "$APPETIZE_PLATFORM" ] && [ -n "$APPETIZE_ID" ] ; then
  curl --fail "https://${APPETIZE_TOKEN}@api.appetize.io/v1/apps/${APPETIZE_ID}" -F "file=@${BUILD}" -F "platform=${APPETIZE_PLATFORM}" -F "note=${CI_COMMIT_SHA}"
fi

if [ -n "$DEPLOY_PATH" ] && [ -d "$DEPLOY_PATH" ]; then
  cp "$BUILD" "$DEPLOY_PATH"
elif [ -n "$DEPLOY_SSH_TARGET" ] && [ -n "$DEPLOY_SSH_PATH" ]; then
  rsync -rlzv -e 'ssh' "$BUILD" "${DEPLOY_SSH_TARGET}:${DEPLOY_SSH_PATH}"
elif [ -n "$DEPLOY_FTP_DOMAIN" ] && [ "$DEPLOY_FTP_PATH" ] && [ -n "$DEPLOY_FTP_USERNAME" ] && [ -n "$DEPLOY_FTP_PASSWORD" ]; then
  curl --fail --ftp-create-dirs -u "${DEPLOY_FTP_USERNAME}:${DEPLOY_FTP_PASSWORD}" "ftp://${DEPLOY_FTP_DOMAIN}${DEPLOY_FTP_PATH}/${CI_COMMIT_REF_SLUG}/" -T $BUILD
else
  echo 'No deployment target is found' >&2
fi
