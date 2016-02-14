module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://127.0.0.1:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'KmdMPFlEP44LyMu20UxH4O6ku',
        'consumerSecret'    : '2BqgnYKKU6muJ7ZjwqxfgT2Xc5AdQWPum3GV7icDXRqtwYs21Q',
        'callbackURL'       : '/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
