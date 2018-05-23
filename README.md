To run this example we need to run it on a web server.
I use lite-server. It can be downloaded using 

#npm install lite-server -g
#lite-server

Run from npm, still needs lite-server installed
#npm run start

Also you will need to open chrome with web security disabled or run a proxy like squid proxy/apache reverse proxy to bypass any cross origin request restrictions to test the mock server.

#/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir ~/test

This is the link to test the mock server
#http://localhost:3000/test/mockServer.html