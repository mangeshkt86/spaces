using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblLocation
    {
        public TblLocation()
        {
            TblFloors = new HashSet<TblFloor>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Status { get; set; } = null!;

        public virtual ICollection<TblFloor> TblFloors { get; set; }
    }
}
