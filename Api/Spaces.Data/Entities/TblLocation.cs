using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblLocation
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
    }
}
