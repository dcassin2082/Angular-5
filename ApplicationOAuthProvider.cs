using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider 
    {
        public override Task ValidateClientAuthentication (OAuthValidateClientAuthenticationContext context)
        {
           return Task.FromResult(context.Validated());
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            // create a new  UserStore (Microsoft.AspNet.Identity.EntityFramework) and pass the db context as param
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());

            // create a new UserManager (Microsoft.AspNet.Identity) and pass the user store as param
            var userManager = new UserManager<ApplicationUser>(userStore);

            // create user by retrieving the user name & password from the OAuth context
            var user = await userManager.FindAsync(context.UserName, context.Password);

            // null-check user
            if(user != null && user.EmailConfirmed)
            {
                /// create the claims identity (System.Security.Claims), then add the claims to it
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("Username", user.UserName));
                identity.AddClaim(new Claim("Password", user.PasswordHash));
                identity.AddClaim(new Claim("Email", user.Email));
                identity.AddClaim(new Claim("LoggedOn", DateTime.Now.ToString()));

                // get the roles assigned to this user, then add roles to the claim and add authentication properties (Microsoft.Owin.Security)
                var userRoles = userManager.GetRoles(user.Id);
                foreach(string roleName in userRoles)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, roleName));
                }
                var additionalData = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "role", Newtonsoft.Json.JsonConvert.SerializeObject(userRoles)
                    }
                });
                // create the auth token and validate context
                var token = new AuthenticationTicket(identity, additionalData);
                context.Validated(token);
            }
            else
            {
                // user is not logged in
                return;
            }
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach(KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }
    }
}