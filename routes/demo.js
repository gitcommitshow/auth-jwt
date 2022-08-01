/**
 * @file Routes for various authentication examples to demo various techniques
 */

var express = require("express");
var router = express.Router();

const JwtService = require('../services/JwtService');
const DemoAuthService = require('../services/DemoAuthService');

// Using multer to handle form data
const multer = require('multer');
const upload = multer();

router.get('/protected', DemoAuthService.isAuthenticated, function(req, res) {
    var token = req.query.access_token;
    if(req.wantsJson){
        return res.status(200).send({
            token: token,
            statusText: "User authenticated successfully",
            statusCode: "Authentication_Success"
         })
    }
    res.render('demo/home', {
        token: token,
        statusText: "User authenticated successfully",
        statusCode: "Authentication_Success"
     })
})

router.post('/protected/web-form', DemoAuthService.isAuthenticated, function(req, res) {
    console.log(req.get('Content-Type'));
    var token = req.body.access_token;
    if(req.wantsJson){
        return res.status(200).send({
            token: token,
            statusText: "User authenticated successfully",
            statusCode: "Authentication_Success"
         })
    }
    res.render('demo/tokenInBody', {
        token: token,
        statusText: "User authenticated successfully",
        statusCode: "Authentication_Success"
     });
})

// Get token
router.post('/oauth/token', upload.none(), function(req, res) {
    console.log('formData: ', req.body)
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        if(username != 'user' || password != 'pass'){
            return res.status(403).send({
                statusText: "Bad credentials",
                statusCode: "UNAUTHORIZED"
            })
        }
        //User presented right credentials, let's issue a token now
        JwtService.createToken({ payload: { user: username, lastLogin: new Date().getTime() } }, function(err, token){
            res.cookie('access_token', token, {
                secure: false, // set this to true if you're using https
                httpOnly: true,
            });
            return res.send({
                "access_token": token,
                "token_type": "Bearer",
                "expires_in": "Do We Need To Send Expiration Date Separately",
                "refresh_token": "Not_Implemented"
            })
        })
    } else {
        return res.status(401).send({
            "success": false,
            "version": "1.0.0",
            statusText: "Missing credentials",
            statusCode: "MISSING_AUTH_CREDENTIALS"
        })
    }
})

router.get('/authorize', function(req, res) {
    res.render('demo/authorize', {
        statusText: "Enter your credentials",
        statusCode: "AUTH_CREDENTIALS_ASKED"
    })
})

router.get('/protected/api', DemoAuthService.isAuthenticated, function(req, res) {
    res.send({ success: true, version: '1.0.0' })
})

router.get('/protected/api/bearer', DemoAuthService.isAuthenticated, function(req, res) {
    res.set('Cache-Control', 'no-store')
    res.set('Pragma', 'no-cache')
    res.send({
        confidentialDocs: ['ww2report.doc', 'covid19report.doc'],
        success: true,
        version: '1.0.0'
    })
})

router.get('/protected/web-cookies', DemoAuthService.isAuthenticated, function(req, res) {
    res.send({
        confidentialDocs: ['ww2report.doc', 'covid19report.doc'],
        success: true,
        version: '1.0.0'
    })
})

router.get('/user', DemoAuthService.isAuthenticated, function(req, res) {
    if (req.wantsJson) {
        return res.send(
            `<pre>
            { 
                success: true, 
                user: ${JSON.stringify(req.user)}
            }</pre>
            <a href="/demo/logout">Logout</a>
            `)
    }
    return res.send({ success: true, user: req.user })
})

router.get('/logout', [], function(req, res) {
    // Delete the token at client side
    res.clearCookie('access_token');
    return res.redirect('back');
})


module.exports = router;