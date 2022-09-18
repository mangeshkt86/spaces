using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.AspNetCore.OData.Extensions;
using Spaces.Data.Entities;
using Spaces.Data;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Replace 'YourDbContext' with the name of your own DbContext derived class.
builder.Services.AddDbContext<SpacesDbContext>(
    dbContextOptions => dbContextOptions
        .UseSqlite(connectionString)
        // The following three options help with debugging, but should
        // be changed or removed for production.
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
);

builder.Services
    .AddControllers()
    //.AddOData(opt => opt.AddRouteComponents("v1", GetEdmModel()).Filter().Select().Expand())
    .AddOData()
    .AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

static IEdmModel GetEdmModel()
{
    ODataConventionModelBuilder builder = new();
    builder.EntitySet<TblLocation>("Location");
    builder.EntitySet<TblFloor>("Floor");
    builder.EntitySet<TblZone>("Zone");
    builder.EntitySet<TblDesk>("Desk");
    builder.EntitySet<TblDepartment>("Departments");
    builder.EntitySet<TblAllocation>("Allocation");
    builder.EntitySet<TblBooking>("Booking");
    return builder.GetEdmModel();
}