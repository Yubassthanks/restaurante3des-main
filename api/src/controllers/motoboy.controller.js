const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const data = req.body;
    const motoboy = await prisma.motoboy.create({
        data: data
    });
    return res.status(201).json(motoboy).end();
}

const read = async (req, res) => {
    if (req.params.id) {
        const id = parseInt(req.params.id);
        const motoboy = await prisma.motoboy.findUnique({
            where: {
                id: id
            }
        });
        return res.json(motoboy);
    } else {
        const motoboy = await prisma.motoboy.findMany();
        return res.json(motoboy);
    }
}

const update = async (req, res) => {
    try {
        const data = req.body;
        let motoboy = await prisma.motoboy.update({
            data: data,
            where: {
                id: parseInt(req.body.id)
            }
        });
        res.status(202).json(motoboy).end();
    } catch (error) {
        res.status(404).json({ error: error.message }).end();
    }
}

const del = async (req, res) => {
    try {
        const motoboyId = parseInt(req.params.id);
        
        // Verifique se existem pedidos relacionados ao motoboy
        const pedidosRelacionados = await prisma.pedido.findMany({
            where: {
                motoboyId: motoboyId,
            },
        });

        if (pedidosRelacionados.length > 0) {
            // Você pode optar por excluir os pedidos relacionados aqui
            // ou atualizar as referências de chave estrangeira, dependendo da sua lógica de negócios

            // Exemplo de exclusão de pedidos relacionados
            await prisma.pedido.deleteMany({
                where: {
                    motoboyId: motoboyId,
                },
            });
        }

        // Agora você pode excluir o motoboy
        await prisma.motoboy.delete({
            where: {
                id: motoboyId,
            },
        });

        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: error.message }).end();
    }
}


module.exports = {
    read,
    create,
    update,
    del
};