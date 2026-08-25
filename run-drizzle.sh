#!/bin/bash
set -a
source .env
set +a
npx drizzle-kit push --force
