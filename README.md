# Ionic with DNN JWT Auth

A sample project to demonstrate how to consume the endpoints provided by DNN Auth handler and our custom web API in an Ionic Project.
  - DNN 9
  - Ionic 3
  
 ## 1. Set up DNN
In case if you are not familiar with DNN then you download it from [here](http://www.dnnsoftware.com/community/download).

## 2. Install DNN JWT Auth handler
Once we set up DNN then we need to install the JWT Auth handler. Please follow the steps shown [here](http://www.dnnsoftware.com/docs/administrators/jwt/setup-jwt-for-auth.html).
Once you installed JWT Auth handler, It provide you the endpoints for login and logout.

Login API (POST): http://your-host-name/DesktopModules/JwtAuth/API/mobile/login                                                           
POST request data: {"u":"username","p":"password"}

Log out API (GET): http://your-host-name/DesktopModules/JwtAuth/API/mobile/logout

you do not need to worry about the code of login and logout controller. Auth handler handles the logic for JWT login and logout internally but 
If you are interested in knowing more about JWT and its working then go through these [videos](https://www.youtube.com/watch?v=4dmvQlBmr34)

you just need to call these API with proper parameters. Please go through all the subtopics of [JWT Authentication](http://www.dnnsoftware.com/docs/administrators/jwt/index.html)

If you are done with all the steps above then we are all set with JWT.

> One more thing, Set the ``forceSSL`` to false otherwise API will always complain with 401 unauthorize access if you run without SSL
```sh
<add name="JWTAuth" type="Dnn.AuthServices.Jwt.Auth.JwtAuthMessageHandler, Dnn.AuthServices.Jwt" enabled="true" defaultInclude="true" forceSSL="false" />
```
> and Enable cross-origin resource sharing (CORS) to allow requests from remote JavaScript clients
```sh
<add name="Access-Control-Allow-Origin" value="*" />
<add name="Access-Control-Allow-Headers" value="accept, accept-language, content-type, accept, authorization, moduleid, tabid, x-dnn-moniker" />
<add name="Access-Control-Allow-Methods" value="GET, POST, PUT, HEAD, OPTIONS" />
```
    

## 3. Set up our Custom Web API 
If you have not added web API earlier in your DNN project then you can go through these [steps](http://www.dnnsoftware.com/community-blog/cid/142400/getting-started-with-services-framework-webapi-edition)
AND Open this DnnWenApi [project](https://github.com/udaychy/DnnJwtAuth/tree/master/DnnWebApi) with Visual Studio and set the reference of assemblies needed(which is
present inside the bin folder of your DNN project) then build the project and move the DnnWebApi.dll to the bin folder of your DNN project

Now you can consume your custom web API from (http://your-host-name/DesktopModules/DnnWebApi/API/User/HelloWorldWithoutJwt).

If everything goes fine then above url will respond with this message "Hello World WITHOUT JWT Auth"

> Note: It would be better if you host your DNN site on IIS.

## 4. Set up Ionic Project
  Download the Ionic project
  
  If you are new to node js then download it from [here](https://nodejs.org/en/download/) and get the basic idea of node and Ionic 2+.
  
  Install the node packages 
    
```sh
npm install
```
    
  Run your app
```sh
  ionic serve
```

  
