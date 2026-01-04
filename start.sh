#!/bin/bash
npm run build
npx serve -s dist -l ${PORT:-3000}
