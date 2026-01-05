#!/bin/bash
npm run build
npx serve -s dist -l tcp://0.0.0.0:$PORT
