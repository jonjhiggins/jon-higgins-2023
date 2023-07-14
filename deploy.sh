#!/bin/sh

export $(cat .env | xargs)

rsync -avz -e "ssh -p ${PORT}" --delete \
${BUILD_DIR} \
${USER}@${HOST}:${DIR} \
--exclude=${EXCLUDE}

exit 0