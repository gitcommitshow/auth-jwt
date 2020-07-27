//Alternative express wrapper by runkit : @runkit/runkit/express-endpoint/1.0.0
const express = require('express')
const jwt = require('jsonwebtoken')

const fs = require('fs')
var cookieParser = require('cookie-parser')

const PORT = 3000


// ---JWT signing and verification options starts-----
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

//Whitelist only 1 algo if you can so attacker cannot fool by changing alg and create new signature with new alg
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

// Genrate public and private key pair programmetically
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

function updateSecretMethod(algorithm, isSigningRequest) {
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

var app = express(module.exports)
app.disable('x-powered-by');

// support parsing of application/json type post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})


//Homepage to get started
app.get('', function(req, res) {
    res.send(`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
        <h1>JWT Authentication Demo</h1>
        <br/><br/>
        This is a tutorial with live demo to show how jwt authentication can be implemented using node.js, express, jsonwebtoken. 
        <br/>We'll start with examples and then reverse engineer by deconstructing each part.
        <br/><br/>
        <a href="/jwt">Next: Create JWT token</a>
        <br/><br/><br/><br/><br/><br/>
        <small style="opacity:0.8;">Credits: Serving this page via <a target="_blank" href="https://runkit.com/invider/jwt-authentication-demo">Runkit</a></small>
        `)
})


//Endpoint to get a simple token signed with a secret
app.get('/jwt', function(req, res) {
    updateSecretMethod(signOptions.algorithm, true);
    console.log(JSON.stringify(signOptions));
    var token = jwt.sign({ data: "I secretly like Momina Mustehan" }, secret, signOptions)
    res.send(`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
            <h2>✓ Generated a new token signed with secret!</h2>
            <div>
            <div style="display:inline; margin: 4px;">
            <span style="color:red;">${token.split(".")[0]}</span><span style="font-weight:bold;font-size:120%;">.</span><span style="color:blue;">${token.split(".")[1]}</span><span style="font-weight:bold;font-size:120%;">.</span><span style="color:green;">${token.split(".")[2]}</span>
            </div></div>
            <br/><br/>
            <h3>Token schema</h3>
            <p>Did you notice 3 dots(.) in the token? Dots (.) separate 3 important parts of the token</p>
            
            <b><code>{<span style="color:red;">header</span>}.{<span style="color:blue;">payload</span>}.{<span style="color:green;">signature</span>}</code></b><br/>
            <ul>
                <li>Header : Metadata about the cryptography methods e.g. Algorithm, Token type. Encoded with base64UrlEncode, visible to anyone who has access to token.</li>
                <li>Payload: Actual data we want to exchange e.g. userId.  Encoded with base64UrlEncode, visible to anyone who has access to token.</li>
                <li>Signature: To verify sender or ensure message integrity. Can be verified by anyone if they know secret/publicKey, but can't be changed.</li>
            </ul>

            
            <a target="_blank" href="https://jwt.io/introduction/">Read more..</a><br/>
            
            <br/><br/>
            <a href="/verify/${token}">Next: Verify JWT.</a><br/>
            `);
})

//Endpoint to verify a token
app.get('/verify/:token', function(req, res) {
    var token = req.params.token;
    updateSecretMethod(signOptions.algorithm, false);
    console.log(JSON.stringify(verifyOptions));
    jwt.verify(token.toString(), secret, verifyOptions, function(err, decoded) {
        if (decoded) {
            res.send(`
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
                <h2>✓ Verified and payload decoded successfully!</h2>
                <code>${JSON.stringify(decoded)}</code>
                <br/><br/>
                <a href="/jwt/custom">Next: Create a more complex token</a> to address real world scenerios
                <br/><br/><br/><br/>
                <a href="/">Go Home</a><br/>
            `);
        } else {
            res.send(`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
            <b>Verification Failed!</b><br/><code>${JSON.stringify(err)}</code>
            <a href="/">Go Home</a><br/>
            `)
        }
    })
})

//Page to create a custom token
app.get('/jwt/custom', function(req, res) {
    res.send(`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
            <h2>Customize JWT Creation</h2>
            <br/><br/>
            <form method="post" action="/jwt/custom">
                <label for="alg">Algorithm</label>
                <select name="alg" placeholder="Algorithm" onchange="algoChanged(this)">
                    <option selected="true">HS256</option>
                    <option>RS256</option>
                    <option>ES256</option>
                </select><br/>
                <small id="errorMessage" style="color:red;"></small>
                <script>
                function algoChanged(elem){
                    if(elem.value=="ES256"){
                        document.getElementById('errorMessage').style.visibility='visible';
                        document.getElementById('errorMessage').innerHTML = 'WARNING: This algorithm has not been implemented yet<br/><br/>';
                    } else {
                        document.getElementById('errorMessage').style.visibility='hidden';
                    }
                }</script>
                > <a href="https://tools.ietf.org/html/rfc7518#section-3" target="_blank" style="opacity:0.7;">Read about recommended algorithms</a>
                <br/><br/>
                <label for="payload">Data (Payload)</label><br/>
                <textarea type="text" name="payload" placeholder="Data" rows="4" style="min-width:40%;">{ "data": "I secretly love Momina Mustehan" }</textarea>
                <br/>
                <span style="font-size:80%;background-color:#333333;color:#fff;padding:4px;opacity:0.8;">Note: Payload needs to be a valid json(1. JSON string keys must have double quotes "" 2. No functions allowed in value)</span>
                <br/><br/>
                <input type="submit" value="Generate New Token">
            </form>
            <br/><br/>
            <a href="/">Go Home</a><br/>
            `);
})


//Endpoint to create custom token with given parameters
app.post('/jwt/custom', function(req, res) {
    console.log(JSON.stringify(req.body))
    var algorithm = req.body.alg;
    var payload = req.body.payload;
    if (typeof payload === 'string') {
        try {
            payload = JSON.parse(payload);
        } catch (e) {
            if (e) console.log('Invalid json string' + payload + "\n. Error:" + e)
        }
    }
    if (algorithm) signOptions['algorithm'] = algorithm;
    updateSecretMethod(signOptions.algorithm, true);
    console.log(JSON.stringify(signOptions));
    var token = jwt.sign(payload, secret, signOptions);
    res.set('Cache-Control', 'no-store')
    res.set('Pragma', 'no-cache')
    res.send(`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
            <h2>✓ Generated a new token</h2>
            ${token}
            <br/><br/>
            <b>For following options</b><br/>
            <ul>
            <li>Header : { "alg":"${algorithm}", "typ":"JWT" }</li>
            <li>Payload: ${JSON.stringify(payload)}</li>
            <li>Secret: A secret only server knows</li>
            </ul>
            > <a href="https://tools.ietf.org/html/rfc7520#section-4.1.2" target="_blank" style="opacity:0.7;">Read about the signing operation</a>            
            <br/><br/>
            <a target="_blank" href="/verify/${token}">Server can verify this token</a> 
            with secret key(for HMAC algorithm) or the public key(for RSA algorithm)<br/>
            <br/><br/>
            <h3>Let's put the token to some use now</h3>
            <a href="/protected?access_token=${token}" style="opacity:0.7;">Next: Access resource protected with this token</a>
            <br/><br/><br/><br/>
            <a href="/jwt/custom" style="opacity:0.7;">Create a new token with different algorithm</a><br/><br/>
            <a href="/">Go Home</a><br/>
            `);
})


app.get('/protected', isAuthenticated, function(req, res) {
    res.send(`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
            <h2>✓ You've been successfully authenticated!</h2>
            <p style="width:70%;"><br/><br/>
                In this request, we sent token via request URI parameter<br/>
                GET /protected-endpoint?<b>access_token</b>=mF_9.B5f-4.1JqM HTTP/1.1<br/><br/>
                > <a href="https://tools.ietf.org/html/rfc6750#section-2.3" target="_blank">Read about standards to follow while sending token via URI Query Parameter</a><br/><br/>
                Let's learn about more secure ways to send the token to the authorization server.<br/>
            </p>
            <form method="POST" action="/protected/web-form" enctype="application\/x-www-form-urlencoded"><input name="access_token" type="hidden" value="${req.query.access_token}" /><input type="submit" value="Click to send token in form body"></input></form>
            <p> 
                > Input Parameter Name: access_token<br/>
                > Content-Type: application/x-www-form-urlencoded<br/>
                > <a href="https://tools.ietf.org/html/rfc6750#section-2.2" target="_blank">Read about standards to send token via form-encoded body parameters</a>
            </p>
            <br/><br/>
            `)
})

app.post('/protected/web-form', isAuthenticated, function(req, res) {
    console.log(req.get('Content-Type'))
    res.send(`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
            <h2>✓ You've been successfully authenticated!</h2>
            <p style="width:70%;"><br/><br/>
                In this request, we sent the token in the form body<br/>
                > <a href="https://tools.ietf.org/html/rfc6750#section-2.2" target="_blank">Read about standards to send token via form-encoded body parameters</a><br/><br/>
                There are other ways to send token to authorization server as well. 
                Next, lets's explore
            </p>
            <a id="apiReqBtn" href="#!" onclick="javasctipt:requestProtectedAPI()">Sending token in request header</a>
            <small id="apiReqResponse" style="font-weight:bold;background-color:grey;color:#ffffff;margin-left:16px;"></small><br/><br/>
            <script>function requestProtectedAPI(){
                console.log("Going to request API")
                var oReq = new XMLHttpRequest();
                oReq.open("GET", "/protected/api/bearer");
                oReq.setRequestHeader("Content-Type", "application\/json");
                oReq.setRequestHeader("Authorization", "Bearer ${req.body.access_token}");
                oReq.addEventListener("load", function(){
                    document.getElementById('apiReqBtn').style.opacity = 0.4;
                    document.getElementById('apiReqResponse').innerText = "✓ HTTP Status: "+this.status;
                    document.getElementById('apiReqResponse').style.padding = "4px";
                    document.getElementById('apiReqResponse').style['background-color'] = this.status=="200" ?  "green" : "red";
                    document.getElementById('responseText').innerHTML = this.getAllResponseHeaders()+'<br/>'+JSON.stringify(JSON.parse(this.responseText), null, 4)
                });
                oReq.send()
            }</script>
            <div style="opacity:0.7;">
            <pre id="responseText">
            <b>Sample Response</b>
            HTTP/1.1 200 OK
            Content-Type: application/json;charset=UTF-8
            Cache-Control: no-store
            Pragma: no-cache

            {
            "access_token":"mF_9.B5f-4.1JqM",
            "token_type":"Bearer",
            "expires_in":3600,
            "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
            }<br/>
            </pre>
            </div>
            <br/>
            <small style="opacity:0.6;"><a target="_blank" href="https://tools.ietf.org/html/rfc6750#section-3.1">Error Codes</a> : invalid_request(400-Bad request) | invalid_token(401-Unauthorized) | insufficient_scope(403-Forbidden)</small>
            <br/><br/>
            > <a href="https://tools.ietf.org/html/rfc6750#section-2.1" target="_blank" style="opacity:0.7;">Read about standards to send token via request headers</a>
            <br/><br/><br/><br/>
            <b>And there are more ways to send token to authorization server</b><br/>
            <a href="/tutorial/jwt-in-web-cookies" style="opacity:0.7;">Sending token in cookies</a><br/><br/>

            <b>So, which method is the best to send tokens to authorization server?</b><br/>
            For APIs, the recommended approach is to send token in authorization header as per Oauth RFC (Bearer Token).<br/>
            For web, it's debatable how to send and store the token, considering the possible attacs such as XSS and CSRF vs performance.<br/>
            <br/>
            <b>So now, we can generate token, we can send it to server to access the protected resource, verify if the token is valid.<br/> But how do we implement logout?</b><br/>
            <a href="/protected/web-refresh" style="opacity:0.7;">Invalidating tokens</a><br/><br/>
            `)
})

app.get('/tutorial/jwt-in-web-cookies', function(req, res) {
    res.send(`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
    <h2>Tutorial : Authentication workflow for web using cookies as token store</h2>
    <a href="#!" onclick="openSignInWindow('/authorize','login')">1. Login to get the token</a>
    <script>
        let windowObjectReference = null;
        let previousUrl = null;
        const BASE_URL = 'http://localhost:3000'
        const openSignInWindow = function(url, name) {
            // Opens a new popup window and registers a message listner to get data from the popup window to this window
            window.removeEventListener('message', receiveMessage);
            const strWindowFeatures =
                'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
            if (windowObjectReference === null || windowObjectReference.closed) {
                windowObjectReference = window.open(url, name, strWindowFeatures);
            } else if (previousUrl !== url) {
                windowObjectReference = window.open(url, name, strWindowFeatures);
                windowObjectReference.focus();
            } else {
                windowObjectReference.focus();
            }
            window.addEventListener('message', event => receiveMessage(event), false);
            // assign the previous URL
            previousUrl = url;
        };

        const receiveMessage = function(event) {
            console.log("Origin: "+event.origin+", Source: "+event.source+", Data: ", event.data)
            if (event.origin !== BASE_URL) {
                return;
            }
            const { data } = event;
            if (data) {
                //ToDo: Check data source is correct or not
                document.getElementById('responseText').innerHTML = JSON.stringify(data, null, 4);
                // const { payload } = data;
                // const redirectUrl = '/noredirect';
                // window.location.pathname = redirectUrl;
            } else {
                document.getElementById('responseText').innerHTML = "<span style='color:red;'>Login unsuccessful!<br/>Use these credentials instead -> username : user and password:pass</span>"
            }
        };

        // Create a postMessage from the popup window
    </script>
    <div style="opacity:0.7;">
    <pre id="responseText">
    </pre>
    </div>
    <a id="apiReqBtn" href="#!" onclick="javasctipt:requestProtectedAPI()">2. Get protected user data</a>
    <small id="apiReqResponse" style="font-weight:bold;background-color:grey;color:#ffffff;margin-left:16px;"></small>
    <script>
    function requestProtectedAPI(){
        console.log("Going to request API")
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "/protected/web-cookies");
        oReq.withCredentials = true;//To send cookies with the request
        oReq.setRequestHeader("Content-Type", "application\/json");
        oReq.addEventListener("load", function(){
            document.getElementById('apiReqBtn').style.opacity = 0.4;
            document.getElementById('apiReqResponse').innerText = "✓ HTTP Status: "+this.status;
            document.getElementById('apiReqResponse').style.padding = "4px";
            document.getElementById('apiReqResponse').style['background-color'] = this.status=="200" ?  "green" : "red";
            document.getElementById('responseText2').innerHTML = this.getAllResponseHeaders()+'<br/>'+JSON.stringify(JSON.parse(this.responseText), null, 4)
        });
        oReq.send()
    }</script>
    <div style="opacity:0.7;">
    <pre id="responseText2">
    </pre>
    </div>
    3. <a href="/user" style="opacity:0.7;">User data link accessible via token in authorization header with fall back to cookies</a>
    <br/><br/>
    4. <a href="/logout">Logout</a>
    <br/><br/><br/><br/>
    <a href="https://tools.ietf.org/html/rfc6265" target="_blank" style="opacity:0.7;">Read about securely storing cookies</a>
    <br/><br/><br/><br/>
    
    <a href="/jwt/custom" style="opacity:0.7;">Go Home</a><br/><br/>
    `)
})

app.get('/authorize', function(req, res) {
    res.send(`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css">
        <h2>Sign in</h2>
        <form id="login-form" action="/oauth/token" method="POST">
            <input value="user" name="username" type="text" placeholder="Username e.g. user"> <br/>
            <input value="pass" name="password" type="password" placeholder="Password e.g. pass"> <br/>
            <input type="submit" value="Login"> <br/><br/>
        </form>
        <script>
        // Cross-origin communication about the login info
        function broadcastLoginResponse(data){
            console.log('The data:', data)
            if (window.opener) {
                window.opener.postMessage(data);
                window.close();
            }
        }
        </script>
        <script>
        // Submit the form
        window.addEventListener("load", function () {
            

            const form = document.getElementById("login-form");
          
            form.addEventListener("submit", function (event) {
              event.preventDefault();
              sendData();
            });

            function sendData() {
                console.log('Sending request via js')
                // const form = new FormData(document.getElementById('login-form'));
                fetch('/oauth/token', {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'x-api-key': 'APIPUBLICKEY'
                    },
                    credentials: 'same-origin'
                }).then(function(response){
                    // Check status
                    if(response.ok){
                        return Promise.resolve(response)
                    } else {
                        return Promise.reject(new Error(response.statusText))
                    }
                }).then(function(response){
                    // Parse response in JSON
                    return response.json() //returns a promise
                }).then(function(data){
                    console.log('data', data)
                    // alert(JSON.stringify(data))
                    broadcastLoginResponse(data)
                }).catch(function(error) {
                    console.log('Request failed', error);
                    broadcastLoginResponse(null)
                });
            }
           
          } );
        </script>
    `)
})

// Using multer to handle form data
const multer = require('multer');
const upload = multer();

// Get token
app.post('/oauth/token', upload.none(), function(req, res) {
    console.log('formData: ', req.body)
    var username = req.body.username;
    var password = req.body.password;
    if (username && password && username == 'user' && password == 'pass') {
        //Issue the token
        updateSecretMethod(signOptions.algorithm, true);
        console.log(JSON.stringify(signOptions));
        var token = jwt.sign({ user: username, lastLogin: new Date().getTime() }, secret, signOptions)
        res.cookie('access_token', token, {
            secure: false, // set to true if your using https
            httpOnly: true,
        });
        return res.send({
            "access_token": token,
            "token_type": "Bearer",
            "expires_in": "Do We Need To Send Expiration Date Separately",
            "refresh_token": "Not_Implemented"
        })
    } else {
        return res.status(401).send({
            "success": false,
            "version": "1.0.0"
        })
    }
})

app.get('/protected/api', isAuthenticated, function(req, res) {
    res.send({ success: true, version: '1.0.0' })
})

app.get('/protected/api/bearer', isAuthenticated, function(req, res) {
    res.set('Cache-Control', 'no-store')
    res.set('Pragma', 'no-cache')
    res.send({
        confidentialDocs: ['ww2report.doc', 'covid19report.doc'],
        success: true,
        version: '1.0.0'
    })
})

app.get('/protected/web-cookies', [isAuthenticated], function(req, res) {
    res.send({
        confidentialDocs: ['ww2report.doc', 'covid19report.doc'],
        success: true,
        version: '1.0.0'
    })
})

app.get('/user', [isAuthenticated], function(req, res) {
    if (!req.get('Content-Type') || req.get('Content-Type').indexOf('application/json') === -1) {
        return res.send(
            `<pre>
            { 
                success: true, 
                user: ${JSON.stringify(req.user)}
            }</pre>
            <a href="/logout">Logout</a>
            `)
    }
    return res.send({ success: true, user: req.user })
})

app.get('/logout', [], function(req, res) {
    // Delete the token at client side
    res.clearCookie('access_token');
    return res.redirect('back');
})

// Middleware for authentication using JWT paradigm
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
    if (tokenExchange.token) {
        updateSecretMethod(signOptions.algorithm, false);
        jwt.verify(tokenExchange.token, secret, verifyOptions, function(err, decoded) {
            if (err) {
                res.status(401).send(`
                        <b>Not Authenticated! </b><br/><code>${JSON.stringify(err)}</code>
                        <a href="/">Go Home</a><br/>
                        `)
            } else {
                //ToDo: Sanitize the decoded jwt content
                //ToDo: Set req.user object with fields such as id, name, etc.
                console.log(JSON.stringify(decoded.payload, null, 4))
                if (!req.user) {
                    req.user = {}
                }
                req.user.username = decoded.payload.user
                next()
            }
        })
    } else {
        res.status(400).send(`
        <h2>No token found</h2><br/><br/>
        <a href="/jwt/custom" style="opacity:0.7;">Create a new token</a><br/><br/>
        `)
    }
}

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

function setDefaultStrategy(req, tokenExchange) {
    // First check header - authorization
    if (req.get('Authorization')) {
        tokenExchange.setTokenReadStrategy(new ReadFromHeaderWithBearerScheme()).read(req);
    } else if (req && req.cookies && req.cookies.access_token) {
        tokenExchange.setTokenReadStrategy(new ReadFromCookies()).read(req);
    }
    // Second check cookie
}

// Resource: Recommended practices for authorization bearer token -> https://tools.ietf.org/html/rfc6750#section-1.1
var ReadFromUrlParam = function() {
    this.read = function(req) {
        if (req && req.query.access_token) {
            return req.query.access_token;
        }
        return null;
    }
}

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

var ReadFromCookies = function() {
    this.read = function(req) {
        if (req && req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }
}

var ReadFromHeader = function(req) {
    this.read = function(req) {
        if (req.get('Authorization')) {
            this.token = req.get('Authorization');
            return this.token;
        }
        return null;
    }
}

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