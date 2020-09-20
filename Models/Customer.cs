using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnBoardingTsk.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter Name"), MaxLength(30)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter Address"), MaxLength(30)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
