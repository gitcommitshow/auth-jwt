var express = require("express");
var router = express.Router();

/**
 * Get home page
 */
router.get('/', function(req, res) {
    res.render('home', { CODE_REPOSITORY: CODE_REPOSITORY, NEW_ISSUE_URL: NEW_ISSUE_URL })
})

module.exports = router;