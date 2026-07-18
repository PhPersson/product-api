
using Microsoft.AspNetCore.Mvc;

namespace product_api.Controllers
{

    [ApiController]
    [Route("products")]
    public class ProductController : ControllerBase
    {

        private static readonly List<Product> products =
        [
            new(1, "Apple Iphone 17", ProductCategory.Tech, 10500, true),
        new(2, "Banana", ProductCategory.Food, 10, true),
        new(3, "Bobby Cart", ProductCategory.Toys, 500, false)
        ];

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return products;
        }

        [HttpGet("{id:int}")]
        public ActionResult<Product> Get(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> Post(Product product)
        {
            product.Id = products.Max(p => p.Id) + 1;

            products.Add(product);

            return CreatedAtAction(
                nameof(Get),
                new { id = product.Id }
            );
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);

            if (product == null)
                return NotFound();

            products.Remove(product);

            return NoContent();
        }
    }
}




