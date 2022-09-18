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

public class DeskController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<DeskController> _logger;

    public DeskController(ILogger<DeskController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("get-all-desks")]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblDesk> Get([FromServices] SpacesDbContext context)
    {
        return context.TblDesks;
    }

    #region snippet_GetByID
    [HttpGet("get-desk-by-Id/{id}")]
    [EnableQuery]
    public async Task<ActionResult<TblDesk>> GetDeskById(long id)
    {
        var desk = await _context.TblDesks.FindAsync(id);
        if (desk == null)
        {
            return NotFound();
        }
        return desk;
    }

    [HttpGet("get-desk_details-by-desk-number/{desknumber}")]
    [EnableQuery]
    public async Task<ActionResult<TblDesk>> GetDeskByDeskNumber(string desknumber)
    {
        desknumber = WebUtility.UrlDecode(desknumber);
        var desk = await _context.TblDesks.FirstOrDefaultAsync(d => d.DeskNumber == desknumber);
        if (desk == null)
        {
            return NotFound();
        }
        return desk;
    }

    [HttpGet("get-desks-by-zone/{id}")]
    [EnableQuery]
    public IQueryable<TblDesk> GetDesksByZoneId(long id)
    {
        return _context.TblDesks.Where(desk => desk.ZoneId == id);
    }
    #endregion

}
