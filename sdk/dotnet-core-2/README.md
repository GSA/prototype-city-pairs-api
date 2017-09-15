# Prototype City Pairs api - SDK

Sample client app using the Prototype City Pairs API

## Seeing it in action
The SDK app is running currently on cloud.gov here:
https://city-pairs-sdk-dot-net-core-pierceable-whiskey.app.cloud.gov/

View a sample call to retrieve multiple airfares:
https://city-pairs-sdk-dot-net-core-pierceable-whiskey.app.cloud.gov/Airfares

View a sample call to retrieve a single airfare by ID:
https://city-pairs-sdk-dot-net-core-pierceable-whiskey.app.cloud.gov/Airfares/24170


## Run the app locally

1. Install ASP.NET Core .
+ cd into the app directory and then `src/WebApplication`
+ Run `dotnet restore`
+ Run `dotnet run`
+ Access the running app in a browser at <http://localhost:5000>

It should also work in VS 2017 with the run command.

## Building and Pushing to Cloud.gov

For cloud.gov, the manifest file is used: [manifest.yml](manifest.yml). This includes the app name.

Here is the command to push to cloud.gov (had to specify the buildpack in the push commmand because otherwise there were build errors):

`cf push -b https://github.com/cloudfoundry/dotnet-core-buildpack`

Uses the CloudFoundry ASP.NET Core buildpack:

https://github.com/cloudfoundry-incubator/dotnet-core-buildpack
