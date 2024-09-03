# Project Info
This is a sveltekit web application, with a server written in Go and Python microservices.

This was given to me by [VigilantIoE](https://bitbucket.org/vigilantioe/practical-app/src/master/) as an assessment to complete.

Below are the objectives given, and the status of each one. There were a few technical issues code wise, and I have fixed all that I had seen that were relative to given objectives.

As a quick aside, I did have a bit of an issue understanding the API values, with some returning 0 (host being up given the unit test), some returning greater than 1, (which I can only assume meaning offline given the information, but an API spec would help clear this information), and others returnning null values. Null may mean unknown, which in that case I would need to add another label / dataset to each chart. 

All timestamps are recorded onto the line chart, left out timestamps but if more time was allotted I would have most certainly added annotations to the chart for each individual plot.

## Objectives

[X] Add a few visualizations of the data returned from the API.
  * Completed, Done this with the pie chart and line chart that was provided using ChartJS. Pie chart & Line chart, with zooming in and out capabilities on the line chart. Could add a bar graph but given it's two data points ultimately (down or up) this would suffice. If we were adding other tracking endpoints (CPU, GPU, etc) then we could have other data points on the charts and other charts.



[X] Utilize the "microservices" directory to assist with some data visualizations. We've included tests for one such visualization, a simple panel that displays, based on the data provided, if the host is "UP" or "DOWN". Please make all of these pass, and feel free to add new ones for any others you want to add. 
  * Up or Down is now working given the datasets and tests. Would have liked to add tests for other visualizations, alongside the actual data provided from the host. One thing is that the host endpoint given does provide null values, so will need to ask if my inferring of that meaning the host is down is correct or not.



[x] Add the ability to resize the charts, and have the new size persist when the page is refreshed. 
  * Resizing works, _state does not unfortunately_ so this is a partial completion given time constraints.



[X] Create a treeview component with host we provided, and add a few made-up hosts that would return a similar dashboard (but keep in mind our API only returns data for the one host) 
  * Did this just underneath the current reports dashboard, but could easily transfer to a component and make it on a separate page instead.



[X] Please add your own eye and style this page as you'd like! 
  * Completed, had some fun with this project but I do feel it is rather basic.



# Utilization / Requirements
- NodeJS / NPM required (using LTS currently, v18+ required).
- Go required for backend / API
- Python required if unit tests are being ran.

  To run this application, you will first need to install the requirements listed above.

  I have tested this app in Windows, utilizing WSL, and have not used in Linux strictly as of yet but there should be close to no issues.

  After ensuring requirements are installed, all that is required is to run npm install && npm run dev which will then start the web application. Next, you will need to run the go backend, by simply running `go run .\server\main.go`. You can run these both within screens to monitor, or separate terminals if you desire. Access is at `localhost:5173` by default.

  # Unit Test(s)
  **Disclaimer** -- This unit test script was ran on a Windows machine, so some changes were needed. This may not work on a Linux machine, I will attempt to test this out beforehand. **Update** -- this now works on linux machines.

  Unit tests are ran with Vitest, utilizing a Python microservice to visualize and interperet data. Python is required as stated above.

  To run the unit tests, make sure you are in the root directory of the project and then simply run `npm run test`
