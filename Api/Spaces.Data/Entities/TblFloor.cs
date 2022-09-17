using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblFloor
    {
        public TblFloor()
        {
            TblZones = new HashSet<TblZone>();
        }

        public long Id { get; set; }
        public long LocationId { get; set; }
        public string Name { get; set; } = null!;
        public string Status { get; set; } = null!;

        public virtual TblLocation Location { get; set; } = null!;
        public virtual ICollection<TblZone> TblZones { get; set; }
    }
}
