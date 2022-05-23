/**
 * @file Routes for informative lessons. They're usually static pages.
 */

var express = require("express");
var router = express.Router();

/**
 * Get home page
 */

router.get('/jwt-in-web-cookies', function(req, res) {
    res.render('lesson/jwtCookies', {
            CODE_REPOSITORY: CODE_REPOSITORY, 
            NEW_ISSUE_URL: NEW_ISSUE_URL
    })
})

router.get('/token-transmit-method-comparison', [], function(req, res) {
    res.render('lesson/transitMethodComparison', {
        CODE_REPOSITORY: CODE_REPOSITORY, 
        NEW_ISSUE_URL: NEW_ISSUE_URL
    })
})

router.get('/implementing-logout', [], function(req, res) {
    res.render('lesson/implementingLogut', {
        CODE_REPOSITORY: CODE_REPOSITORY, 
        NEW_ISSUE_URL: NEW_ISSUE_URL
    })
})


router.get('/finish', [], function(req, res) {
    res.render('lesson/finish', {
        CODE_REPOSITORY: CODE_REPOSITORY, 
        NEW_ISSUE_URL: NEW_ISSUE_URL
    })
})

module.exports = router;