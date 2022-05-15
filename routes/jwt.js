var express = require("express");
var router = express.Router();

const JwtService = require('../services/JwtService');

/**
 * Generates and responds with a default token
 */
router.get('/', function(req, res) {
    JwtService.getDefaultToken(function(err, token){
        if(req.wantsJson){
            // Response only for JSON APIs
            return res.status(200).send({
                token: token,
                statusText: "Created a token with default settings",
                statusCode: "DEFAULT_TOKEN_CREATED"
            })
        }
        return res.render('jwt', { 
            token: token, 
            CODE_REPOSITORY: CODE_REPOSITORY, 
            NEW_ISSUE_URL: NEW_ISSUE_URL,
            statusText: "Created a token with default settings",
            statusCode: "DEFAULT_TOKEN_CREATED"
        })
    })
})

/**
 * Verifies a token and responds with the decoded token
 */
router.get('/verify/:token', function(req, res) {
    var token = req.params.token;
    if(!token){
        return res.status(400).send({ statusText: "Please provide the token in the request", statusCode: "VALIDATION_ERROR" });
    }
    JwtService.verifyToken(token, function(err, decodedToken) {
        if (decodedToken) {
            if(req.wantsJson){
                // Response only for JSON APIs
                return res.status(200).send({
                    decodedToken: decodedToken, 
                    statusText: "Verified the token successfully",
                    statusCode: "TOKEN_VERIFIED"
                })
            }
            res.render('jwt/verify/success', { 
                decodedToken: decodedToken, 
                CODE_REPOSITORY: CODE_REPOSITORY, 
                NEW_ISSUE_URL: NEW_ISSUE_URL,
                statusText: "Verified the token successfully",
                statusCode: "TOKEN_VERIFIED"
            })
        } else {
            if(req.headers['content-type'] === "application/json"){
                // Response only for JSON APIs
                return res.status(500).send({
                    statusText: JSON.stringify(err), 
                    statusCode: "TOKEN_VERIFICATION_FAILED" 
                })
            }
            res.render('jwt/verify/failure', { 
                CODE_REPOSITORY: CODE_REPOSITORY, 
                NEW_ISSUE_URL: NEW_ISSUE_URL,
                statusText: JSON.stringify(err), 
                statusCode: "TOKEN_VERIFICATION_FAILED" 
            })
        }
    })
})

/**
 * Information page to create custom token
 */
router.get('/form', function(req, res) {
    res.render('jwt/create/form')
})

/**
 * Create custom token with given params and responds with the token
 */
router.post('/', function(req, res) {
    console.log(JSON.stringify(req.body))
    var options = {};
    options.algorithm = req.body.alg;
    options.payload = req.body.payload;
    if (typeof options.payload === 'string') {
        try {
            options.payload = JSON.parse(options.payload);
        } catch (e) {
            if (e) console.log('Invalid json string' + options.payload + "\n. Error:" + e)
        }
    }
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    JwtService.createToken(options, function(err, token){
        if(req.wantsJson){
            // Response only for JSON APIs
            return res.status(201).send({
                token: token, 
                statusText: "Created the token successfully",
                statusCode: "TOKEN_CREATED"
            })
        }
        res.render('jwt/create/success', { 
            token: token, 
            algorithm: options.algorithm,
            payload: options.payload,
            CODE_REPOSITORY: CODE_REPOSITORY,
            NEW_ISSUE_URL: NEW_ISSUE_URL,
            statusText: "Created the token successfully",
            statusCode: "TOKEN_CREATED"
        })
    })
})

module.exports = router;