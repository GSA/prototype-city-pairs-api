# How to create Sailsjs webserver on cloud.gov

*Purpose:* create a sailsjs webserver on cloud.gov platform with minimums customizations. After this process, one will learn the necessary steps to deploy a sailsjs webserver to cloud.gov to short the learning curve.

*Assumptions:* Node.js is already installed and cloud.gov’s CLI cf is already installed to your local computer. An account to cloud.gov is already created with organization of sandbox-gsa.

##setups
In this document, I use the following setups.
###Cloud.gov:
	Organization: sandbox-gsa
	Space: jim.pang

###Windows:
	Code base directory: c:/home
	Node version: v6.9.0    // you can use the latest version.
	npm version: 3.10.9
	cf version: 6.23         // required version is 6.22 and up.
	Editor: Visual Studio Code, https://code.visualstudio.com/

###Install sailsjs:
```
	cd /home
	npm -g install sails
	sails new testProject
```

A project directory testProject is created under directory c:/home. To test the installation on your local computer, use the following commands:

```
	cd testProject
	sails lift
```
start a web browser and visit the address: http://localhost:1337/
    
## push to cloud

In order to push this code to cloud.gov, we need to create two more files, Procfile and manifest.yml.

Procfile (with capital P) have one line.

The contents of file **Profile**
```
web: node app.js
```

The contents of file **manifest.yml**:
 
```
---
applications:
- name: firstSails
  memory: 256M 
env:  
  NODE_ENV: development
```

##Prepare the cf of cloud.gov and push the app to cloud

###login to cloud.gov
You need to request your organization cloud.gov administrator to add you as a cloud user first.

Here is a login example. You need to get one time code from url https://login.fr.cloud.gov/passcode.

I choose org sandbox-gsa for this excise. 
 
```
PS C:\home\cf\sails> cf login -a api.fr.cloud.gov --sso
API endpoint: api.fr.cloud.gov

One Time Code ( Get one at https://login.fr.cloud.gov/passcode )>
Authenticating...
OK

Select an org (or press enter to skip):
1. gsa-cto
2. sandbox-gsa

Org> 2
Targeted org sandbox-gsa

Targeted space jim.pang

API endpoint:   https://api.fr.cloud.gov (API version: 2.68.0)
User:           jim.pang@gsa.gov
Org:            sandbox-gsa
Space:          jim.pang
PS C:\home\cf\sails>

```

now, your are ready to push the application to cloud.gov.
    
```
		cf target -o sandbox-gsa
		cf push
```

After the push, you can test the web server with url firstsails.apps.cloud.gov

##url note
If the application name 'firstsails' is unique in the whole cloud, the url firstsails.apps.cloud.gov 
will work. Otherwise, you can change the url on cloud.gov dashboard in the **Routes** section.