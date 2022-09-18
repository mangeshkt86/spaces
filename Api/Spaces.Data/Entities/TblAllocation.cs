using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblAllocation
    {
        public long Id { get; set; }
        public string? Oecode { get; set; }
        public string? DeskNumber { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? Status { get; set; }
    }
}
