assuming you have node.js installed on your computer, here are the steps to get this utility to work:

1. clone/download and unzip this project to a location on your computer where you have read/write access 
2. visit your account edit page and retrieve your API access token from the bottom
3. create a file in the `src` directory called `token.js`. for its contents, copy & paste the following:
```javascript
const token = "<your API token here>";

module.exports = token;
```
4. use terminal, git bash, or something similar to navigate to the `student-emails` folder.
5. execute `node src/app.js`.
6. in the newly created `output` folder, your list of student emails should appear in a new timestamped file. 
7. profit?