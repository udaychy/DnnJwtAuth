using DotNetNuke.Web.Api;

namespace DnnWebApi
{
    public class RouteMapper : IServiceRouteMapper
    {
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute("DnnWebApi", "default", "{controller}/{action}", new[] { "DnnWebApi.Controller" });
        }
    }
}
