(Developmental phase)
Job search management API using NodeJS, ExpressJS and MongoDB 
<br>

**Basic Setup till now**
1. Register<br>
   When the user is new to the system, they register. The name, email and password is acquired by the 
   api from req.body and is established to the database (where the password is hashed for protection). Then a token is generated.<br>
2. Login:<br>
   If the user has registered already then their email and password must be in the database. Therefore a validation is done for the email and password with respective Error handling. A token is generated when login is successful<br>
3. Authentication:<br>
   All the methods in jobs are protected. Which means only the user that provides a proper format token is allowed to access the routes. Therefore, a middleware is called every single time when user tries to access the job routes which validates the token sent from req.header.<br>
   # 2-step validation<br>
   -> Checks if the token has been provided while trying to access the routes and if it follows a proper format        ("Bearer token")<br>
   -> If the token is of a proper format then it further checks if the token matches with the one stored in the local memory <br>

## Features updated <br>
Whenever a user creates a job, his/her id is saved as createdBy attribute on that specific job. Now whenever any type of RUD request is provided by the user, first it is validates if the createdBy equals the id of the user that is trying to perform the operation. If only the condition is true, then the user can access, update or delete the task. In short, a user can only work with the tasks created by themsleves. <br>
<br>

## Error handling <br>
For every mongoose error the API just responds with a generic error of Internal Server Error whereas things like email duplication is termed as a Bad Request. Therefore properly returning error for the trial of registering with an unavaliable email address using the err object and it's code for error duplication.

<br>

*--Learning and implementing from John Smilga--*   