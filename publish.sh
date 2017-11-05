#!/bin/bash

cd `dirname $0`

# production build
npm run build

# s3 sync
echo "s3 sync"
export AWS_DEFAULT_PROFILE=bango
aws s3 sync --exact-timestamps ./dist s3://eikatou.bango --exclude *.tmp --exclude .DS_Store
aws s3 ls s3://eikatou.bango