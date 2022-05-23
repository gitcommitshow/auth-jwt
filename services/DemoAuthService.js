/**
 * @file Various reusable functions, express middlewares, strategies for authentication flow
 */

exports.isAuthenticated = isAuthenticated;

const JwtService = require('./JwtService');

/**
 * Express middleware for authentication using JWT paradigm
 * @param {} req - Express request object
 * @param {} res - Express response object
 * @param {} next - Express next callback
 * 
 * @example
 * app.get('protectedEndpoint', [isAuthenticated], function(req, res){})
 */
function isAuthenticated(req, res, next) {
    // Get the token (Different ways : from query, from header, from body)
    // Verify
    // next() on success
    var tokenExchange = new TokenExchange()
        // TokenRead default Strategy
    switch (req.path) {
        case '/protected/api':
            tokenExchange.setTokenReadStrategy(new ReadFromHeader()).read(req);
            break;
        case '/protected/api/bearer':
            tokenExchange.setTokenReadStrategy(new ReadFromHeaderWithBearerScheme()).read(req);
            break;
        case '/protected/web-cookies':
            tokenExchange.setTokenReadStrategy(new ReadFromCookies()).read(req);
            break;
        case '/protected/web-form':
            tokenExchange.setTokenReadStrategy(new ReadFromBody()).read(req);
            break;
        case '/protected':
            tokenExchange.setTokenReadStrategy(new ReadFromUrlParam()).read(req);
            break;
        default:
            setDefaultStrategy(req, tokenExchange);
    }
    if(!tokenExchange || !tokenExchange.token){
        return res.status(401).send(`
        <h2>No token found</h2><br/><br/>
        <a href="/jwt/form" style="opacity:0.7;">Create a new token</a><br/><br/>
        `)
    }
    JwtService.verifyToken(tokenExchange.token, function(err, decodedToken){
        if (err) {
            return res.status(401).send(`
                    <b>Not Authenticated! </b><br/><code>${JSON.stringify(err)}</code>
                    <br/><a href="/">Go Home</a><br/>
                    `)
        }
        //ToDo: Sanitize the decoded jwt content
        //ToDo: Set req.user object with fields such as id, name, etc.
        console.log(JSON.stringify(decodedToken.payload, null, 4))
        if (!req.user) {
            req.user = {}
        }
        req.user.username = decodedToken.payload.user
        next()
    })    
}


/**
 * 
 * Abstract implementation of strategy to read/manipulate token in request
 * @example 
 * let tokenExchange = new TokenExchange()
 * // Define your own strategy(a function) to read a token
 * tokenExchange.setTokenReadStrategy(new MyTokenReadStrategy())
 * tokenExchange.read(req);//returns token
 * @property {Function} read(req) - Function that extracts token from request object
 * @property {Function} setTokenReadStrategy(strategyInstance) - Set strategy for reading token
 * 
 */
var TokenExchange = function() {
    this.tokenReadStrategy = null;
    this.token = "";
    this.setTokenReadStrategy = function(tokenReadStrategy) {
        this.tokenReadStrategy = tokenReadStrategy;
        return this;
    }
    this.read = function(req) {
        this.token = this.tokenReadStrategy.read(req);
        return this.token;
    }
}


// Resource: Recommended practices for authorization bearer token -> https://tools.ietf.org/html/rfc6750#section-1.1

/**
 * A strategy to read token from request query parameters.
 * Can be implemted via TokenExchange
 * @example 
 * new TokenExchange().setTokenReadStrategy(new ReadFromBody())
 * // When token was sent /apiEndpoint?access_token=String
 * @see {@link TokenExchange}
 */
var ReadFromUrlParam = function() {
    this.read = function(req) {
        if (req && req.query.access_token) {
            return req.query.access_token;
        }
        return null;
    }
}

/**
 * A strategy to read token from request body
 * Can be implemted via TokenExchange
 * @example 
 * new TokenExchange().setTokenReadStrategy(new ReadFromBody())
 * // When token was sent ia `POST /apiEndpoint -d '{access_token: String}'`
 * @see {@link TokenExchange}
 */
var ReadFromBody = function() {
    // Should have content type application/x-www-form-urlencoded
    // Should have this middleware enabled to parse body data : app.use(express.urlencoded({ extended: true })) 

    this.read = function(req) {
        if (req && req.body && req.body.access_token) {
            return req.body.access_token;
        }
        return null;
    }
}

/**
 * A strategy to read token from request cookies
 * Can be implemted via TokenExchange
 * @example 
 * new TokenExchange().setTokenReadStrategy(new ReadFromCookies())
 * @see {@link TokenExchange}
 */
var ReadFromCookies = function() {
    this.read = function(req) {
        if (req && req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }
}

/**
 * A strategy to read token from request header named `authorization`
 * Can be implemted via TokenExchange
 * @example 
 * new TokenExchange().setTokenReadStrategy(new ReadFromHeader())
 * @see {@link TokenExchange}
 */
var ReadFromHeader = function(req) {
    this.read = function(req) {
        if (req.get('Authorization')) {
            this.token = req.get('Authorization');
            return this.token;
        }
        return null;
    }
}

/**
 * A strategy to read token from **header with bearer scheme**.
 * Can be implemted via TokenExchange
 * @param {*} req : Express Request object
 * @example 
 * new TokenExchange().setTokenReadStrategy(new ReadFromHeaderWithBearerScheme())
 * @see {@link TokenExchange}
 */
var ReadFromHeaderWithBearerScheme = function(req) {
    this.read = function(req) {
        if (req.get('Authorization')) {
            var authHeader = req.get('Authorization');
            var re = /(\S+)\s+(\S+)/;
            if (typeof authHeader !== 'string') {
                return null;
            }
            var matches = authHeader.match(re);
            if (matches && matches.length > 2) {
                return matches[2];
            }
            console.log('Bad authorization header ' + authHeader);
            return null;
        }
        console.log('No authorization header ');
        return null;
    }
}

/**
 * @summary Default strategy for TokenExchange
 * @description 
 * Default strategy when authorization header is available in request = `ReadFromHeaderWithBearerScheme`.
 * Default strategy when cookies have `access_token` = `ReadFromCookie`.
 * @param {*} req 
 * @param {*} tokenExchange 
 * @see {@link TokenExchange}
 */
function setDefaultStrategy(req, tokenExchange) {
    // First check header - authorization
    if (req.get('Authorization')) {
        tokenExchange.setTokenReadStrategy(new ReadFromHeaderWithBearerScheme()).read(req);
    } else if (req && req.cookies && req.cookies.access_token) {
        tokenExchange.setTokenReadStrategy(new ReadFromCookies()).read(req);
    }
    // Second check cookie
}