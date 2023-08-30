var produtos = [];
const pedido = {
    produtos: [],
};

api.get("/motoboy")
    .then(resp => {
        produtos = resp.data;
    })
    .then(() => {
        listarMotoboy();
    })
    .catch(err => {
        console.log(err);
    });

    const listarMotoboy = () => {
        const corpo = document.querySelector("#tcorpo");
        produtos.forEach((p, i) => {
            let motoboy = document.createElement("tr");        
            
            motoboy.innerHTML = `
            <td data-label="Id Motoboy:">${p.id}</td>
            <td data-label="Nome Motoboy:">${p.nome}</td>
            <td data-label="Placa Moto:">${p.placa}</td>
            <td data-label="Modelo Moto:">${p.modelo}</td>
            <td data-label="Excluir:"><button onclick="excluir(${p.id})">-</button></td>
            <td data-label="Alterar:"><button onclick="alterar(${p.id})">-</button></td>
            `;
            corpo.appendChild(motoboy);
        })
            
    }
    const excluir = (id) => {
        if (confirm(`Deseja excluir o motoboy ${id} ?`)) {
            api.delete(`/motoboy/${id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const alterar = (id) => {
        if (confirm(`Alterar os dados do motoboy ${id} ?`)) {
            api.put(`/motoboy/${id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
