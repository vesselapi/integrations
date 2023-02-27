# Contributing to Vessel Integrations

Thank you for investing your time in contributing to our integrations package!

TODO: Talk more about how to contribute...

## CI/CD

In short, developers are responsible for changing the version of the package (via the _package.json_) in their PRs but github actions will verify the version change, build, release, and publish.

### Publishing

The package `@vesselapi/integrations` is automatically published when a PR is merged to the _main_ branch **and** the version in the package.json does not yet exist. This means, if you merge a PR, and in that PR you change the version from `1.0.0` to `2.0.0` github actions will create a release, tag the commit with the version, build the library, and publish it to NPM.

### Labels

Some PRs do not include a code change, or they include a code change that we don't currently want to release. Some PRs have changes you want to verify end-to-end before merging. We manage _what_ gets merged _when_ using the pull request labels `release` and `prerelease`.

When the `prerelease` label is added to a pull request:

- the version in the package.json is verified, asserting that it is greater than the version in the main branch and includes a prerelease suffix (_e.g 1.2.3-rc.1_)
- the package is published to NPM with the `--next` tag. The next tag is how alpha and beta package versions are published to NPM. When a developer runs `npm install @vesselapi/integrations` versions with the next tag are ignored -- unless they are specifically specified `npm install @vesselapi/integrations@1.2.3-rc.1`.

When the `release` label is added to a pull request:

- the version in the package.json is verified, asserting that it is greater than the version in the main branch and does not include a prerelease suffix

When no release label is provided github actions verifies that the version has not changed so versions of the package are not published erroneously.
