write-host "Generating entities and db context from sqlite db.."
dotnet ef dbcontext scaffold "Data Source=C:\Users\899807\learning\SpaceAllocationTool\Database\space_allocation.db;" Microsoft.EntityFrameworkCore.Sqlite -o Entities --context-dir Infrastructure -c SpacesDbContext --context-namespace Spaces.Data --force