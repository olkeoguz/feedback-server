# Feedback Server App

## This is the backend project for the feedback-lib npm library to save and list the user feedbacks.

## [Live Demo](https://feedback-lib-server.herokuapp.com/?userkey=trendyol)

Change the userkey **with your client user key** to list the feedbacks.

## [Client Live Demo](https://stellar-taffy-46ea02.netlify.app/)

<br>

---

## In order to run this project in your local environment

 <br/>

```bash
git clone https://github.com/olkeoguz/feedback-server.git
```

And then

```bash
npm install | yarn
```

to install all the dependencies.

Finally,

```bash
npm start | yarn start
```

to start the development mode.

## Endpoints

/feedback --POST

- Takes the body object consisting of userkey and the actual content(feedback)
- Goes to db and tries to find the document with the user key

    1- If user key exists, adds the content to the feedbacks with that user key,

    2- If not, creates the user key and adds the content (feedback) to it

--- 
/feedback -- GET

* Takes the user key as query parameter
* Serves the index.html
* script.js runs and fetches the feedbacks from the same endpoint and creates the html table.




