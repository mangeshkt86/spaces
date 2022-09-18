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

public class AllocationController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<AllocationController> _logger;

    public AllocationController(ILogger<AllocationController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    #region Allocation CRUD Methods
    [HttpGet]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblAllocation> Get([FromServices] SpacesDbContext context)
    {
        return context.TblAllocations;
    }

    // GET: api/Desk/5

    [HttpGet]
    [EnableQuery]
    public async Task<ActionResult<TblAllocation>> GetById(long key)
    {
        var location = await _context.TblAllocations.FindAsync(key);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TblAllocation allocation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.TblAllocations.Add(allocation);
        await _context.SaveChangesAsync();
        return Created("api/allocation/" + allocation.Id, allocation);
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromODataUri] int key, [FromBody] TblAllocation allocation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (key != allocation.Id)
        {
            return BadRequest();
        }
        _context.Entry(allocation).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AllocationExists(key))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        //return Updated(allocation);
        return NotFound();
    }

    [HttpDelete]
    public async Task<ActionResult> Delete([FromODataUri] int key)
    {
        var allocation = await _context.TblAllocations.FindAsync(key);
        if (allocation == null)
        {
            return NotFound();
        }
        _context.TblAllocations.Remove(allocation);
        await _context.SaveChangesAsync();
        return StatusCode((int)HttpStatusCode.NoContent);
    }


    private bool AllocationExists(int key)
    {
        return _context.TblAllocations.Any(x => x.Id == key);
    }

    #endregion
}
