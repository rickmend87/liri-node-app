// API's
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// script
var keys = require("./keys.js")

var app = {
        "my-tweets": function() {
            var client = new Twitter(keys);
            client.get('statuses/user_timeline', function(error, tweetData, response) {
                if (!error) {
                    console.log(' ');
                    console.log('My Tweets');
                    tweetData.forEach(function(obj) {
                        console.log('Time: ' + obj.created_at);
                        console.log('Tweet: ' + obj.text);
                        console.log(' ');
                    });
                    console.log(' ');
                    // console.log(tweets);

                    app.logData(tweetData);
                } else {
                    console.log(error);
                }
            });
        },
        "spotify-this-song": function(keyword) {
                spotify.search({ type: 'track', query: keyword || 'The Sign Ace of Base' }, function(err, data) {
                            if (err) {
                                console.log('Error occurred: ' + err);
                                return;
                            }