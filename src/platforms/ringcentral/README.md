# About

Ringcentral provides an integrated, easy to use, cloud-based phone solution.

## References

- API: https://developers.ringcentral.com/guide/voice
- Rate Limits: https://developers.ringcentral.com/guide/basics/rate-limits

## Call-outs

- What other dialers refer to as "Users", Ringcentral refers to them as "Extensions".
- Ringcentral doesn't have created or modified timestamps for objects
- Most endpoint require an `accountId` and `extensionId` path parameter, however, they can be replaced by `~` to refer to the currently authorized account and user.
- Scopes can only be defined at the OAuth app level. That means when creating an OAuth app, you must specify your scopes then and there, and those values will be used for each new connection. Passing the scopes parameter through the oauth callback will be ignored.
