/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require(`fs`);
const path = require(`path`);
const test = require(`ava`);
const tools = require(`@google-cloud/nodejs-repo-tools`);

const cmd = `node audioProfile.js`;
const cwd = path.join(__dirname, `..`);
const text = `Hello Everybody!  This is an Audio Profile Optimized Sound Byte.  `;
const outputFile = `test-output.mp3`;
// const files = [`hello.txt`, `hello.ssml`].map(name => {
//   return {
//     name,
//     localPath: path.resolve(path.join(__dirname, `../resources/${name}`)),
//   };
// });

test.before(tools.checkCredentials);

test.after.always(async () => {
  await fs.unlink(outputFile);
});

test(`Should synthesize Speech for Telephone Audio Profile`, async t => {
  t.false(fs.existsSync(outputFile));
  const output = await tools.runAsync(
    `${cmd} synthesize '${text}' -f '${outputFile}' -e telephony-class-application`,
    cwd
  );
  t.true(output.includes(`Audio content written to file: ${outputFile}`));
  t.true(fs.existsSync(outputFile));
});

test(`Should synthesize Speech for Home Theatre Audio Profile`, async t => {
  t.false(fs.existsSync(outputFile));
  const output = await tools.runAsync(
    `${cmd} synthesize '${text}' -f '${outputFile}' -e large-home-entertainment-class-device`,
    cwd
  );
  t.true(output.includes(`Audio content written to file: ${outputFile}`));
  t.true(fs.existsSync(outputFile));
});

test(`Should synthesize Speech for Car Audio Audio Profile`, async t => {
  t.false(fs.existsSync(outputFile));
  const output = await tools.runAsync(
    `${cmd} synthesize '${text}' -f '${outputFile}' -e large-automotive-class-device`,
    cwd
  );
  t.true(output.includes(`Audio content written to file: ${outputFile}`));
  t.true(fs.existsSync(outputFile));
});

test(`should synthesize Speech for Watch Audio Profile`, async t => {
  t.false(fs.existsSync(outputFile));
  const output = await tools.runAsync(
    `${cmd} synthesize '${text}' -f '${outputFile}' -e wearable-class-device`,
    cwd
  );
  t.true(output.includes(`Audio content written to file: ${outputFile}`));
  t.true(fs.existsSync(outputFile));
});
