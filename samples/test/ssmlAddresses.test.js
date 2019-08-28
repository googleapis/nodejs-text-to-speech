/**
 * Copyright 2019 Google LLC
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

const fs = require('fs');
const path = require('path');
const {assert} = require('chai');
const cp = require('child_process');

var ssmlAddresses = require('./../ssmlAddresses');

const cmd = 'node ssmlAddresses.js';
const inputFile = 'resources/example.txt';
const outputFile = 'resources/example.mp3';

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

describe('ssmlAddresses', () => {

  it('input text tagged with SSML', () => {
    try {
      var expected_ssml = fs.readFileSync('resources/example.ssml', 'utf8');
    } catch(e) {
      console.log('Error:', e.stack);
    }

    var ssml = ssmlAddresses.textToSsml(inputFile);
    
    assert.strictEqual(expected_ssml, ssml);
  });

  it('synthesize speech to local mp3 file', async () => {
    // test will fail if a 'resources/example.mp3' file exists
    assert.strictEqual(fs.existsSync(outputFile), false);
    const output = execSync(`${cmd}`);
    assert.match(output, /Audio content written to file resources\/example.mp3/);
    assert.strictEqual(fs.existsSync(outputFile), true);
    fs.unlinkSync(outputFile)
  });
});
