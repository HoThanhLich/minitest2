function showProducts(page) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products?page=${page}`,
        success: function (data) {
            let list = data.content;
            let content = '';
            for (let i = 0; i < list.length; i++) {
                content += `
                <tr>
                    <td>${i+1+5*page}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].quantity}</td>
                    <td>${list[i].description}</td>
                    <td>${list[i].category?.name}</td>
                    <td><img src="http://localhost:8080/image/${list[i].image}" height="80px" width="80px"></td> 
                    <td><button onclick="showEditForm(${list[i].id})">edit</button></td>                   
                    <td><button onclick="showDeleteForm(${list[i].id})">delete</button></td>
                    </tr>
                `
            }
            $(`#display-products`).html(content);
            let iconPage = `<button class="pageButton" id="first" onclick="showProducts(0)"><i class="fa-solid fa-backward-fast">trang đầu</i></button> 
                <button class="pageButton" id="backup" onclick="showProducts(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber +1 }/ ${data.totalPages}</span>
                      <button class="pageButton" id="next" onclick="showProducts(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">next</i></input>
                        <button class="pageButton" id="last" onclick="showProducts(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">trang cuối</i></input>`
            $(`#iconPage`).html(iconPage);
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true

            }

            if (data.totalPages ===0 ) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }

            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }
        }
    })
}

showProducts(0);

function showDeleteForm(id) {
    let drawAdd = `<table id="add-new-book-form" style="border: none">
            <td colspan="2"><tr><h2 style="color: red">Delete product</h2>
            <h4 style="color: red">Are you sure?</h4>
            </tr>
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
                <td>Category:</td>
                <td>
                <select id="newCategory">
                    
                </select>
                </td>  
            </tr>
            <tr>
            <td>Image:</td>
            <td ><div id="newImage"></div></td> 
            <tr>
            
    </tr>
            </tr>
            
            <tr>
            <td><td><button style="border-radius: 8px; width: 40%" onclick="deleteProduct(${id})">Delete</button></td></td>
            <td><button style="border-radius: 8px; width: 100%; background-color: red; color: white; margin-right: auto" onclick="closeForm()">Close</button></td>          
            </tr></td>
            
       </table>`;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/${id}`,
        success: function (data) {
            let img = `<img src="http://localhost:8080/image/${data.image}" height="60" width="80" alt=""/>`
            $('#newName').val(data.name);
            $('#newPrice').val(data.price);
            $('#newQuantity').val(data.quantity);
            $('#newDescription').val(data.description);
            $('#newCategory').val(data.category);
            $(`#newImage`).html(img)
        }
    })
    $('#create-form').html(drawAdd);
    getCategories();

}

function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/products/${id}`,
        success: function () {
            showProducts(0);
            $('#create-form').html("");
        }
    })
}

function showEditForm(id) {
    let drawAdd = `<table id="add-new-book-form" style="border: none">
            <td colspan="2"><tr><h3 style="color: blue">Update product form</h3></tr>
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
                <td>Category:</td>
                <td>
                <select id="newCategory">
                    
                </select>
                </td>  
            </tr>
            <tr>
            <td>Image:</td>
            <td ><div id="newImage"></div></td> 
            <tr>
            <td>            <input type="file" id="imageNew">
</td>
    </tr>
            </tr>
            
            <tr>
            <td><td><button style="border-radius: 8px; width: 40%" onclick="updateProduct(${id})">Update</button></td></td>
            <td><button style="border-radius: 8px; width: 100%; background-color: red; color: white; margin-right: auto" onclick="closeForm()">Close</button></td>          
            </tr></td>
            
       </table>`;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/${id}`,
        success: function (data) {
            let img = `<img src="http://localhost:8080/image/${data.image}" height="60" width="80" alt=""/>`
            $('#newName').val(data.name);
            $('#newPrice').val(data.price);
            $('#newQuantity').val(data.quantity);
            $('#newDescription').val(data.description);
            $(`#newImage`).html(img)
        }
    })
    $('#create-form').html(drawAdd);
    getCategories();

}

function updateProduct(id) {
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
    newProduct.append('description', newDescription);
    newProduct.append('category', newCategory);
    newProduct.append('image', newImage.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/products/${id}`,
        data: newProduct,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            showProducts();
            alert('Thanh Cong!')
            $('#create-form').html("");
        },
        error: function () {
            alert('That Bai!')
        }
    })
}

function getCategories() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/categories`,
        success: function (data) {
            let content = `<option disabled>Choose Category</option>`;
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $(`#newCategory`).html(content);
        }
    })
}

function showCreateForm() {
    let drawAdd = `<table id="add-new-book-form" style="border: none">
            <tr><h3 style="color: blue">Create new product</h3></tr>
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
                    
                </select>
                </td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td><button style="border-radius: 8px; width: 100%; background-color: red; color: white; margin-right: 3%" onclick="closeForm()">Close</button></td>
            <td><button style="border-radius: 8px; width: 100%" onclick="addNewProduct()">Add</button></td>
            </tr>
       </table>`;
    $('#create-form').html(drawAdd);
    getCategories();
}

function closeForm() {
    $('#create-form').html("");
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
    newProduct.append('description', newDescription);
    newProduct.append('category', newCategory);
    newProduct.append('image', newImage.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products',
        data: newProduct,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            showProducts();
            alert('Thanh Cong!')

            let newName = $('#newName').val(null);
            let newPrice = $('#newPrice').val(null);
            let newQuantity = $('#newQuantity').val(null);
            let newDescription = $('#newDescription').val(null);
            let newImage = $('#newImage').val(null);
        },
        error: function () {
            alert('That Bai!')
        }
    })
}