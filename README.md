# Employee Directory Using A Public API
This project uses the [random user API](https://randomuser.me/) to get data about 12 random people and then populate the DOM with their information.
I used the fetch API for the request and vanilla JS to handle the response and interact with the DOM.

## Special Thanks to Caleb Grove for his script on converting states to their proper abbreviations
* Link to his github [here](https://github.com/calebgrove)

## App Features
* Gets data about 12 random employees using the fetch API
* Each grid item is filled with data about one of the people(name, location, and picture)
* When a grid item is clicked, a modal appears with more detailed information about that employee
* Navigation icons (left and right arrows) allow you to cycle through the employees while staying in the modal window
* A friendly error message is shown if the promise from the request is not resolved

## Built With
* HTML
* CSS
* JavaScript

## Author
Frank Rosendorf