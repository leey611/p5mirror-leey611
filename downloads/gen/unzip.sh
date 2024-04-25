cd "/Users/yu/Documents/itp/jht/p5mirror-leey611/downloads/../p5projects"
#
echo unzip 1 "Handpose Drawing simplified noelle-QjcYG1DPu"
rm -rf "./Handpose Drawing simplified noelle-QjcYG1DPu"
mkdir "./Handpose Drawing simplified noelle-QjcYG1DPu"
pushd "./Handpose Drawing simplified noelle-QjcYG1DPu" > /dev/null
unzip -q "../../downloads/zips/Handpose Drawing simplified noelle-QjcYG1DPu"
popd > /dev/null
#
echo unzip 2 "Handpose Drawing simplified copy-osuk-kpKl"
rm -rf "./Handpose Drawing simplified copy-osuk-kpKl"
mkdir "./Handpose Drawing simplified copy-osuk-kpKl"
pushd "./Handpose Drawing simplified copy-osuk-kpKl" > /dev/null
unzip -q "../../downloads/zips/Handpose Drawing simplified copy-osuk-kpKl"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi