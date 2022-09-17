using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblFloor
    {
        public long Id { get; set; }
        public long LocationId { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
    }
}
