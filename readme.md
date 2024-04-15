[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/fzUTbcJf)
# Web Dev 2 - Mid Term - Weather App

**Welcome!**
This challenge will help you improve your coding skills by building realistic projects.

## The Challenge

Your challenge is to integrate with the [Open Weather API]() to pull weather data and display it. Your users should be able to:

-   Search for a city using an input field.

-   Save favorite cities by clicking on a star icon.

-   See the current weather info based on the selected city.

-   See forecast for the next 5 days.

-   See weather info for every 3 hours of each day.

-   Have a good experience using desktop or mobile screen sizes.

**Wireframe**
The wireframe can be accessed with this [link](https://whimsical.com/5KrvqouiFGBcgW7RtQQMLV). You will need to use your best judgment for styles such as font size, font family, padding, margin, color pattern, etc. and decide how you want to display the information on the screen.

## Requirements

These are the requirements that are mandatory for this project:

-   Follow wireframe to create the structure of your page for desktop and mobile. It is up to you how to design, include images and icons in the project.

-   Search input should use Google Places Autocomplete for suggesting cities only.

-   The default city should be based on users’ location. In case the user blocks the location info, Vancouver
    should be the default.

-   When the user clicks on the star icon, the city should be included on the dropdown for “Favorite cities”.

-   Favorite cities should be stored in localStorage. After the page loads, check if there is something saved there. If yes, append city options in the dropdown.

-   When the user clicks on one of the options for dropdown, the weather info for the selected city should be loaded on the page.

-   Create Fetch API calls to get the current weather and forecast for the next 5 days.

-   When the user clicks on one of the cards in the “Daily forecast” section, the “3 hour range” section should change the data based on the day clicked.

-   SCSS files should be used for styling files.

-   Media queries should be used for responsive behaviors in the page.

    -   Desktop size: 1440px

    -   Mobile: 375px

-   Slides for your presentation are required.

## Workflow

Initially the font family, color pattern, and relative unit should be set and included in the SCSS file.
It is recommended to follow the division below:

-   If 3 members:

    -   Member 1: Search input + Favorite cities dropdown + Current weather (most confident with JS)

    -   Member 2: Forecast 5 days

    -   Member 3: 3 hour range

-   If 2 members:

    -   Member 1: Search input + Favorite cities dropdown + Current weather (most confident with JS)

    -   Member 2: Forecast 5 days + 3 hour range

-   Focus on the functionalities first. After all the features are implemented, work on styling for the mobile version first. Leave responsiveness as the last task. Remember to use media queries and only make necessary changes to CSS properties. No need to redo the whole design. Use the requirements on the section above as a checklist. Make sure you completed all the tasks.

-   After the project is completed, create a presentation to show your classmates what you have done, how you split the work, what you learned in the process and what was the most difficult part of the project for you.

## Git Control (highly recommended to follow)

## Hints

Here are a few tips that can help you avoid some issues during the development of the project:

-   Before starting coding, meet with your team and set naming patterns for HTML/CSS content and JavaScript functions to avoid conflicts during merge.

-   Divide your code into multiple JavaScript and SCSS files, one for each section of the page and one for functions that could be used in different files. For example, API calls should be called in the main file and the data can be exported to other files (the forecast data will be used in “Daily forecast” and “3 hour range” sections).

-   A lot of DOM manipulation will be needed in this project, so review how to use event listeners and how to create/modify/delete content of the page using JavaScript.

-   Don’t stay stuck for too long in one problem that you cannot solve. First, google it, then ask your teammate for help, then ask the instructor for help. Spend 1 hour max to solve the problem or ask for help.

## APIs

-   Current Weather: (https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key})

-   5 days Forecast: (https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key})

-   3hr Forecast: (https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key})

-   Google Places Autocomplete: (https://developers.google.com/maps/documentation/places/web-service/autocomplete)

## Deploy and Submission

-   Every member of the group should deploy your work on your own GitHub Pages.
