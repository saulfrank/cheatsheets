#!/bin/bash
# file: ttfb.sh
# curl command to check the time to first byte
# ** usage **
# 1. ./ttfb.sh "https://google.com"
# 2. seq 10 | xargs -n 1 ./curltime.sh "https://google.com"

curl -o /dev/null \
     -H 'Cache-Control: no-cache' \
     -s \
     -w "dnslookup: %{time_namelookup}s Connect: %{time_connect}s TTFB: %{time_starttransfer}s Total time: %{time_total}s \n" \
     $1