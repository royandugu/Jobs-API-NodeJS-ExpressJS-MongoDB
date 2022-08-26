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



*--Learning and implementing from John Smilga--*   