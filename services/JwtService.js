/**
 * @file Provides easy to use functions for JWT related operations
 */

const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.getDefaultToken = getDefaultToken;
exports.createToken = createToken;
exports.verifyToken = verifyToken;

//-----JWT signing and verification options starts-----
//To make the JWT more efficient we need 3 things
var issuer = 'Microsoft Inc'; // Issuer (Software organization who issues the token)
var subject = 'some@user.com'; // Subject (intended user of the token)
var audience = 'microsoft.com'; // Audience (Domain within which this token will live and function)

const signOptions = {
    algorithm: 'RS256',
    expiresIn: '1d',
    mutatePayload: true,
    issuer: issuer,
    subject: subject,
    audience: audience
}

//WARNING: Whitelist only 1 algo if you can so attacker cannot fool by changing alg and create new signature with new alg
const verifyOptions = {
    algorithms: ['HS256', 'RS256', 'ES256'],
    complete: true,
    ignoreExpiration: false,
    maxAge: '21d',
    issuer: issuer,
    subject: subject,
    audience: audience
}

// Secret or keys for signing algorithms
const STATIC_SIGNING_KEY = false;
var privateKEY, publicKEY;
var cp = require('child_process'),
    assert = require('assert');

/**
 * Genrate public and private key pair programmetically
 * @param {Function} cb - callback (info)
 */
function genKeys(cb) {
    // gen private
    cp.exec('openssl genrsa 2048', function(err, priv, stderr) {
        // tmp file
        var randomfn = './' + Math.random().toString(36).substring(7);
        fs.writeFileSync(randomfn, priv);
        // gen public
        cp.exec('openssl rsa -in ' + randomfn + ' -pubout', function(err, pub, stderr) {
            // delete tmp file
            fs.unlinkSync(randomfn);
            // callback
            privateKEY = priv;
            publicKEY = pub;
            cb(JSON.stringify({ public: pub, private: priv }, null, 4));
        });

    });
}

if (!STATIC_SIGNING_KEY) {
    genKeys(console.log);
} else {
    // Genrate public and private key pair using openssl on your machine
    // 1. openssl genrsa -out rsakey 2048
    // 2. openssl rsa -in rsakey -pubout -out rsakey.pub
    privateKEY = fs.readFileSync('./keys/rsakey', 'utf8'); // to sign JWT
    publicKEY = fs.readFileSync('./keys/rsakey.pub', 'utf8'); // to verify JWT
}
var secret = "secret"; //ToDo: Move credentials to env

/**
 * A temporary hack to set the choice of user's preferred algorithm and default secret/keys accordingly
 * @param {String} algorithm 
 * @param {Boolean} isSigningRequest 
 */
function updateSecretMethod(algorithm, isSigningRequest) {
    //TODO: Maintain different choices for different users instead of keeping one global choice for all.
    //This will definitely create issues when there are multiple users choosing differente algorithms.
    if (algorithm === "HS256") {
        secret = "secret";
    } else {
        if (isSigningRequest) {
            secret = privateKEY;
        } else {
            secret = publicKEY;
        }
    }
}
// ---JWT signing and verification options ends-----

/**
 * Creates a signed JWT token with default configs and payload
 * @param {Function} cb (err, token)
 */
function getDefaultToken(cb){
    updateSecretMethod(signOptions.algorithm, true);
    console.log(JSON.stringify(signOptions));
    var token = jwt.sign({ data: "I secretly like Momina Mustehan" }, secret, signOptions)
    return cb(null, token);
}

/**
 * Verifies a JWT token and returns decoded token
 * @param {String} token - The JWT token string which needs to be verified
 * @param {Function} cb (err, decodedToken)
 */
function verifyToken(token, cb){
    updateSecretMethod(signOptions.algorithm, false);
    console.log(JSON.stringify(verifyOptions));
    jwt.verify(token.toString(), secret, verifyOptions, function(err, decodedToken) {
        return cb(err, decodedToken)
    })
}


/**
 * Creates a JWT token
 * @param {Object} options  {algorithm:string, payload: Object}
 * @param {Function} cb (err, token)
 */
function createToken(options, cb){
    if (options.algorithm) signOptions['algorithm'] = options.algorithm;
    updateSecretMethod(signOptions.algorithm, true);
    console.log(JSON.stringify(signOptions));
    var token = jwt.sign(options.payload, secret, signOptions);
    return cb(null, token);
}