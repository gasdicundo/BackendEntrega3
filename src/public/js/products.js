document.querySelectorAll('.botonAgregarCarrito').forEach(button => {
    button.addEventListener('click', async () => {
        let pid = button.dataset.pid;
        let cid = button.dataset.cid;

        if (!cid) {
            try {
                const response = await fetch(`/api/users/user-cart`, {
                    method: 'GET',
                });
                const data = await response.json();
                cid = data.cid;
            } catch (error) {
                console.error(error);
            }
        }

        if (!cid) {
            try {
                const response = await fetch(`/api/carts`, {
                    method: 'POST',
                });
                const data = await response.json();
                cid = data.cid;

                await fetch(`/api/users/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cart: cid })
                });
                console.log('Usuario actualizado con éxito');

                agregarProductoAlCarrito(cid, pid);
            } catch (error) {
                console.error('Error al crear el carrito:', error);
            }
        } else {
            agregarProductoAlCarrito(cid, pid);
        }
    });
});

function agregarProductoAlCarrito(cid, pid) {
    fetch(`/api/carts/${cid}/products/${pid}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title: 'Producto agregado correctamente',
        });
    })
    .catch(error => {
        console.error('Error al cancelar la compra:', error);
    });
}
