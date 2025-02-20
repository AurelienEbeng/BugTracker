﻿using System.ComponentModel.DataAnnotations;

namespace backend.Core.Entities
{
    public class CreateUserForm
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [Compare("Password", ErrorMessage = "Passwords don't match.")]
        public string? ConfirmPassword { get; set; }
    }
}
