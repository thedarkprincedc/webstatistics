To run this example we need to run it on a web server.
I use lite-server. It can be downloaded using 

npm install lite-server -g

Also you will need to open chrome with web security disabled so we can by pass and cross origin request error in order to test the mock server.

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir ~/test

This is the link to test the mock server
http://localhost:3000/test/mockServer.html