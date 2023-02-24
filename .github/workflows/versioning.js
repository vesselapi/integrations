const semver = require("semver")

const { PR_VERSION: pr, BASE_VERSION: base } = process.env

exports.assert = {}

exports.assert.isValidPrerelease = ({ github, context, core }) => {
  const pr_clean = pr.replace(/\-.+$/, '')
  const pr_is_greater = semver.gt(pr_clean, base)

  if (pr_is_greater) {
    core.debug(`The pr version (${pr} -> ${pr_clean}) is higher than the base version (${base}).`)
  } else {
    core.setFailed(`The pr version (${pr}) is not greater than the base version (${base}). A pull request labeled with 'prerelease' must have a valid version bump.`)
  }
  const pr_is_prerelease = semver.prerelease(pr) !== null
  if (pr_is_prerelease) {
    core.debug(`The pr version (${pr}) is a prerelease.`)
  } else {
    core.setFailed(`The pr version (${pr}) is not a prerelease. A pull request labeled with 'prerelease' must have a valid prerelease version (1.2.3-rc.1).`)
  }
}

exports.assert.isValidRelease = ({ github, context, core }) => {
  const pr_is_greater = semver.gt(pr, base)
  if (pr_is_greater) {
    core.debug(`Success, the pr version (${pr}) is higher than the base version (${base}).`)
  } else {
    core.setFailed(`The pr version (${pr}) is not greater than the base version (${base}). A pull request labeled with 'release' must have a valid version bump.`)
  }
  const pr_is_prerelease = semver.prerelease(pr) !== null
  if (!pr_is_prerelease) {
    core.debug(`The pr version (${pr}) is not a prerelease.`)
  } else {
    core.setFailed(`The pr version (${pr}) is a prerelease. A pull request labeled with 'release' cannot have a prerelease version (1.2.3-alpha.1 or 1.2.3-rc.1)`)
  }
}

exports.assert.isUnchanged = ({ github, context, core }) => {
  if (pr.trim() === base.trim()) {
    core.debug(`Success, the pr version (${pr}) is the same as the base version (${base}).`)
  } else {
    core.setFailed(`The pr version (${pr}) is not the same as the base version (${base}). A pull request without a 'release' or 'prerelease' label cannot include a version bump.`)
  }
}