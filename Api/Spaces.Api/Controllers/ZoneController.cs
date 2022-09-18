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

public class ZoneController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<ZoneController> _logger;

    public ZoneController(ILogger<ZoneController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("get-all-zones")]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblZone> Get([FromServices] SpacesDbContext context)
    {
        return context.TblZones;
    }

    // GET: api/zone/5
    #region Zone Methods
    [HttpGet("get-zone-by-id/{id}")]
    [EnableQuery]
    public async Task<ActionResult<TblZone>> GetZoneById(long id)
    {
        var location = await _context.TblZones.FindAsync(id);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }

    [HttpGet("get-zones-by-floor/{id}")]
    [EnableQuery]
    public IQueryable<TblZone> GetZonesByFloorId(long id)
    {
        return _context.TblZones.Where(zone => zone.FloorId == id);
    }


    #endregion

}
