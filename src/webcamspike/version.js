/* eslint-disable  no-undef, no-console, prefer-template */
// if these global vars were created by git-revision-webpack-plugin, log to console
if (VERSION && BRANCH && COMMIT) {
  console.log('----------------');
  console.log('version: ' + VERSION);
  console.log(' branch: ' + BRANCH);
  console.log(' commit: ' + COMMIT);
  console.log('----------------');
}
/* eslint-enable  no-undef, no-console, prefer-template */
