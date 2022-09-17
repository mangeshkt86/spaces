using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblDesk
    {
        public long Id { get; set; }
        public long? ZoneId { get; set; }
        public string? DeskNumber { get; set; }
        public string? Feature { get; set; }
        public string? Status { get; set; }
    }
}
