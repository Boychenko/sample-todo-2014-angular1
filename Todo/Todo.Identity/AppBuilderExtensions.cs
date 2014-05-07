using System;

using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

using Owin;

namespace Todo.Identity
{
    public static class AppBuilderExtensions
    {
        public static IAppBuilder UsePerOwinContext<T>(this IAppBuilder app, Func<T> createCallback) where T : class, IDisposable
        {
            return UsePerOwinContext<T>(app, ((options, context) => createCallback()));
        }

        public static IAppBuilder UsePerOwinContext<T>(
            this IAppBuilder app,
            Func<IdentityFactoryOptions<T>, IOwinContext, T> createCallback,
            Action<IdentityFactoryOptions<T>, T> disposeCallback = null) where T : class, IDisposable
        {
            if(app == null)
            {
                throw new ArgumentNullException("app");
            }
            if(createCallback == null)
            {
                throw new ArgumentNullException("createCallback");
            }
            if(disposeCallback == null)
            {
                disposeCallback = (options, instance) => instance.Dispose();
            }
            app.Use((object)typeof(IdentityFactoryMiddleware<T, IdentityFactoryOptions<T>>),
                new object[1]
                {
                    (object)
                        new IdentityFactoryOptions<T>()
                        {
                            DataProtectionProvider = Microsoft.Owin.Security.DataProtection.AppBuilderExtensions.GetDataProtectionProvider(app),
                            Provider = (IIdentityFactoryProvider<T>) new IdentityFactoryProvider<T>()
                            {
                                OnCreate = createCallback,
                                OnDispose = disposeCallback
                            }
                        }
                });
            return app;
        }
    }
}