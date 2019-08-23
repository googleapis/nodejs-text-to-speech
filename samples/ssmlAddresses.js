/**
 * Copyright 2019, Google, Inc.
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

// [START tts_quickstart]
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const escape = require('escape-html');
const util = require('util');


async function ssmlToAudio(ssmlText, outFile) {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // The text to synthesize
  const text = 'Hello, world!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

async function textToSsml(inputFile) {

  // Read input file
  try {
    var rawLines = fs.readFileSync(inputFile, 'utf8');
  } catch(e) {
    console.log('Error:', e.stack);
  }

  // Replace special characters with HTML Ampersand Character Codes
  // These codes prevent the API from confusing text with SSML tags
  // For example, '<' --> '&lt;' and '&' --> '&amp;'
  var escapedLines = escape(rawLines);

  // Convert plaintext to SSML
  // Tag SSML so that there is a 2 second pause between each address
  var expandedNewline = escapedLines.replace(/\n/g,'\n<break time="2s"/>');
  var ssml = '<speak>' + expandedNewline + '</speak>';

  // Return the concatenated String of SSML
  return ssml;
}


async function main() {
  const inputFile = 'sandbox.txt';
  const outFile = 'example.mp3';
  var ssml = textToSsml(inputFile);
  console.log(ssml);
  ssmlToAudio(ssml, outFile);
}
// [END tts_quickstart]
main().catch(console.error);