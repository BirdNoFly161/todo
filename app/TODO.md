modularize the inputs using useField with formik
fix the error message background (doesnt look right)


make an api class instead of one function that handls get and post and the others in the same function (apparently GET REQUEST does not support content types header)
^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 
| | | | | | | | | | | | | | | | | | 
not sure abotu this, it seems to be accepting it now, recheck please.

currently fetching token on app load in useEffect in app.js in client, need to set it in the redux store and include it as a header in the api.js
