SUCCESS='\033[0;32m'
WARNING='\033[0;33m'
DANGER='\033[0;31m'
GREY='\033[1;36m'
WHITE='\033[0;37m'
DANGER_BOLD='\033[1;31m'
NEUTRAL='\033[0m'

# ---- RELEASE INFOS ----

echo -e "${WARNING}🙌  Nicely done! Time to release your work!${NEUTRAL}"
sleep 1

echo ""
echo -e "${WHITE}What's the version of the new release?${NEUTRAL} (e.g. 1.8.0)"
read -p "" version;
tag=$version

echo ""
echo -e "${WHITE}Is it an official release?${NEUTRAL} (Yy/Nn)"

while true; do
  read -p "" isOfficialReleaseInput
    case $isOfficialReleaseInput in
        [Yy]* )
          isOfficialRelease=true

          branchName="master"

          break;;
        [Nn]* )
          isOfficialRelease=false

          echo ""
          echo -e "${WHITE}Index of the beta?${NEUTRAL} (e.g. 0, 1...)"
          read -p "" betaIndex

          tag+="-beta.";
          tag+=$betaIndex

          echo ""
          echo -e "${WHITE}What's the branch name?${NEUTRAL}"
          read -p "" branchName;

          break;;
        * )
          echo "Please answer Y or y for yes, N or n for no";;
    esac
done

echo ""
echo -e "${WHITE}🚀  Alright! Let's publish json-schema-to-ts@${DANGER_BOLD}${tag}${NEUTRAL}"
sleep 1

# ---- SYNCHRONIZING WITH BRANCH ----

echo ""
echo -e "${WHITE}⏱  Synchronizing with branch...${NEUTRAL}"
sleep 1

echo ""
echo -e "${GREY}git stash${NEUTRAL}"
git stash

echo ""
echo -e "${GREY}git checkout ${branchName}${NEUTRAL}"
git checkout $branchName;
if [ $? = 1 ]; then
  exit 1;
fi

echo ""
echo -e "${GREY}git pull${NEUTRAL}"
git pull

# ---- TESTS ----

echo ""
echo -e "${WHITE}🎯  Running tests...${NEUTRAL}"
sleep 1

echo ""
echo -e "${GREY}Checking types${NEUTRAL}"
yarn tsc --noEmit
if [ $? = 1 ]; then
  exit 1;
fi

echo ""
echo -e "${GREY}Unit tests${NEUTRAL}"
yarn jest
if [ $? = 1 ]; then
  exit 1;
fi

echo ""
echo -e "${SUCCESS}🎉  All tests pass!${NEUTRAL}"
sleep 1

# ---- BUILD ----

echo ""
echo -e "${WARNING}🏗  Building project...${NEUTRAL}"
sleep 1

echo ""
echo -e "${WHITE}Cleaning build directories...${NEUTRAL}"
sleep 1

echo -e ""
echo -e "${GREY}rm -rf lib${NEUTRAL}"
rm -rf lib
if [ $? = 1 ]; then
  exit 1;
fi

echo -e ""
echo -e "${GREY}rm -rf builds${NEUTRAL}"
rm -rf builds
if [ $? = 1 ]; then
  exit 1;
fi

echo ""
echo -e "${WHITE}Building lib from src...${NEUTRAL}"
sleep 1

echo -e ""
echo -e "${GREY}tsc --emitDeclarationOnly --declaration --declarationDir lib ./src/*.ts${NEUTRAL}"
yarn tsc --emitDeclarationOnly --declaration --declarationDir lib ./src/*.ts
if [ $? = 1 ]; then
  exit 1;
fi

echo ""
echo -e "${WHITE}Building deno build...${NEUTRAL}"
sleep 1

echo -e ""
echo -e "${GREY}node scripts/buildDeno.js lib builds/deno .d.ts${NEUTRAL}"
node scripts/buildDeno.js lib builds/deno .d.ts
if [ $? = 1 ]; then
  exit 1;
fi


echo ""
echo -e "${SUCCESS}🎉  Project built successfully!${NEUTRAL}"
sleep 1

# ---- RELEASE ----

echo ""
echo -e "${WARNING}🚀  Releasing!${NEUTRAL}"
sleep 1

echo ""
echo -e "${WHITE}Bumping version${NEUTRAL}"
sleep 1

echo -e ""
echo -e "${GREY}npm version ${tag}${NEUTRAL}"
gitTag=$(npm version ${tag} --allow-same-version true --git-tag-version false --commit-hooks false)

echo -e ""
echo -e "${GREY}git add .${NEUTRAL}"
git add .

echo -e ""
echo -e "${GREY}git commit -m '${gitTag} release'${NEUTRAL}"
git commit -m "${gitTag} release"

echo -e ""
echo -e "${GREY}git tag -a ${gitTag} -m '${gitTag} release'${NEUTRAL}"
git tag -a ${gitTag} -m "${gitTag} release"

echo ""
echo -e "${WHITE}Publishing on npm${NEUTRAL}"
sleep 1

echo -e ""
echo -e "${GREY}npm publish --tag ${tag}${NEUTRAL}"
npm publish

echo ""
echo -e "${WHITE}Publishing to github${NEUTRAL}"
sleep 1

echo -e ""
echo -e "${GREY}git push${NEUTRAL}"
git push

echo -e ""
echo -e "${GREY}git push --tag${NEUTRAL}"
git push --tag


echo ""
echo -e "${SUCCESS}🎉  Project released successfully!${NEUTRAL}"
sleep 1

# ---- CLEAN UP ----

echo -e ""
echo -e "${GREY}rm -rf lib${NEUTRAL}"
rm -rf lib
