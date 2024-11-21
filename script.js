// Obtener elementos del DOM
const carritoDiv = document.querySelector(".carrito"); // Para la barra lateral
const carritoItemsDiv = document.querySelector("#carrito-items"); // Para carrito.html
const carritoMensaje = document.querySelector("#carrito-mensaje");

// Inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar el carrito en localStorage
const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para actualizar la vista del carrito (barra lateral o carrito.html)
const actualizarCarrito = () => {
  if (carritoDiv) {
    carritoDiv.innerHTML = ""; // Limpiar contenido de la barra lateral

    if (carrito.length === 0) {
      carritoDiv.innerHTML = "<p>El carrito está vacío</p>";
    } else {
      carrito.forEach((producto, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carrito-item");

        itemDiv.innerHTML = `
          <p>${producto.nombre}</p>
          <p>Precio: $${producto.precio}</p>
          <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;

        carritoDiv.appendChild(itemDiv);
      });
    }
  }

  if (carritoItemsDiv) {
    carritoItemsDiv.innerHTML = ""; // Limpiar contenido de carrito.html

    if (carrito.length === 0) {
      carritoMensaje.style.display = "block";
      carritoMensaje.textContent = "El carrito está vacío.";
    } else {
      carritoMensaje.style.display = "none";

      carrito.forEach((producto, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carrito-item");

        itemDiv.innerHTML = `
          <p>${producto.nombre}</p>
          <p>Precio: $${producto.precio}</p>
          <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;

        carritoItemsDiv.appendChild(itemDiv);
      });
    }
  }

  // Agregar funcionalidad a los botones "Eliminar"
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1); // Eliminar producto del carrito
      guardarCarrito();
      actualizarCarrito();
    });
  });
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
  carrito.push(producto);
  guardarCarrito();
  actualizarCarrito();
  alert(`El producto "${producto.nombre}" se agregó al carrito.`);
};

// Asignar evento a los botones "Comprar" en la página principal
const botonesComprar = document.querySelectorAll(".btn-comprar");
if (botonesComprar.length > 0) {
  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const producto = {
        nombre: e.target.dataset.nombre,
        precio: e.target.dataset.precio,
      };
      agregarAlCarrito(producto);
    });
  });
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito(); // Actualiza la vista del carrito al cargar la página
});


// Función para mostrar los productos en la página de finalizar compra
function mostrarProductosCompra() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productosDiv = document.getElementById('productos-compra');
    productosDiv.innerHTML = '';  // Limpiar cualquier contenido previo

    if (carrito.length > 0) {
        carrito.forEach(producto => {
            let precioFormateado = producto.precio.toLocaleString('es-AR');
            let productoHTML = `
                <div class="producto">
                    <p>Nombre: ${producto.nombre}</p>
                    <p>Precio: $${precioFormateado}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
            `;
            productosDiv.innerHTML += productoHTML;
        });
    } else {
        productosDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
}

// Llamar a la función cuando la página se cargue
document.addEventListener('DOMContentLoaded', mostrarProductosCompra);

// Función para borrar el carrito después de la compra
document.getElementById('formulario-compra').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar la acción predeterminada del formulario

    // Limpiar el carrito
    localStorage.removeItem('carrito');

    alert('¡Compra realizada con éxito!');

    // Redirigir a una página de agradecimiento o inicio
    window.location.href = 'index.html';  // Redirige a la página principal
});
