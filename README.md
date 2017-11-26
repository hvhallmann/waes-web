# waes-web
Created to show my coding skills


## START
Install the app with:
**npm install**
This app should be initialized with

**npm start**

you can see if everything works on **http://localhost:3000/**
and to debug with

``DEBUG=myapp:* npm start``

## TEST
to test this app, run:

**npm test**  

unit test and integration test are together

### USAGE

if you already have the right file to test you can skip step 1
1. Sent a JSON object to v1/diff/{CHOOSE_ONE_NAME}/create
2. POST an JSON base64 encoded binary to v1/diff/NAME/left;
3. POST an JSON base64 encoded binary to v1/diff/NAME/right;
4. Check the result on v1/diff/NAME

your two files will be analysed after that and an response in JSON format will be sent back


### Suggestions for improvement

- Include an database instead of using files to parse files.
- identify the format of the file the user is sending
- improve error handling
- from the test specification, it will be better if there is an file to work with
since the beginning, like an example. 
