using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Spaces.Data;
using Spaces.Data.Entities;
using System.Linq;
using System.Net;

namespace Spaces.Api.Controllers;

public class BookingController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<BookingController> _logger;

    public BookingController(ILogger<BookingController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    #region Booking CRUD Methods
    [EnableQuery]
    [HttpGet("get-all-bookings")]
    public IQueryable<TblBooking> Get([FromServices] SpacesDbContext context)
    {
        return context.TblBookings;
    }

    // GET: api/Desk/5

    [HttpGet("get-booking-by-id/{key}")]
    [EnableQuery]
    public async Task<ActionResult<TblBooking>> GetTblBooking(long key)
    {
        var location = await _context.TblBookings.FindAsync(key);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }

    [HttpPost("add-booking")]
    public async Task<IActionResult> Post([FromBody] TblBooking booking)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.TblBookings.Add(booking);
        await _context.SaveChangesAsync();
        return Created("api/booking/" + booking.Id, booking);
    }

    [HttpPut("update-booking")]
    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] TblBooking booking)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != booking.Id)
        {
            return BadRequest();
        }
        _context.Entry(booking).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!bookingExists(key))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        //return Updated(booking);
        return NotFound();
    }

    [HttpDelete("delete-booking")]
    public async Task<ActionResult> Delete([FromODataUri] int key)
    {
        var booking = await _context.TblBookings.FindAsync(key);
        if (booking == null)
        {
            return NotFound();
        }
        _context.TblBookings.Remove(booking);
        await _context.SaveChangesAsync();
        return StatusCode((int)HttpStatusCode.NoContent);
    }


    private bool bookingExists(int key)
    {
        return _context.TblBookings.Any(x => x.Id == key);
    }

    #endregion
}
