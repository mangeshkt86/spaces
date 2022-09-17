using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Spaces.Api
{
    public partial class space_allocationContext : DbContext
    {
        public space_allocationContext()
        {
        }

        public space_allocationContext(DbContextOptions<space_allocationContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblFloor> TblFloors { get; set; } = null!;
        public virtual DbSet<TblLocation> TblLocations { get; set; } = null!;
        public virtual DbSet<TblZone> TblZones { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlite("Data Source='C:\\Users\\lenovo\\Desktop\\Projects\\spaces\\Database\\space_allocation.db';");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblFloor>(entity =>
            {
                entity.ToTable("tbl_floor");
            });

            modelBuilder.Entity<TblLocation>(entity =>
            {
                entity.ToTable("tbl_location");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<TblZone>(entity =>
            {
                entity.ToTable("tbl_zone");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
