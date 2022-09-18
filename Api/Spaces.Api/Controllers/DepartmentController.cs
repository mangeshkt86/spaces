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

public class DepartmentController : ODataController
{
    private readonly SpacesDbContext _context;
    private readonly ILogger<DepartmentController> _logger;

    public DepartmentController(ILogger<DepartmentController> logger, SpacesDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("get-all-departments")]
    [EnableQuery(PageSize = 50)]
    public IQueryable<TblDepartment> Get([FromServices] SpacesDbContext context)
    {
        return context.TblDepartments;
    }

    // GET: api/Desk/5
    #region Department Public Methods
    [HttpGet("get-department-by-id/{key}")]
    [EnableQuery]
    public async Task<ActionResult<TblDepartment>> GetTblDepartment(long key)
    {
        var location = await _context.TblDepartments.FindAsync(key);

        if (location == null)
        {
            return NotFound();
        }

        return location;
    }
    #endregion
}
