﻿using System.Web;
using System.Web.Optimization;

namespace BingApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/External/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/External/angular.js",
                        "~/Scripts/External/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/External/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bingapp")
                .IncludeDirectory("~/Scripts/Internal", "*.js")
                .Include("~/Scripts/BingApp.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}