# Running This Project On Cloud.gov

These instructions allow you to clone this repo and deploy it to cloud.gov. To run the app locally, look at these instructions: [running_this_project_locally](running_this_project_locally.md).

Prerequisites: 

1. Clone this repository on your local machine
2. Have a fr.cloud.gov account
3. Node.js installed on local machine
4. Have created a sample sailsjs application on your local machine and deployted to cloud.gov following these instructions: [sailsjs setup](create_sailjs_webserver_on_cloud.md)
5. Already have created the database service in your cloud.gov space and loaded the data. See instructions here: [database_setup/readme.md](database_setup/readme.md)

Assumptions:
Using powershell on local machine



## Running this project in the cloud

### Sails version
1. In the local repo, cd to the /sails directory.
2. Log into cloud.gov

   `cf login -a api.fr.cloud.gov --sso`

   Set the target org and space through the menu or the following command:

   `cf target -o {org_name} -s {space_name}`

3. Push a copy of the application to cloud.gov

   `cf push`

   If it is successful, you should get several messages, including:
   `Build succeeded!`
   `App started`
   `urls: {url}`


4. Test the web page to confirm it has deployed
    Access the {url} from above using a web browser. You should see the following message:
    
    `Welcome to Web CityPairs API demo page!`
    
    You will also see an example API path. Copy that for the next step.
    
5. Test the API
    Access the API in your web browser. 
    You can construct the API url by adding the {url} value plus the example API path copied in the previous step. Access this URL in your web browser. You should see the resulting JSON. (Alternatively, you can call the API with an API testing tool.)

### Express version
Follow the same instructions as the Sails version, but cd to the /express directory.





