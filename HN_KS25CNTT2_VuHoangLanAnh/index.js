let products = JSON.parse(localStorage.getItem("products")) || [
    {id: 1, name: "Chuột Logitech", price: 500000, stock: 7},
    {id: 2, name: "Bàn phím cơ", price: 1250000, stock: 2},
    {id: 3, name: "Máy tính xách tay", price: 15000000 , stock: 5},
];

const nameProductInput = document.getElementById("iName");
const priceProductInput = document.getElementById("iPrice");
const stockProductInput = document.getElementById("iStock");
const tBody = document.getElementById("tbody");
const search = document.getElementById("searchInput");
const submitBtn = document.getElementById("btnSubmit");
const sortBtn = document.getElementById("sortSelect");
const emptyState = document.getElementById("emptyState");

//vnd price
function formatPrice (price){
    return Number(price).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

//hien thi danh sach san pham
function renderProduct(data = products) {
    tBody.innerHTML = "";

    if (data.length === 0) {
        tBody.innerHTML = `<tr>
                <td colspan="5" style="text-align: center;">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</td>
              </tr>`
        return;
    }

    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += `<tr>
                <td>${data[i].id}</td>
                <td class="td-name">${data[i].name}</td>
                <td class="td-price">${formatPrice(data[i].price)}</td>
                <td class="center" style="font-weight: 700">${data[i].stock}</td>
                <td>
                  <div class="td-actions">
                    <button class="btn btn-sm btn-edit" onclick="editProduct(${i})">✏ Sửa</button>
                    <button class="btn btn-sm btn-del" onclick="deleteProduct(${i})">✕ Xóa</button>
                  </div>
                </td>
              </tr>

        `
    }
    tBody.innerHTML = html;

}


//chuc nang them sp
function submitForm(e) {
    e.preventDefault();

    const name = nameProductInput.value.trim();
    const price = priceProductInput.value;
    const stock = stockProductInput.value;

    if (!name) {
        alert("Vui lòng nhập tên sản phẩm");
        return;
    }
    // kiem tra ten trung 
    const isDuplicateName = products.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (isDuplicateName) {
        alert("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
        return;
    }
    if (price < 0) {
        alert("Giá phải là số dương lớn hơn 0");
        return;
    }
    if (stock < 0) {
        alert("Tồn kho phải là số nguyên lớn hơn hoặc bằng 0");
        return;
    }

    const newProduct = {
        id: products.length !== 0 ? products[products.length - 1].id + 1 : 1,
        name: name,
        price: price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}),
        stock: stock,
    }

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    renderProduct();

    nameProductInput.value = "";
    priceProductInput.value = "";
    stockProductInput.value = "";
}

//chuc nang xoa sp
function deleteProduct(i) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        products.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProduct();
        alert("Xóa sản phẩm thành công");
    }
}

//chuc nang sua sp
function editProduct(i) {
    const product = products[i];
    if (product) {

        nameProductInput.focus();

        nameProductInput.value = product.name;
        priceProductInput.value = product.price;
        stockProductInput.value = product.stock;
        submitBtn.innerText = "Lưu thay đổi";
        submitBtn.onclick = function () { updateProduct(i) };
    }
}

function updateProduct(i) {

    const newName = nameProductInput.value;
    const newPrice = priceProductInput.value;
    const newStock = stockProductInput.value;

    if (!newName) {
        alert("Vui lòng nhập tên sản phẩm");
        return;
    }
    if (newPrice < 0) {
        alert("Giá phải là số dương lớn hơn 0");
        return;
    }
    if (newStock < 0) {
        alert("Tồn kho phải là số nguyên lớn hơn hoặc bằng 0");
        return;
    }

    products[i] = {
        id: products[i].id,
        name: newName,
        price: newPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}),
        stock: newStock,
    }

    submitBtn.innerText = "Thêm";
    submitBtn.onclick = function (e) { submitForm(e) };
    nameProductInput.value = "";
    priceProductInput.value = "";

    localStorage.setItem("products", JSON.stringify(products));
    renderProduct(products);

}
renderProduct();

// chuc nang tim kiem san pham
function searchProduct() {
    let keyword = search.value.toLowerCase();

    let filterProduct = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    )
    renderProduct(filterProduct);
}

//chuc nang sap xep 
function sortProduct() {
    if (sortBtn.value === "name-asc") {
        //a-z
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBtn.value === "name-desc") {
        //z-a
        products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBtn.value === "price-asc") {
        //gia tang dan
        products.sort((a, b) => a.price - b.price);
    } else if (sortBtn.value === "price-desc") {
        //gia giam dan
        products.sort((a, b) => b.price - a.price);
    }
    renderProduct();
}