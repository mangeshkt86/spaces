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
public class FloorController : ControllerBase
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<FloorController> _logger;

    public FloorController(ILogger<FloorController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblFloor> Get([FromServices] SpacesDbContext context)
    {
        return context.TblFloors;
    }

    // GET: api/Floor/5
    #region snippet_GetByID
    [HttpGet("{id}")]
    public async Task<ActionResult<TblFloor>> GetTblFloor(long id)
    {
        var location = await _context.TblFloors.FindAsync(id);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }
    #endregion
    
}
