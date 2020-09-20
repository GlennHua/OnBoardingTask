using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnBoardingTsk.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter Product Name"), MaxLength(30)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter the price"), MaxLength(30)]
        public string Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }

}
