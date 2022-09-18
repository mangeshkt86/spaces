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

public class DeskController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<DeskController> _logger;

    public DeskController(ILogger<DeskController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [EnableQuery]
    public IQueryable<TblDesk> Get([FromServices] SpacesDbContext context)
    {
        return context.TblDesks;
    }

    // GET: api/Desk/5
    #region snippet_GetByID
    [HttpGet]
    [EnableQuery]
    public TblDesk GetTblDesk(long key)
    {
        var desk = _context.TblDesks.Find(key);

        return desk;
    }
    #endregion

}
