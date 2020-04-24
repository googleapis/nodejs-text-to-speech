# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This script is used to synthesize generated parts of this library."""

import synthtool as s
import synthtool.gcp as gcp
import logging
import subprocess
import typing
import pathlib
import subprocess
from jinja2 import Template, FileSystemLoader, Environment
import re

logging.basicConfig(level=logging.DEBUG)

AUTOSYNTH_MULTIPLE_COMMITS = True


gapic = gcp.GAPICMicrogenerator()
common_templates = gcp.CommonTemplates()

versions = ["v1", "v1beta1"]

for version in versions:
    library = gapic.typescript_library(
        "texttospeech",
        generator_args={
            "grpc-service-config": f"google/cloud/texttospeech/{version}/texttospeech_grpc_service_config.json",
            "package-name": f"@google-cloud/text-to-speech",
        },
        proto_path=f"/google/cloud/texttospeech/{version}",
        version=version,
    )

    # skip index, protos, package.json, and README.md
    s.copy(
        library, excludes=["package.json", "README.md", "src/index.ts"],
    )


def find_clients(filePath: str) -> typing.List[str]:
    with open(filePath, "r") as fh:
        content = fh.read()
    return re.findall(r"\{(.*Client)\}", content)


def process_template(versions: typing.List[str], default_version: str, clients: typing.List[str]) -> None:
    templateLoader = FileSystemLoader(searchpath="./templates")
    templateEnv = Environment(loader=templateLoader)
    TEMPLATE_FILE = "index.ts.jinja2"
    index = templateEnv.get_template(TEMPLATE_FILE)
    # this is where to put args to the template renderer
    outputText = index.render(
        versions=versions, default_version=default_version, clients=clients)
    with open("src/index.ts", "w") as fh:
        fh.write(outputText)


def generate_index_ts(versions: typing.List[str], default_version: str) -> None:
    """Parses src/*/index.ts...."""
    versioned_index_ts_path = pathlib.Path(
        "src") / default_version / "index.ts"
    # TODO(Summer): replace the tsc command with a command that lists the exports.
    # output: str = subprocess.run(
    #     ["tsc", "--arg1", "yadayada", str(versioned_index_ts_path)],
    #     universal_newlines=True,
    #     stdout=subprocess.PIPE,
    #     check=True,
    # ).stdout.strip()
    # Generate index.ts from output.
    clients: typing.List[str] = find_clients(versioned_index_ts_path)
    print('=======clients::', type(clients))
    process_template(versions, default_version, clients)


generate_index_ts(versions, "v1")


"""
RAW meeting notes.

What's the input for generating index.ts?
1. versions from line 30
2. src/v1/index.ts
3. NOT src/v1beta1/index.ts, because v1 is the default version.

We will explicitly define which version is the default version in synth.py.

Step 1: modify this file in place to generate the new index.ts.
Step 2: call me back, and we'll move the new code out of this repo and into
        synthtool codebase.
"""

templates = common_templates.node_library(source_location="build/src")
s.copy(templates)

# Node.js specific cleanup
subprocess.run(["npm", "install"])
subprocess.run(["npm", "run", "fix"])
subprocess.run(["npx", "compileProtos", "src"])
