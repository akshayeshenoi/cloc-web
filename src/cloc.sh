cd temp
git clone $1 --depth=1
cd $2 
git ls-files | xargs cloc --json
