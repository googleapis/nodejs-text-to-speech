/**
 * Copyright 2017, Google, Inc.
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

function synthesize_text(text, outputFile, effectsProfileId) {
  //[START tts_synthesize_text]
  //Synthesizes speech from the input string of text
  const speech = require('@google-cloud/text-to-speech');
  const fs = require('fs');

  //Imports the Google Cloud client library
  //Creates a client
  const client = new speech.TextToSpeechClient();

  /*
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const text = 'Text to synthesize, eg. hello';
  //const outputFile = 'Local path to save audio file to, e.g. output.mp3';

  const request = {
    input: {text: text},
    voice: {languageCode: 'fr-CA', ssmlGender: 'MALE'},
    audioConfig: {audioEncoding: 'MP3'},
    effectsProfileId: effectsProfileId,
  };

  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error(`ERROR:`, err);
      return;
    }

    fs.writeFile(outputFile, response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        return;
      }
      console.log(`Audio content written to file: ${outputFile}`);
    });
  });
  // [END tts_synthesize_text]
}

const outputfile = `hello.mp3`;
synthesize_text(
  `HI EVERYBODY!  THIS IS A TEST`,
  outputfile,
  `telephony-class-application`
);

//default effectsProfileID is:
//`telephony-class-application`
