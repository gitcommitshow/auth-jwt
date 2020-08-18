![Banner](./banner_auth_jwt.png)

A demo to learn JWT by reverse engineering

## How To Use It

1. Head over to the [demo hosted on repl.it](https://auth-jwt--gitcommitshow.repl.co/) (Or run it on your local machine : clone repo -> npm install -> npm start)
2. Play around with the configurations
3. Read the cues at every page with more resources to go deeper into concepts


![Demo GIF](./demo.gif)


## References

### About Tokens

* [JWT](https://tools.ietf.org/html/rfc7519)
* [JWT vs Opaque tokens](https://medium.com/hackernoon/all-you-need-to-know-about-user-session-security-ee5245e6bdad)


### Cryptography

* [Assymetric Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography)
* [Digital Signatures : Verifying authenticity of message](https://en.wikipedia.org/wiki/Digital_signature)
* [Forward Secrecy :  A way to protect against future compromises of private key](https://en.wikipedia.org/wiki/Forward_secrecy)
* [Encryption vs Signing](https://stackoverflow.com/questions/454048/what-is-the-difference-between-encrypting-and-signing-in-asymmetric-encryption)
* [Encryption vs Encoding](https://stackoverflow.com/questions/4657416/difference-between-encoding-and-encryption)
* [Hashing vs Encoding cs Encryption vs Obfuscation](https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/)


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

## Other Useful Tools

* [Encode or Decode JWTs](https://www.jsonwebtoken.io/)
