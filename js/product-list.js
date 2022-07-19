class ProductsList {
    constructor() {
        this.container = document.querySelector('.products_container');
        this.productsService = new ProductsService();
        this.renderProducts();
    }
    async renderProducts() {
        let productsListDomString = '';
        const products = await this.productsService.getProducts();
        products.forEach(product => {
            productsListDomString += this.createproductsListDomString(product);
        });
        this.container.innerHTML = productsListDomString;
        this.addEventListeners();
    }
    createproductsListDomString(product){
           return `<article class="card col-12 col-sm-6 col-md-4 col-lg-3">
             <img src="img/${product.image}" class="card-img-top" alt="${products.title}">
             <div class="card-body">
               <h5 class="card-title">${product.title}</h5>
               <p class="card-text">${product.description}</p>
               <a href="#" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#product-info-modal" data-id=${product.id}>Info</a>
               <a href="#" class="btn btn-primary btn-buy" data-id=${product.id}>Buy ${product.price}</a>
             </div>
           </article>`
    }
    addEventListeners () {
        document.querySelectorAll('.btn-info').forEach(btn => {
            btn.addEventListener('click', this.showProductInfo.bind(this));
        });
        document.querySelectorAll('.btn-buy').forEach(btn =>{
            btn.addEventListener('click', this.addProductToCart.bind(this));
        });
    }
    async showProductInfo(event) {
        const id = event.target.dataset.id;
        const product = await this.productsService.getProductsById(id);
        const modal = document.querySelector('#product-info-modal');
        modal.querySelector('.modal-title').innerHTML = product.title;
        modal.querySelector('.product-image').src = `img/${product.image}`;
        modal.querySelector('.product-description').innerHTML = product.description;
        modal.querySelector('.product-price').innerHTML = product.price;
        modal.querySelector('.btn-buy').dataset.id = product.id;
    }
    async addProductToCart(event) {
        const id = event.target.dataset.id;
        const product = await this.productsService.getProductsById(id);
        const cart = new Cart();
        cart.addProduct(product);
    }
}
new ProductsList();