using System;
using System.Collections.Generic;

namespace Spaces.Api
{
    public partial class TblZone
    {
        public long Id { get; set; }
        public long FloorId { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
    }
}
