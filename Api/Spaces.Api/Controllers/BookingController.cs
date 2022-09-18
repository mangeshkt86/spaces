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

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<BookingController> _logger;

    public BookingController(ILogger<BookingController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    #region Booking CRUD Methods
    [HttpGet]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblBooking> Get([FromServices] SpacesDbContext context)
    {
        return context.TblBookings;
    }

    // GET: api/Desk/5

    [HttpGet("{id}")]
    public async Task<ActionResult<TblBooking>> GetTblBooking(long id)
    {
        var location = await _context.TblBookings.FindAsync(id);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }

    [HttpPost]
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

    [HttpPut]
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

    [HttpDelete]
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
