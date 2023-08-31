var produtos = [];
var motoboyEmEdicao; // Variável para armazenar o motoboy em edição

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
        <td data-label="Excluir:"><button onclick="excluir(${p.id})">X</button></td>
        <td data-label="Editar:"><button onclick="abrirModal(${p.id})">Editar</button></td>

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

const abrirModal = (id) => {
    const buttonSalvar = document.getElementById('salvarAlteracoes');
    buttonSalvar.setAttribute('data-id', id);
    const motoboyEmEdicao = produtos.find((motoboy) => motoboy.id === id);

    if (motoboyEmEdicao) {
        document.getElementById('nomeMotoboy').value = motoboyEmEdicao.nome;
        document.getElementById('placaMotoboy').value = motoboyEmEdicao.placa;
        document.getElementById('modeloMotoboy').value = motoboyEmEdicao.modelo;
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    } else {
        console.error('Motoboy não encontrado.');
    }
}


const fecharModal = () => {
    // Limpe os campos do modal
    document.getElementById('nomeMotoboy').value = '';
    document.getElementById('placaMotoboy').value = '';
    document.getElementById('modeloMotoboy').value = '';

    // Oculte o modal
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}


const salvarAlteracoes = () => {
    const id = document.getElementById('salvarAlteracoes').getAttribute('data-id');

    const novoNome = document.getElementById('nomeMotoboy').value;
    const novaPlaca = document.getElementById('placaMotoboy').value;
    const novoModelo = document.getElementById('modeloMotoboy').value;

    api.put(`/motoboy/${id}`, {
        nome: novoNome,
        placa: novaPlaca,
        modelo: novoModelo
    })
    .then(() => {
        fecharModal();
    })
    .then(() => {
        fecharModal();
        location.reload(); // Isso irá recarregar a página após o sucesso da solicitação
    })
    .catch(err => {
        console.log(err);
    });
    
}
