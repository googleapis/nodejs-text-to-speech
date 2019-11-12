import * as execa from 'execa';
import * as mv from 'mv';
import {ncp} from 'ncp';
import * as tmp from 'tmp';
import {promisify} from 'util';

const keep = false;
const mvp = promisify(mv);
const ncpp = promisify(ncp);
const stagingDir = tmp.dirSync({keep, unsafeCleanup: true});
const stagingPath = stagingDir.name;
const pkg = require('../../package.json');

describe('📦 pack and install', () => {
  it('should be able use the library from a TypeScript application', async function() {
    this.timeout(300000);
    await execa('npm', ['pack', '--unsafe-perm']);
    const packageName = pkg.name.replace('@', '').replace('/', '-');
    const tarball = `${packageName}-${pkg.version}.tgz`;
    await mvp(tarball, `${stagingPath}/texttospeech.tgz`);
    await ncpp('system-test/fixtures/sample', `${stagingPath}/`);
    await execa('npm', ['install', '--unsafe-perm'], {
      cwd: `${stagingPath}/`,
      stdio: 'inherit',
    });
    await execa('node', ['--throw-deprecation', 'build/src/index.js'], {
      cwd: `${stagingPath}/`,
      stdio: 'inherit',
    });
  });

  after('cleanup staging', () => {
    if (!keep) {
      stagingDir.removeCallback();
    }
  });
});
