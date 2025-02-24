#!/bin/env python3

import json
import os

# Pre install #####################################################################

# Moving package-lock.json
os.system("cp src/package-lock.json package-lock.json")

# Integrating extra packages
package = json.load(open("./package.json"))
extra = json.load(open("./src/package-extra.json"))
package["dependencies"] = {**package["dependencies"], **extra["dependencies"]}
package["devDependencies"] = {**package["devDependencies"], **extra["devDependencies"]}
json.dump(package, open("./package.json", "w"), indent=2)

# Replacing git+ssh with git+https
if os.path.exists(".pipeline"):
    for package_file in ["package.json", "package-lock.json"]:
        with open(package_file, "r") as file:
            json_content = file.read()
        json_content = json_content.replace(
            "git+ssh://git@github.com-weelock",
            f'git+https://weelock-root:{os.getenv("GITHUB_TOKEN")}@github.com',
        )
        with open(package_file, "w") as file:
            file.write(json_content)

# Install #########################################################################

# If not flag -ci in the command line arguments
if "-ci" in os.sys.argv:
    os.system("npm ci")
else:
    os.system("npm install")

# Post install ####################################################################

# Restoring package-lock.json
if os.path.exists(".pipeline"):
    for package_file in ["package.json", "package-lock.json"]:
        with open(package_file, "r") as file:
            json_content = file.read()
        json_content = json_content.replace(
            f'git+https://weelock-root:{os.getenv("GITHUB_TOKEN")}@github.com',
            "git+ssh://git@github.com-weelock",
        )
        with open(package_file, "w") as file:
            file.write(json_content)

# Rescue package-lock.json
os.system("mv package-lock.json src/package-lock.json")

# Restoring package.json using git
os.system("git checkout -- package.json")
