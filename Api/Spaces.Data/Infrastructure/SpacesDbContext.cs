using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Spaces.Data.Entities;

namespace Spaces.Data
{
    public partial class SpacesDbContext : DbContext
    {
        public SpacesDbContext()
        {
        }

        public SpacesDbContext(DbContextOptions<SpacesDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblDesk> TblDesks { get; set; } = null!;
        public virtual DbSet<TblFloor> TblFloors { get; set; } = null!;
        public virtual DbSet<TblLocation> TblLocations { get; set; } = null!;
        public virtual DbSet<TblZone> TblZones { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlite("Data Source=C:\\Users\\899807\\learning\\SpaceAllocationTool\\Database\\space_allocation.db;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblDesk>(entity =>
            {
                entity.ToTable("tbl_desk");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

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
