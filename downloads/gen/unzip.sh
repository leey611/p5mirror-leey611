cd "/Users/yu/Documents/itp/jht/p5mirror-leey611/downloads/../p5projects"
#
echo unzip 1 "ims03-yu-jtoE5kFtT"
rm -rf "./ims03-yu-jtoE5kFtT"
mkdir "./ims03-yu-jtoE5kFtT"
pushd "./ims03-yu-jtoE5kFtT" > /dev/null
unzip -q "../../downloads/zips/ims03-yu-jtoE5kFtT"
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