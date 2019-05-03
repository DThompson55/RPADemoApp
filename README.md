# RPADemoApp
A small nodejs app you can use to demo RPA

It's hardcoded to run on port 6006, so just start it:
 - node app.js

Then open a browser to localhost:6006

If that doesn't work, then make sure you do an npm install command to pull down all the dependencies.

## USPS Verify
There is as USPS Zipcode Verifier built into the app, but it is currently disabled. You can turn it on by uncommenting the verify() method in index.html. This will cause an alert box to popup if zips don't match. So you can build a demo around that with RPA if you like.

## TO DO

I'd like to post the AA RPA scripts that excercise these screens when I find the time.
