using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BingApp.Startup))]
namespace BingApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
