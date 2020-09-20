using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnBoardingTsk.Models
{
    public partial class Sales
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please select Product")]
        public int? ProductId { get; set; }


        [Required(ErrorMessage = "Please select Customer")]
        public int? CustomerId { get; set; }

        [Required(ErrorMessage = "Please select Store")]
        public int? StoreId { get; set; }
        public DateTime? DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
