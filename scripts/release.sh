#!/bin/bash
echo "¿Qué versión? (ej: 1.2.0)"
read version

git checkout main
git pull origin main
git checkout -b release/v$version
git push origin release/v$version
git tag -a v$version -m "Release v$version"
git push origin v$version

echo "Release v$version enviado a Netlify. Producción actualizada."