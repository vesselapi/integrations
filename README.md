![Title image of Vessel](assets/images/title-image.png)

<h1 align="center">
Embedded Sales Integrations OS
</h1>

<div align="center">
<i>Get up and running with top GTM integrations in minutes</i>
</div>

<p align="center">
  <br/>
    <a href="https://docs.vessel.dev">Documentation</a>
    |
    <a href="https://vessel.dev">Get an API Key</a>
    |
    <a href="https://vesselapi.canny.io/">Request a Feature or Integration</a>
</p>

# Vessel Integrations Library

The Vessel platform is built on top of this integrations library, allowing us to write powerful modules like the [Unified API]() and [Managed ETL]() easy and fast. This library is primarily responsible for defining, owning, and maintaining the interface with the downstream providers we have integrations with. This includes:

- Defining meta data like the icon, name, category, etc for each integration.
- Managing the different auth types a given integration supports (oauth2, api key, etc).
- Providing a client that will automatically refresh credentials and ensure the API call is authenticated correctly.
- Providing a passthrough API that allows you to make raw API calls to the downstream provider without having to worry about authentication.

There are two primary ways to use the integrations library:

## 1. Actions

Actions provide a first class interface for interacting with the integrations we support. Actions provide a significantly improved developer experience than making a raw API call to the downstream platform, by:

1. Validating API responses and request inputs with zod.
2. Providing well documented APIs so you don't need to refer to the downstream provider's documentation.
3. Standardization across common data types and fields
   3a. All dates are returned as ISO strings
   3b. All ids are returned as strings
4. Simplified use cases for common workflows and handling common quirks in the integration.
5. [Future] Strongly typed SDK.

In general, actions are meant to make interfacing with downstream providers as effortless and efficient as possible.

## 2. Passthrough

Each integration also supports a "passthrough" API which attaches the authentication credentials to a request and then passes it directly to the downstream provider without running any validations or transformations.

This is useful when you need to make a request to an endpoint that currently doesn't have an action defined in the library such as when experimenting or prototyping.

# Usage

You shouldn't have a need to import and use this library directly and instead should use the actions defined in this library through [the Actions API](https://docs.vessel.land) (free to get started).

# Support

Contact us at `support@vessel.dev` for any questions or issues.

# Security

Security is a top priority at Vessel, if you'd like to report a suspected security issue or have any questions about the security of our product, please contact security@vessel.dev and we'll respond within 24 hours.

```

```
