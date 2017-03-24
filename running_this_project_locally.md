## Running this project locally

1. Perform these steps to set up the database locally:

[database_setup / readme_local.md](database_setup/readme_local.md)


2. Perform these steps to run the applications on cloud.gov (it will set up some prerequisites):

[Running this project on cloud.gov](running_this_project_on_cloud.md)


3. Environment setup (for both Express and Sails versions)
The utilities depend on one environment variable DATABASE_URL. The DATABASE_URL requires the following format:

`mysql2://user:passwd@host:port_number/db_name`

For example:

`set DATABASE_URL='mysql2://user:passwd@host:port_number/db_name'`

or

`export DATABASE_URL=mysql2://{user}:{password}@localhost:3306/citypairsdb`

### Sails version

1. In the same terminal session, change to the sails directory:

`cd sails`

2. Verify any dependencies are installed.

`npm update`

2. Verify that sails is installed correctly.

`sails --version`

You should receive a version number.

4. Run the application locally:

`sails lift`

You should receive the message like this:

`info: Starting ap...`
`Server lifted in {directory path}`

5. Test API is running by entering this URL in the browser (or API testing tool):

`http://localhost:1337/travel/citypairs/v0/airfares?award_year=2015&origin_airport_abbrev=BWI`

You should receive data in JSON format.

6. Exit the sails app, for example `ctrl+c`

### Express version

1. In the same terminal session, change to the express directory:

`cd ../express`

2. Verify any dependencies are installed

`npm update`

3. Launch the API

`set DEBUG=cityPairsAPI_express:* & npm start`

The messages displayed will not provide much confirmation, so go to the next step.

4. Test API is running by entering this URL in the browser (or API testing tool):

`http://localhost:3000/travel/citypairs/v0/airfares/99`

You should receive data in JSON format.

5. Exit the express app, for example `ctrl+c`

