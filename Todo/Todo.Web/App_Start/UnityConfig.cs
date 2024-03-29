using System;
using System.Data.Entity;

using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;

using Todo.Domain;
using Todo.Domain.Contracts;
using Todo.Domain.Contracts.Services;
using Todo.Persistence;
using Todo.Services;
using Todo.Services.Mappers;

namespace Todo.Web.App_Start
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
           container.RegisterType<DbContext, TodoDbContext>(new HierarchicalLifetimeManager());
           container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());

           container.RegisterType<IItemService, ItemService>(new HierarchicalLifetimeManager());
           container.RegisterType(typeof(IMapper<,>), typeof(Mapper<,>), new ContainerControlledLifetimeManager());
        }
    }
}
