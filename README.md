# Study Tracker App

The goal of this app is to create a study tracker which enables the user to view how much
study they have completed over a period of time. I wanted to build this app because I have
been keeping track of my study through an excel spreadsheet, so I thought something which was
more interactive and easier to complete could have a better user experience. I am also
interested in exploring dynamic dashboarding so I thought this was a good way to incorporate
this skill into a project.

## Server Side

Initially the server side will be relatively simple. It will consist of http requests to post or
retrieve information from a database. The database will consist of study units, with each row
containing a date, study type (e.g. assignment, lecture etc.), subject and study unit

### Server Side ToDos

- Construct the SQL Database and SQL Queries needed to perform filters ✓
- Add the API requests to the server
    - GET /study ✓
    - GET /study/subject ✓
    - GET /study/type ✓
    - POST /study ✓
    - POST /study/duplicate/:id ✓
    - PUT/PATCH /study/:id ✓
    - PATCH /study/completed/:id ✓
    - DELETE /study:/id ✓
- Backend testing ✓
- Error Handling

## Client Side

Initially, the client side will contain 3 elements. The first will be a way for the user to add
a new study unit. The second will be for the user to edit or delete completed study units. The third
will be an interactive dashboard so that the user can see how much study they have completed.

### Dashboard Component

The dashboard will have a few different visualisations:

- Line chart: a breakdown of how many units of study the user has completed each week
- Pie Chart: percentage of study (by type and by subject)
- Stacked Chart: combining these two ideas

### Client Side ToDos

- Add titles and axis labels to graphs ✓
- Create a custom hook for updating the dashboard
    - useAsync ✓
    - useFetch ✓
    - useAxios and useAxiosMultiple ✓
    - useUpdateDashboard ✓
- Change position of elements on dashboard without causing data to re-render ✓
- Add in a date picker section ✓
- Connect Date Picker to updating dashboard ✓
- Style out the dashboard page
    - Remove labels when graphs are small
    - Navbar and Footer Components

#### Study Log Component

- Create a ToDo component ✓
    - Edit Layout ✓
    - Normal Layout ✓
    - Find complete and delete icons ✓
- Allow user to select different type and subject of study ✓
    - Ideally they should be able to do this on the ToDo card as they are adding/editing it (e.g. with dropdowns) ✓
- Allow the ability for users to update a non-completed to-do component ✓
    - Frontend ✓
    - Backend integration ✓
- Allow for users to delete a non-complete to-do component ✓
    - Frontend ✓
    - Backend Integration ✓
- Have a icon/button where a user can create a new ToDo on the same page ✓
    - Frontend ✓
    - Backend Integration ✓
- Create a page to display the todos ✓
    - Order based on most recent ✓
    - Also have a recently completed section ✓
- Allow users to mark a todo as completed ✓
    - Frontend ✓
    - Backend Integration ✓
- Allow users to copy outstanding or recently completed ToDos ✓
    - Frontend ✓
    - Backend Integration ✓
- Restyle the ToDos
    - Non-complete non-edit ✓
    - Non-complete edit ✓
    - Complete ✓
    - Reintegrate and Retest todo functionality ✓
- Refactor todo function code into a useReducer hook ✓
- Add a Navbar and a footer ✓
- Restyle ToDo page
    - Make ToDos the same height ✓
    - Make display grid rather than using bootstrap columns ✓
    - Keep track of the number of todos outstanding and display on the page
    - Improve layout for smaller screens ✓
    - Look at other ways of making card content uniform ✓
- Routing for the ToDo and the Dashboard Page
- Create a form where users can add new study types and subjects