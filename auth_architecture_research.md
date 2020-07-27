# awesome-authentication

This is compilation of research on authentication using JWT

## Fundamentals You Must Know

### Cryptography

* [Assymetric Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography)
* [Digital Signatures : Verifying authenticity of message](https://en.wikipedia.org/wiki/Digital_signature)
* [Forward Secrecy :  A way to protect against future compromises of private key](https://en.wikipedia.org/wiki/Forward_secrecy)
* [Encryption vs Signing](https://stackoverflow.com/questions/454048/what-is-the-difference-between-encrypting-and-signing-in-asymmetric-encryption)
* [Encryption vs Encoding](https://stackoverflow.com/questions/4657416/difference-between-encoding-and-encryption)
* [Hashing vs Encoding cs Encryption vs Obfuscation](https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/)

### About Tokens

* [JWT](https://tools.ietf.org/html/rfc7519)
* [JWT vs Opaque tokens](https://medium.com/hackernoon/all-you-need-to-know-about-user-session-security-ee5245e6bdad)

### About Frameworks

* [**OAuth2.0** - authorization framework to enable third-party application obtain limited access to HTTP service](https://tools.ietf.org/html/rfc6749#section-4.1.3)
* [**OpenIDConnect** - authentication on top of OAuth2.0](https://openid.net/specs/openid-connect-core-1_0.html)

### Web-Security Recommendations

* [Authentication cheatsheet by OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
* [PKCE - Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)
* [The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)

### Secure Key Exchange In Public

* [Diffie Hellman Key Exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
* [An SO answer to build more understanding around DH algo, signatures, forward secrecy, etc.](https://security.stackexchange.com/a/73132/229503)
* [Diffie-Hellman key exchange implementation in node.js](https://medium.com/@moghiny/diffie-hellman-key-exchange-theory-and-practice-with-node-js-ab2575e14e8)

### Maintaining Forward Secrecy

* [Double Rachet Algo](https://signal.org/docs/specifications/doubleratchet/)
* [Signal protocol specs](https://signal.org/docs/) & [implemtation lib in js](https://github.com/signalapp/libsignal-protocol-javascript)

### Invalidating JWT

* [Strategies to invalidate jwt - SO Q&A](https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens)

> * Simply remove the token from the client
> * Create a token blacklist
> * Just keep token expiry times short and rotate them often
> * Contingency Plans : allow the user to change an underlying user lookup ID with their login credentials

> A common approach for invalidating tokens when a user changes their password is to sign the token with a hash of their password. Thus if the password changes, any previous tokens automatically fail to verify. You can extend this to logout by including a last-logout-time in the user's record and using a combination of the last-logout-time and password hash to sign the token. This requires a DB lookup each time you need to verify the token signature, but presumably you're looking up the user anyway.

* [Discussion: Is refreshing an expired JWT token a good strategy?](https://security.stackexchange.com/questions/119371/is-refreshing-an-expired-jwt-token-a-good-strategy)

## Securtity Risks

* [JWT attack - signature as MAC](https://snikt.net/blog/2019/05/16/jwt-signature-vs-mac-attacks/)
* [Recreating JWT validation bypass](https://insomniasec.com/cdn-assets/Insomnia_Security_-_JWT_Validation_Bypass_in_Auth0_Authentication_API.pdf)
* [3 JWT design flaws](https://rodarmer.squarespace.com/security-blog/2019/7/21/jwt-security-vulnerabilities)


## Implementations(Examples/Demos)

* [Demo: How Docusign APIs auth workflow using JWT access token and refresh tokens](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken)
* [JWT Authentication & Authorization in NodeJs/Express & MongoDB REST APIs(2019)](https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122)
* [JWT+Passport](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
* [JWT+Passport : Code](https://gist.github.com/ArVan/a8eb2bff9e453a1850d17dd3af1d0bea#file-app-js)
* [JWT+Passport : Guide on DO](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport)
* [Passport-jwt](https://github.com/mikenicholson/passport-jwt)
* [Refreshing token using node-jsonwebtoken](https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48)
* [oAuth2 server with node.js](https://blog.cloudboost.io/how-to-make-an-oauth-2-server-with-node-js-a6db02dc2ce7)
* [oAuth libraries for node.js](https://oauth.net/code/nodejs/)
* **[Inspiration: Read Firefox Accounts Code- All services including autyh-server, profile-server](https://github.com/mozilla/fxa) [Documentation](https://mozilla.github.io/application-services/docs/accounts/welcome.html)**
* **[oAuth2 server toolkit for node.js](https://github.com/jaredhanson/oauth2orize)**
* [OAuth2 Server and OpenID Connect Provider written in Go - sdk in all languages](https://github.com/ory/hydra)
* **[JavaScript client SDK to communicate with OAuth 2.0 and OpenID Connect providers](https://github.com/openid/AppAuth-JS)**
* [AuthZ lib supports ACL, RBAC, ABAC in Node.js](https://github.com/casbin/node-casbin)
* [Google OpenIDConnect authentication](https://developers.google.com/identity/protocols/oauth2/openid-connect)

## Useful Tools

* [Encode or Decode JWTs](https://www.jsonwebtoken.io/)