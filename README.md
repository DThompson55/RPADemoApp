# RPADemoApp
A small nodejs app you can use to demo RPA
 - Main Screen has a web form that can be populated from a supplied csv file
 - Table Page has the same csv data in an HTML table format you can harvest using RPA
 - Image Recognition page randomly places an X on a 12x16 grid and asks you to find it
 - Login Page presents a fake login form that doesn't do any actual authentication, but which you can use to demo the cred vault.

By default it runs on port 6006, so just start it:
 - node app.js

Then open a browser to localhost:6006

If that doesn't work 
 - cd to the folder you installed this into
 - run npm install to pull down all the dependencies
 - if that didn't work make sure you have node and npm installed
 - try again
 
Command Line Args
 - -h reminds you of the optional port and uspscred params
 - -p #### sets the port number to something other than 6006
 - -u #### lets you set a usps credential, and will enable the usps zipcode verifier.
 - -v doesn't tell you much

## USPS Verify
There is as USPS Zipcode Verifier built into the app. It is currently disabled unless you use the -u option and provide usps credentials. This will cause an alert box to popup if zips don't match. So you can build a demo around that with RPA if you like. Details at [https://www.usps.com/business/web-tools-apis/welcome.htm](https://www.usps.com/business/web-tools-apis/welcome.htm)

## AA Scripts 
AA scripts are provided, you just have to import them into your RPA system

## Easter Eggs
On the main page, after each submit, a counter will increment indicating success. If the submitted customer number is 549 the success message will be replaced with a message that says it found a duplicate record. There's not really a duplicate record, and it's not really uploading anything. The point is you can use this, if you want or you're clever, to show alternative processing, perhaps launching a BPM task to handle the exception. Maybe use image recognition.

## TO DO
 - I think I'm good for now

