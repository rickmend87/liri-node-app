// NPMZZZZZZ
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

// My Scripts(Should take my profile from "keys"?)
var keys = require('./keys.js');

var app = {
    "my-tweets": function() {
        var client = new Twitter(keys);
        client.get('statuses/user_timeline', function(error, tweetTweet, response) {
            if (!error) {
                console.log(' ');
                console.log('My Tweets');
                tweetTweet.forEach(function(obj) {
                    console.log('Time: ' + obj.created_at);
                    console.log('Tweet: ' + obj.text);
                    console.log(' ');
                });
                console.log(' ');
                // console.log(tweets);
                app.logData(tweetTweet);
            } else {
                console.log(error);
            }
        });
    },
    "spotify-this-song": function(keyword) {
        spotify.search({ type: 'track', query: keyword || 'The Sign' }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            if (data.tracks > 0) {
                var record = data.tracks[0];
                console.log(' ');
                console.log('Artist: ' + record.artists[0].name);
                console.log('Name: ' + record.name);
                console.log('Link: ' + record.preview_url);
                console.log('Album: ' + record.album.name);
                console.log(' ');
                app.logData(data);
            } else {
                console.log('No song data found.');
            }
        });
    },
    "movie-this": function(query) {
        request('http://www.omdbapi.com/?t=' + (query || 'Mr.Nobody') + '&tomatoes=true', function(error, response, info) {
            if (!error && response.statusCode == 200) {

                var movieData = JSON.parse(info);
                console.log(' ');
                console.log('Title: ' + movieData.Title);
                console.log('Year: ' + movieData.Year);
                console.log('IMDB Rating: ' + movieData.imdbRating);
                console.log('Country: ' + movieData.Country);
                console.log('Language: ' + movieData.Language);
                console.log('Plot: ' + movieData.Plot);
                console.log('Actors: ' + movieData.Actors);
                console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
                console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
                console.log(' ');
                app.logData(movieData);
            }
        });
    },
    "do-what-it-says": function() {
        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;
            console.log(data.toString());
        });
    },
    logData: function(data) {
        fs.appendFile('log.txt', JSON.stringify(data, null, 2) + '', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
};

// im going to take the "L" on this one.
// I could not get any of the node commands to work
// Ran out of time and just tried to psuedo code what i could.