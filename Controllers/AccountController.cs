using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    public class AccountController : ApiController
    {
        [Route("api/User/Register")]
        [HttpPost]
        [AllowAnonymous]
        public IdentityResult Register(AccountModel model)
        {
            DpapiDataProtectionProvider provider = new DpapiDataProtectionProvider("WebApi");
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var userManager = new UserManager<ApplicationUser>(userStore)
            {
                PasswordValidator = new PasswordValidator
                {
                    RequiredLength = 3
                },
                UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(provider.Create("EmailConfirmation"))
            };
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email =model.Email
            };
            IdentityResult result = userManager.Create(user, model.Password);
            if (user != null)
            {
                string code = userManager.GenerateEmailConfirmationToken(user.Id);
                code = HttpUtility.UrlEncode(code);
                try
                {
                    IEmailService emailService = new EmailService();
                    string callbackUrl = Url.Link("DefaultApi", new { controller = "Account/ConfirmEmail", userId = user.Id, code });
                    string body = "<h5>Welcome " + model.UserName + "! Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</h5>";
                    emailService.GenerateEmailConfirmationBody(body, callbackUrl);
                    string from = ConfigurationManager.AppSettings["From"]; 
                    string to = user.Email;
                    string subject = ConfigurationManager.AppSettings["EmailConfirmation"];
                    using (MailMessage message = emailService.GenerateMailMessage(from, to, subject, body))
                    {
                        SmtpClient client = emailService.GenerateSmtpClient();
                        emailService.SendEmail(message, to, client);
                        //emailService.GenerateEmailHistoryEntry(message, user.Email, client, "Email Confirmation");
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            //userManager.AddToRoles(user.Id, model.Roles);

            return result;
        }

        [Route("api/ForgotPassword")]
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult ForgotPassword(AccountModel model)
        {
            DpapiDataProtectionProvider provider = new DpapiDataProtectionProvider("WebApi");
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var userManager = new UserManager<ApplicationUser>(userStore)
            {
                PasswordValidator = new PasswordValidator
                {
                    RequiredLength = 3
                },
                UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(provider.Create("EmailConfirmation"))
            };
            var user = userManager.FindByEmail(model.Email);
            if (user != null)
            {
                string code = userManager.GeneratePasswordResetToken(user.Id);
                code = HttpUtility.UrlEncode(code);
                try
                {
                    IEmailService emailService = new EmailService();
                    string callbackUrl = Url.Link("DefaultApi", new { controller = "Account/ResetPassword",
                        userId = user.Id, code, password = model.Password });
                    string body = "<h5>Your password was successfully reset.  <a href=\"" +
                        callbackUrl + "\">Click here to login to your account</h5>";
                    emailService.GenerateEmailConfirmationBody(body, callbackUrl);
                    string from = ConfigurationManager.AppSettings["From"];
                    string to = user.Email;
                    string subject = ConfigurationManager.AppSettings["PasswordReset"];
                    using (MailMessage message = emailService.GenerateMailMessage(from, to, subject, body))
                    {
                        SmtpClient client = emailService.GenerateSmtpClient();
                        emailService.SendEmail(message, to, client);
                        //emailService.GenerateEmailHistoryEntry(message, user.Email, client, "Email Confirmation");
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return Ok(user);
        }

        [Route("api/Account/ResetPassword")]
        [AllowAnonymous]
        [HttpGet]
        public async Task<IHttpActionResult> ResetPassword(string userId, string code, string password)
        {
            DpapiDataProtectionProvider provider = new DpapiDataProtectionProvider("WebApi");
            code = HttpUtility.UrlDecode(code);
            if (userId == null || code == null)
                return NotFound();
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var userManager = new UserManager<ApplicationUser>(userStore)
            {
                PasswordValidator = new PasswordValidator
                {
                    RequiredLength = 3
                },
                UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(provider.Create("EmailConfirmation"))
            };
            var result = await userManager.ResetPasswordAsync(userId, code, password);
            if (result.Succeeded)
            {
                // redirect to reset password success page ==> click here to login to your account
                return Redirect("http://localhost:4200/login");
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("api/Account/ConfirmEmail")]
        [AllowAnonymous]
        [HttpGet]
        public async Task<IHttpActionResult> ConfirmEmail(string userId, string code)
        {
            DpapiDataProtectionProvider provider = new DpapiDataProtectionProvider("WebApi");
            if (userId == null || code == null)
                return NotFound();
            code = HttpUtility.UrlDecode(code);
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var userManager = new UserManager<ApplicationUser>(userStore)
            {
                UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(provider.Create("EmailConfirmation"))
            };
            var result = await userManager.ConfirmEmailAsync(userId, code);
            if (result.Succeeded)
            {
                return Redirect("http://localhost:4200/login");
            }
            else
            {
                return BadRequest();
            }
        }
        
        [Route("api/GetUserClaims")]
        public AccountModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            if (identityClaims.IsAuthenticated)
            {
                AccountModel model = new AccountModel
                {
                    UserName = identityClaims.FindFirstValue("Username"),
                    Password = identityClaims.FindFirstValue("Password"),
                    Email = identityClaims.FindFirstValue("Email"),
                    LoggedOn = identityClaims.FindFirstValue("LoggedOn")
                };
                return model;
            }
            else
            {
                return null;
            }
        }

        [Authorize(Roles = "Admin")]
        [Route("api/ForAdminRole")]
        public string GetAdminRole()
        {
            return "admin";
        }

        [Authorize(Roles = "SuperAdmin")]
        [Route("api/ForSuperAdminRole")]
        public string GetSuperAdminRole()
        {
            return "super admin";
        }

        [Authorize(Roles = "Member")]
        [Route("api/ForMemberRole")]
        public string GetLocalRole()
        {
            return "member";
        }
    }
}
