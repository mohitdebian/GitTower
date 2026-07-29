#!/bin/bash
while true; do
    if ps aux | grep "npm install" | grep -v grep > /dev/null; then
        sleep 5
    else
        break
    fi
done
