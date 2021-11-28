const products = [
  {
    id: 0,
    name: "T-shirt 1",
    price: 219,
    inCart: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t1.png",
  },
  {
    id: 1,
    name: "T-shirt 2",
    price: 290,
    inCart: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t2.png",
  },
  {
    id: 2,
    name: "T-shirt 3",
    price: 180,
    inCart: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t3.png",
  },
  {
    id: 3,
    name: "T-shirt 4",
    price: 350,
    inCart: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t4.png",
  },
  {
    id: 4,
    name: "T-shirt 5",
    price: 230,
    inCart: 0,    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t5.png",
  },
  {
    id: 5,
    name: "T-shirt 6",
    price: 310,
    inCart: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t6.png",
  },
  {
    id: 6,
    name: "T-shirt 7",
    price: 500,
    inCart: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/t1.png",
  },
];

const buttonElement = document.querySelectorAll(".add-btn");
const cartElement = document.querySelector(".product-table");
const totalEl = document.querySelector(".totalp");
const subtotalEl = document.querySelector(".subtotal");
const totalpayEl = document.querySelector(".totalpay");


for (let i = 0; i < buttonElement.length; i++) {
  buttonElement[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    location.reload();
  });
}

function cartNumbers(product) {
  let productNum = localStorage.getItem("cart");
  productNum = parseInt(productNum);

  if (productNum) {
    localStorage.setItem("cart", productNum + 1);
  } else{
    localStorage.setItem("cart", 1);
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product
      }
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name] : product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let totalCost = localStorage.getItem("totalCost");
  // cartElement.innerHTML = '';
  
  if (cartItems) {
    Object.values(JSON.parse(cartItems)).map((item) => {
      cartElement.innerHTML += `
        <tr>
                      <td>
                        <div class="cart-image">
                            <img src="${item.imgSrc}">
                            <span class="badge">${item.inCart}</span>
                        </div>
                       </td>
                      <td colspan="2">${item.name}</td>
                      <td>${"BDT "+item.price * item.inCart}</td>
                      <td><a href="" class="delete-btn"><i class="far fa-trash-alt"></i></a></td>
                    </tr>
      `;
    });

    totalEl.innerHTML = "BDT " + totalCost;
    totalpayEl.innerHTML = "BDT " + totalCost;
    subtotalEl.innerHTML = "BDT " + totalCost;
  }
}
displayCart();