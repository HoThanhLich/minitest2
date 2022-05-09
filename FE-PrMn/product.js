function showProducts(page) {
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/products?page=${page}`,
        success: function (data) {
            let list = data.content;
            let content =''
            for (let i = 0; i < list.length; i++) {
                content +=`
                <tr>
                    <td>${i + 1 + 5 * page}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].quantity}</td>
                    <td>${list[i].description}</td>
                    <td>${list[i].category?.name}</td>
                    <td><img src="http://localhost:8080/image/${list[i].image}" height="80px" width="50px"></td> 
                    <td><button>edit</button></td>                   
                    <td><button>delete</button></td>
                    </tr>
                `
            }
            $(`#display-products`).html(content);
        }
    })
}
showProducts(0);

function showCreateForm() {
    let drawAdd = `<table id="add-new-book-form" style="border: none">
            <tr><h3>Create new product</h3></tr>
            <tr >
                <td>Name:</td>
                <td><input type="text" id="newName"></td>
            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="text" id="newPrice"></td>
            </tr><tr>
                <td>Quantity:</td>
                <td><input type="text" id="newQuantity"></td>
            </tr><tr>
                <td>Description:</td>
                <td><input type="text" id="newDescription"></td>
            </tr>          
            <tr>
                <td>Image:</td>
                <td><input type="file" id="newImage"></td>
            </tr>
            <tr>
                <td>Category:</td>
                <td>
                <select id="newCategory">
                    <option value="1">IP</option>
                    <option value="2">SS</option>
                    <option value="3">SN</option>
                </select>
                </td>
            </tr>
            <tr>
            <td><button id="add" style="border-radius: 8px; width: 150%" onclick="addNewProduct()">Add</button></td>
            </tr>
       </table>`;
    $('#create-form').html(drawAdd);
}

function addNewProduct() {
    let newName = $('#newName').val();
    let newPrice = $('#newPrice').val();
    let newQuantity = $('#newQuantity').val();
    let newDescription = $('#newDescription').val();
    let newImage = $('#newImage');
    let newCategory = $('#newCategory').val();
    let newProduct = new FormData();
    newProduct.append('name', newName);
    newProduct.append('price', newPrice);
    newProduct.append('quantity', newQuantity);
    newProduct.append('category', newCategory);
    newProduct.append('image', newImage.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/books',
        data: newProduct,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getAllBooks();
            alert('Thanh Cong!')
        },
        error: function () {
            alert('That Bai!')
        }
    })
}