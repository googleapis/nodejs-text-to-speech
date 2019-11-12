// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {Callback, Descriptors, ClientOptions} from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './text_to_speech_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Service that implements Google Cloud Text-to-Speech API.
 * @class
 * @memberof v1
 */
export class TextToSpeechClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  auth: gax.GoogleAuth;

  /**
   * Construct an instance of TextToSpeechClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof TextToSpeechClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof TextToSpeechClient).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.texttospeech.v1.TextToSpeech',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.texttospeech.v1.TextToSpeech.
    const textToSpeechStub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.cloud.texttospeech.v1.TextToSpeech'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.cloud.texttospeech.v1.TextToSpeech,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const textToSpeechStubMethods = ['listVoices', 'synthesizeSpeech'];

    for (const methodName of textToSpeechStubMethods) {
      const innerCallPromise = textToSpeechStub.then(
        (stub: {[method: string]: Function}) => (...args: Array<{}>) => {
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      this._innerApiCalls[methodName] = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'texttospeech.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'texttospeech.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  listVoices(
    request: protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.texttospeech.v1.IListVoicesResponse,
      protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      {} | undefined
    ]
  >;
  listVoices(
    request: protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.texttospeech.v1.IListVoicesResponse,
      protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Returns a list of Voice supported for synthesis.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} [request.languageCode]
   *   Optional. Recommended.
   *   [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. If
   *   specified, the ListVoices call will only return voices that can be used to
   *   synthesize this language_code. E.g. when specifying "en-NZ", you will get
   *   supported "en-*" voices; when specifying "no", you will get supported
   *   "no-*" (Norwegian) and "nb-*" (Norwegian Bokmal) voices; specifying "zh"
   *   will also get supported "cmn-*" voices; specifying "zh-hk" will also get
   *   supported "yue-*" voices.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListVoicesResponse]{@link google.cloud.texttospeech.v1.ListVoicesResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listVoices(
    request: protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.texttospeech.v1.IListVoicesResponse,
          | protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.texttospeech.v1.IListVoicesResponse,
      protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.texttospeech.v1.IListVoicesResponse,
      protosTypes.google.cloud.texttospeech.v1.IListVoicesRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    return this._innerApiCalls.listVoices(request, options, callback);
  }
  synthesizeSpeech(
    request: protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
      (
        | protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  synthesizeSpeech(
    request: protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
      | protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Synthesizes speech synchronously: receive results after all text input
   * has been processed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.texttospeech.v1.SynthesisInput} request.input
   *   Required. The Synthesizer requires either plain text or SSML as input.
   * @param {google.cloud.texttospeech.v1.VoiceSelectionParams} request.voice
   *   Required. The desired voice of the synthesized audio.
   * @param {google.cloud.texttospeech.v1.AudioConfig} request.audioConfig
   *   Required. The configuration of the synthesized audio.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [SynthesizeSpeechResponse]{@link google.cloud.texttospeech.v1.SynthesizeSpeechResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  synthesizeSpeech(
    request: protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
          | protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
      | protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
      (
        | protosTypes.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    return this._innerApiCalls.synthesizeSpeech(request, options, callback);
  }
}
