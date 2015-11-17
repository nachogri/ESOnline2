using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
//using System.Web.Security;


namespace ESOnline2.WebUI.Models
{
 
    public class RegisterExternalLoginModel
    {
        [Required(ErrorMessage="El {0} es requerido")]
        [Display(Name = "Usuario")]
        public string UserName { get; set; }

        public string ExternalLoginData { get; set; }
    }

    public class LocalPasswordModel
    {
        [Required(ErrorMessage = "El {0} es requerido")]
        [DataType(DataType.Password)]
        [Display(Name = "Password actual")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "El {0} es requerido")]
        [StringLength(100, ErrorMessage = "El {0} tiene que tener al menos {2} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Nuevo password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar nuevo password")]
        [Compare("NewPassword", ErrorMessage = "El nuevo password y la confirmación no concuerdan.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginModel
    {
        [Required(ErrorMessage = "El {0} es requerido")]
        [Display(Name = "Usuario")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "El {0} es requerido")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Recordarme?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterModel
    {
        [Required(ErrorMessage = "El {0} es requerido")]
        [Display(Name = "Usuario")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "El {0} es requerido")]
        [StringLength(100, ErrorMessage = "El {0} tiene que tener al menos {2} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar password")]
        [Compare("Password", ErrorMessage = "El nuevo password y la confirmación no concuerdan.")]
        public string ConfirmPassword { get; set; }
    }

    public class ExternalLogin
    {
        public string Provider { get; set; }
        public string ProviderDisplayName { get; set; }
        public string ProviderUserId { get; set; }
    }
}
