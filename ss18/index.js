let products = [];
let checkVarStatus = null;

let productForm = document.getElementById("productForm");
let productName = document.getElementById("productName");
let productCategory = document.getElementById("productCategory");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity");
let productDescription = document.getElementById("productDescription");

let productTableBody = document.getElementById("productTableBody");

let submitBtn = document.getElementById("submitBtn");
let formTitle = document.getElementById("formTitle");

productForm.addEventListener('submit', createProduct);
function createProduct(e) {
    e.preventDefault();

    if (checkVarStatus !== null) {
        let findUpdateNeedObject = products.find((item) => item.id === checkVarStatus);
        if (findUpdateNeedObject) {
            findUpdateNeedObject.productName = productName.value;
            findUpdateNeedObject.productCategory = productCategory.value;
            findUpdateNeedObject.productPrice = productPrice.value;
            findUpdateNeedObject.productQuantity = productQuantity.value;
            findUpdateNeedObject.productDescription = productDescription.value;
        }
    }

    let newProduct = {
        id: Date.now(),
        productName: productName.value.trim(),
        productCategory: productCategory.value,
        productPrice: +productPrice.value,
        productQuantity: +productQuantity.value,
        productDescription: productDescription.value.trim()
    }

    products.push(newProduct);
    localStorage.setItem("productList", JSON.stringify(products));
    productForm.reset();
    renderData();
}

function renderData() {
    productTableBody.innerHTML = "";
    products.forEach((p) => {
        //tạo tờ giấy a4
        let createTr = document.createElement('tr');

        //lấy data từ local
        function getData() {
            let getProduct = localStorage.getItem('products');
            if (getProduct) {
                products = JSON.parse(getProduct);

            }
        }

        // viết nội dung vào tờ giấy a4 đó (innerHTML)
        createTr.innerHTML = `
    <td>${p.id}</td>
    <td>${p.productName}</td>
    <td>${p.productCategory}</td>
    <td>${p.productPrice.toLocalString("vi-VN")}</td>
    <td>${p.productQuantity}</td>
    <td>${p.productDescription}</td>
    <td>
    <button onclick = "(updateProducts(${p.id}))">✏️ Sửa</button>
    <button>🗑️ Xóa</button>
    </td>
    `
        // dính tờ a4 vào nơi muốn hthi
        productTableBody.appendChild(createTr);
    });

}

// footer
let totalProductsEl = document.getElementById("totalProducts");
let totalValueEl = documennt.getElementById("totalValue");
let totalQuantityEl = document.getElementById("totalQuantity");


function stats() {
    let totalProducts = products.length;
    let totalPrice = products.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.producQuantity), 0);
    let totalQuantity = products.reduce((sum, item) => sum + Number(item.productQuantity), 0);

    totalProductsEl.textContent = totalProducts;
    totalValueEl.textContent = totalPrice.toLocalString("vi-VN");
    totalQuantityEl.textContent = totalQuantity;

}

//Sửa
function updateProducts(id) {
    // tìm id để tìm ob cần sửa
    checkVarStatus = id;
    let findObject = products.find((item) => item.id === id)
    // hthi dữ liệu đối tượng cần sửa lên giao diện  ô nhập
    if (findObject) {
        checkVarStatus = id;
        productName.value = findObject.productName;
        productCategory.value = findObject.productCategory;
        productPrice.value = findObject.productPrice;
        productQuantity.value = findObject.productQuantity;
        productDescription.value = findObject.productDescription;
    }
    productName.focus();

    // sửa gdien nút thêm thành cập nhập và tiêu đều form tương ứng

    submitBtn.textContent = "Cập nhật";
    formTitle.textContent = "Chỉnh Sửa Sản Phẩm"
    // gán gtri mới ở ô mk nhập vào dữ liệu gốc
}