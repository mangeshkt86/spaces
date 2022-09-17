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

[ApiController]
[Route("api/[controller]")]
public class ZoneController : ControllerBase
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<ZoneController> _logger;

    public ZoneController(ILogger<ZoneController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblZone> Get([FromServices] SpacesDbContext context)
    {
        return context.TblZones;
    }

    // GET: api/zone/5
    #region snippet_GetByID
    [HttpGet("{id}")]
    public async Task<ActionResult<TblZone>> GetTblZone(long id)
    {
        var location = await _context.TblZones.FindAsync(id);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }
    #endregion
    
}
