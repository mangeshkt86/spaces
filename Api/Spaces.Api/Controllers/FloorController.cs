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

namespace Spaces.Api.Controllers;

public class FloorController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<FloorController> _logger;

    public FloorController(ILogger<FloorController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }
    #region Floors public methods
    [HttpGet("get-all-floors")]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblFloor> Get([FromServices] SpacesDbContext context)
    {
        return context.TblFloors;
    }

    // GET: api/Floor/5

    [HttpGet("get-floor-by-Id/{id}")]
    [EnableQuery]
    public async Task<ActionResult<TblFloor>> GetFloorById(long id)
    {
        var floor = await _context.TblFloors.FindAsync(id);

        if (floor == null)
        {
            return NotFound();
        }

        return floor;
    }

    [HttpGet("get-floors-by-location/{id}")]
    [EnableQuery]
    public IQueryable<TblFloor> GetFloorsByLocationId(long id)
    {
        return _context.TblFloors.Where(flr => flr.LocationId == id);
    }

    #endregion

}
