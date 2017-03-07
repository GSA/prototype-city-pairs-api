# Running This Project On Cloud.gov

These instructions allow you to clone this repo and deploy it to cloud.gov. To run the app locally, look at these instructions: [running_this_project_locally](running_this_project_locally.md).

Prerequisites: 

1. Clone the repo on your local machine
2. Have a fr.cloud.gov account
3. Node.js installed on local machine
4. Have created a sample sailsjs application on your local machine and deployted to cloud.gov following these instructions: [sailsjs setup](create_sailjs_webserver_on_cloud.md)
5. Already have created database service in your cloud.gov space and loaded the data. See instructions here: [database_setup/readme.md](database_setup/readme.md)

Assumptions:
Using powershell on local machine



## Running this project in the cloud

### Sails version
1. Log into cloud.gov

`cf login -a api.fr.cloud.gov --sso`

Set the target org and space through the menu or the following command:

`cf target -o {org_name} -s {space_name}`

(Q: do you have to build the sails app in order to get all of the node_modules content?)

2. Push a copy of the application to cloud.gov

`cf push`

If it is successful, you should get a message stating that the application is running.


3. Test it is working with web page & API call

### Express version
1. Log into cloud.gov
2. Push your application to cloud.gov





