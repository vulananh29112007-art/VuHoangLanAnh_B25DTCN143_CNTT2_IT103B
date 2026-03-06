const products = [
    { id: 1, name: "Bánh Chưng", price: 150000 },
    { id: 2, name: "Giò Lụa", price: 180000 },
    { id: 3, name: "Cành Đào", price: 500000 },
    { id: 4, name: "Mứt Tết", price: 120000 },
    { id: 5, name: "Bao Lì Xì", price: 25000 },
    { id: 6, name: "Dưa Hấu Tết", price: 80000 },
];

let nextId = 7;

function renderProducts() {
    let str = "";
    for (let i = 0; i < products.length; i++) {
        str += `
        <li>Tên sản phẩm: ${products[i].name} - Giá tiền: ${products[i].price} <button class="delete-btn" onClick ="deleteProduct(${i})">Xóa</button></li>
        
        `;
    }
    document.getElementById("product-list").innerHTML = str;
}

renderProducts();

function addProduct() {
    event.preventDefault();
    let nameInput = document.getElementById("product-name");
    let priceInput = +document.getElementById("product-price").value;

    if (nameInput.value.trim() == "") {
        alert("Tên k được để trống");
        return;
    }

    if (isNaN(priceInput) || priceInput <= 0) {
        alert("Giá k hợp lệ");
        return;
    }

    let newProduct = {
        id: nextId++,
        name: nameInput.value,
        price: priceInput
    };

    products.push(newProduct);
    renderProducts();
}
function deleteProduct(i) {
    let confirmDelete = confirm(`Bạn có chắc chắn muốn xóa k`);
    if (confirmDelete) {
        products.splice(i,1);
        renderProducts();
    }else{
        alert(`Hủy thao tác`);
    }
}
