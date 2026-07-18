namespace product_api
{
    public class Product
        
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public ProductCategory Category { get; set; }
        public int Price { get; set; }
        public Boolean IsAvailable { get; set; }

        public Product(int id, string name, ProductCategory category, int price, bool isAvailable)
        {
            Id = id;
            Name = name;
            Category = category;
            Price = price;
            IsAvailable = isAvailable;
        }


    }

  


    public enum ProductCategory
    {
        Food,
        Tech,
        Toys,
    }

}
