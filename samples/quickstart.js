// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(
){
  // [start tts_quickstart]
  // imports the google cloud client library
  const textToSpeech = require('@google-cloud/text-to-speech');

  // import other required libraries
  const fs = require('fs');
  const util = require('util');
  // creates a client
  const client = new textToSpeech.TextToSpeechClient();
  async function quickStart() {

    // the text to synthesize
    const text = 'hello, world!';

    // construct the request
    const request = {
      input: {text: text},
      // select the language and ssml voice gender (optional)
      voice: {languageCode: 'en-us', ssmlGender: 'neutral'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };

    // performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('audio content written to file: output.mp3');
  }
  quickStart();
  // [end tts_quickstart]
}

main(...process.argv.slice(2));
