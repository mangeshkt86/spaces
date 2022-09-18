using System;
using System.Collections.Generic;

namespace Spaces.Data.Entities
{
    public partial class TblDepartment
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Oecode { get; set; }
        public long? ParentId { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
    }
}
