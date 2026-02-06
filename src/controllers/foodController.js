import * as foodModel from '../models/foodModel.js';

export const getAll = async (req, res) => {
    try {
        const food = await foodModel.findAll(req.query);

        if (!food || food.length === 0) {
            return res.status(200).json({
                message: 'Nenhum registro encontrado.',
                food
            });
        }
        res.json(food);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};

export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        const { name, description, price, category, available} = req.body;

        if (!name) return res.status(400).json({ error: 'O nome (name) é obrigatório!' });

        if (!description) return res.status(400).json({ error: 'A descrição (description) é obrigatória!' });

        if (!price) return res.status(400).json({ error: 'O preço (price) obrigatório!' });

        if (!category) return res.status(400).json({
            error:'A categoria (categoria) é obrigatória'
        })
        if (available == undefined)

            return res.status(400).json({ error: `E obrigatório a Disponibilidade` })

        const food = await foodModel.create({
            name,
            description,
            price: parseInt(price),
            category,
            available
        });

        res.status(201).json({
            message: 'Comida cadastrada com sucesso!',
            food,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar a comida.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ food });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar comida' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const existe = await model.findById(id);
        if (!existe) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `O registro "${data.name}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const comidaExiste = await model.findById(id);
        if (!comidaExiste) {
            return res.status(404).json({ error: 'Comida não encontrada para deletar.' });
        }

        await model.remove(id);
        res.json({
            message: `O registro "${comidaExiste.name}" foi deletado com sucesso!`,
            deletado: comidaExiste,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
};
