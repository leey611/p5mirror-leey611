cd "/Users/yu/Documents/itp/jht/p5mirror-leey611/downloads/../p5projects"
#
echo unzip 1 "p5-mirror-example-test-XOWKALF76"
rm -rf "./p5-mirror-example-test-XOWKALF76"
mkdir "./p5-mirror-example-test-XOWKALF76"
pushd "./p5-mirror-example-test-XOWKALF76" > /dev/null
unzip -q "../../downloads/zips/p5-mirror-example-test-XOWKALF76"
popd > /dev/null
#
echo unzip 2 "p5-mirror-example-test-MxBS3wYtQ"
rm -rf "./p5-mirror-example-test-MxBS3wYtQ"
mkdir "./p5-mirror-example-test-MxBS3wYtQ"
pushd "./p5-mirror-example-test-MxBS3wYtQ" > /dev/null
unzip -q "../../downloads/zips/p5-mirror-example-test-MxBS3wYtQ"
popd > /dev/null
#
echo unzip 3 "p5-mirror-example2-TWmy57aER6"
rm -rf "./p5-mirror-example2-TWmy57aER6"
mkdir "./p5-mirror-example2-TWmy57aER6"
pushd "./p5-mirror-example2-TWmy57aER6" > /dev/null
unzip -q "../../downloads/zips/p5-mirror-example2-TWmy57aER6"
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