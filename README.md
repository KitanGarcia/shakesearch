# ShakeSearch

This is a quick and dirty submission for Pulley's ShakeSearch challenge. Check out the live version of this repo at https://shakesearch-improvements.onrender.com/. Due to being tied up with other take home projects, I did this as fast as I could, only modifying the original files. This means that there is no React, TypeScript, or any other frameworks, just Go, vanilla JavaScript, HTML, and CSS, as there was originally.

### Instructions

To start the server, run `go run main.go` at the project root. Once the server is running, simply navigate to http://localhost:3001/ in the browser to access the web app.

## Improvements

- Large title with name of app
- More clear label on text box helping instruct user what to enter input box
- User feedback when focusing on input or hovering over search button
- Loading animation so user knows that their input was received and results will be shown soon
- Highlights search matches so user can easily spot occurrences of what they searched
- Text insensitive search
- Styled table and table headers for a more user-friendly view
- Add result numbers to table so users can see how many passages contained occurrences of their query
- Fix out of bounds error so there are no more serverside errors
- Fixed navbar and better styling so user can always search no matter where they are in the page

## Additional Changes to Make Given More Time

- On the server, handle matches better to only match exact occurrences of the query. For example, if I enter "sides," results with "besides" will be sent to the client. The client is currently the one that cleans this up and the user can't really tell, but it would be much better to take care of this on the server!
- Implement pagination or infinite scrolling and load data in chunks to reduce load time
- Implement caching
- Include title of work in which the query was found
- Include line number of search in which the query was found
- Include number of occurrences of query match in each passage of text
- Include a modal for the user to expand the table entry which would allow them to see the true format of the result (ie. including line breaks and other formatting)
- Add tests
- List total number of results
- Add options to sort or filter results
- Use React and Tailwind
- Give user the option to search a specific work
- Allow user to search in a case-sensitive manner
- Improve overall UI/UX/design
