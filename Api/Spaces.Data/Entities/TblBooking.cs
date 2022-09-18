using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblBooking
    {
        public long Id { get; set; }
        public string? UserId { get; set; }
        public long? DeskNumber { get; set; }
        public string? IsBooked { get; set; }
        public string? BookedOn { get; set; }
        public string? BookedFor { get; set; }
    }
}
