modularize the inputs using useField with formik
fix the error message background (doesnt look right)

make an api class instead of one function that handls get and post and the others in the same function (apparently GET REQUEST does not support content types header)
^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
| | | | | | | | | | | | | | | | | |
not sure abotu this, it seems to be accepting it now, recheck please.

currently fetching token on app load in useEffect in app.js in client, need to set it in the redux store and include it as a header in the api.js

add logout logic

test passport some more, test if the cookie extractor or the fromBearer token is being used

clean up whats being returned from the /users/token get endpoint

add admin and make so only admins can see users list

tasks page useEffect not always running, especially if the first link to ever be visited is /tasks , tho if u do /users then /tasks it works fine

in add task dialog, make the dialog div not occupy the space occupied by navbar, because right now it preventing user from using the navbar when the dialog is open (could set its height to screen- navbar height ) (can i make navbar height global ?)

always add currentUser to dependency of intial startup useEffect ? for an example when i logout now i will still see the list of loaded tasks
alternatively can just redirect on logout

add deadline and start date to tasks

change user logout nad info into expandable dropdown

in the Navbar (use mobile version, open the sidebar and expand the screen width, the sidebar will still be visible and the top bar as well
)



IMPORTANT: random lines keep appearing to recreate open the navbar side bar when screen is small