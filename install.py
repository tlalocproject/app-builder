#!/bin/env python3

# Pre install #####################################################################
# Creating .npmrc

import os

npmrc_content = ""
if os.path.exists("./.pipeline"):
    npmrc_content = f'//npm.pkg.github.com/:_authToken={os.getenv("GITHUB_TOKEN")}"\n@weelock-root:registry=https://npm.pkg.github.com"'
else:
    npmrc_content = '@weelock-root:registry=git+ssh://git@github.com-weelock/weelock-root'
with open("./.npmrc", "w") as npmrc:
    npmrc.write(npmrc_content)

# Integrating extra packages

import json

package = json.load(open("./package.json"))
extra = json.load(open("./src/package-extra.json"))

package["dependencies"] = {**package["dependencies"], **extra["dependencies"]}
package["devDependencies"] = {**package["devDependencies"], **extra["devDependencies"]}

json.dump(package, open("./package.json", "w"), indent=2)

# Install #########################################################################

# If not flag -ci in the command line arguments
if "-ci" in os.sys.argv:
    os.system("npm ci")
else:
    os.system("npm install")

# Post install ####################################################################

# Delete .npmrc
os.remove("./.npmrc")

# Restoring package.json using git
os.system("git checkout -- package.json")
