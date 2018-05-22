using System;
using System.Net;
using System.Net.Http;
using DnnWebApi.Helper;
using DotNetNuke.Web.Api;
using System.Web.Http;

namespace DnnWebApi.Controller
{
    
    public class UserController : DnnApiController
    {
        [DnnAuthorize(AuthTypes = "JWT")]
        [HttpGet()]
        public HttpResponseMessage GetUser(int userId)
        {
            return Request.CreateResponse(HttpStatusCode.OK, UserHelper.GetUser(userId));
        }

        [DnnAuthorize(AuthTypes = "JWT")]
        [HttpGet()]
        public HttpResponseMessage HelloWorldWithJwt()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Hello World with JWT Auth");
        }

        [AllowAnonymous]
        [HttpGet()]
        public HttpResponseMessage HelloWorldWithoutJwt()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Hello World WITHOUT JWT Auth");
        }

    }
}
