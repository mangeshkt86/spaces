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
public class LocationController : ControllerBase
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<LocationController> _logger;

    public LocationController(ILogger<LocationController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "clients")]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblLocation> Get([FromServices] SpacesDbContext context)
    {
        return context.TblLocations;
    }

    // GET: api/Location/5
    #region snippet_GetByID
    [HttpGet("{id}")]
    public async Task<ActionResult<TblLocation>> GetTblLocation(long id)
    {
        var location = await _context.TblLocations.FindAsync(id);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }
    #endregion
    
}
