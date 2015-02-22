npm run less
npm run example
cd ../css-transition-group-gh-pages
rm -rf build/
mkdir build
cp -r ../css-transition-group/build/ build
git add --all
git commit -am "update examples"
git push origin gh-pages:gh-pages