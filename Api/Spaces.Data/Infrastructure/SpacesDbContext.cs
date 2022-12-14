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

        public virtual DbSet<TblAllocation> TblAllocations { get; set; } = null!;
        public virtual DbSet<TblBooking> TblBookings { get; set; } = null!;
        public virtual DbSet<TblDepartment> TblDepartments { get; set; } = null!;
        public virtual DbSet<TblDesk> TblDesks { get; set; } = null!;
        public virtual DbSet<TblFloor> TblFloors { get; set; } = null!;
        public virtual DbSet<TblLocation> TblLocations { get; set; } = null!;
        public virtual DbSet<TblZone> TblZones { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlite("Data Source=..\\..\\Database\\space_allocation.db;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblAllocation>(entity =>
            {
                entity.ToTable("tbl_allocation");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Oecode).HasColumnName("OECode");
            });

            modelBuilder.Entity<TblBooking>(entity =>
            {
                entity.ToTable("tbl_booking");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<TblDepartment>(entity =>
            {
                entity.ToTable("tbl_department");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Oecode).HasColumnName("OECode");
            });

            modelBuilder.Entity<TblDesk>(entity =>
            {
                entity.ToTable("tbl_desk");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Zone)
                    .WithMany(p => p.TblDesks)
                    .HasForeignKey(d => d.ZoneId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<TblFloor>(entity =>
            {
                entity.ToTable("tbl_floor");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.TblFloors)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
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

                entity.HasOne(d => d.Floor)
                    .WithMany(p => p.TblZones)
                    .HasForeignKey(d => d.FloorId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
