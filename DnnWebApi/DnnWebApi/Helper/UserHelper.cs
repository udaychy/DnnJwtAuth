using System;
using System.Linq;
using DnnWebApi.Model;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.UI.UserControls;

namespace DnnWebApi.Helper
{
    public static class UserHelper
    {
        private static PortalSettings GetCurrentPortalSetting()
        {
            return PortalController.Instance.GetCurrentPortalSettings();
        }
        

        public static UserModel GetUser(int userId)
        {
            UserInfo user = UserController.GetUserById(GetCurrentPortalSetting().PortalId, userId);
            if (user == null) return null;

            return new UserModel()
            {
                UserId = userId,
                DisplayName = user.DisplayName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.Username,
                Roles = user.Roles != null && user.Roles.Length > 0 ? String.Join(", ", user.Roles) : "No Role Assigned",
                Photo = user.Profile.Photo ?? user.Profile.PhotoURL
            };
        }
    }
}
