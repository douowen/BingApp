using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BingApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "home",
                url: "bingApp/home",
                defaults: new { controller = "BingApp", action = "Home" }
            );

            routes.MapRoute(
                name: "web",
                url: "bingApp/web",
                defaults: new { controller = "BingApp", action = "Web" }
            );

            routes.MapRoute(
                name: "images",
                url: "bingApp/images",
                defaults: new { controller = "BingApp", action = "Images" }
            );

            routes.MapRoute(
                name: "videos",
                url: "bingApp/videos",
                defaults: new { controller = "BingApp", action = "Videos" }
            );

            routes.MapRoute(
                name: "maps",
                url: "bingApp/maps",
                defaults: new { controller = "BingApp", action = "Maps" }
            );

            routes.MapRoute(
                name: "news",
                url: "bingApp/news",
                defaults: new { controller = "BingApp", action = "News" }
            );

            routes.MapRoute(
                name: "explore",
                url: "bingApp/explore",
                defaults: new { controller = "BingApp", action = "Explore" }
            );

            routes.MapRoute(
                name: "search history",
                url: "bingApp/history",
                defaults: new { controller = "BingApp", action = "History" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{*url}",
                defaults: new { controller = "Home", action = "Index" }
            );
        }
    }
}
