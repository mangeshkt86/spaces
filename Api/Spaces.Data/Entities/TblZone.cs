using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblZone
    {
        public TblZone()
        {
            TblDesks = new HashSet<TblDesk>();
        }

        public long Id { get; set; }
        public long FloorId { get; set; }
        public string Name { get; set; } = null!;
        public string Status { get; set; } = null!;

        public virtual TblFloor Floor { get; set; } = null!;
        public virtual ICollection<TblDesk> TblDesks { get; set; }
    }
}
