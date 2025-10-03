import { BD } from "../db.js";

class rotasSubCategorias {
    static async novaSubCategoria(req, res) {
        const { nome, id_categoria } = req.body;

        if (!nome || !id_categoria) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        try {
            await BD.query(
                `INSERT INTO subcategorias (nome, id_categoria) VALUES ($1, $2) RETURNING *`,
                [nome, id_categoria]
            );
            res.status(201).json("Sub-Categoria Cadastrada");
        } catch (error) {
            console.error("Erro ao criar sub-categoria:", error);
            res.status(500).json({ message: "Erro ao criar sub-categoria", error: error.message });
        }
    }

    static async listarSubCategorias(req, res) {
        try {
            const subcategorias = await BD.query(`
                SELECT sct.*, ct.nome AS nome_categoria 
                FROM subcategorias AS sct
                LEFT JOIN categorias ct ON sct.id_categoria = ct.id_categoria
                ORDER BY sct.id_subcategoria
            `);
            res.status(200).json(subcategorias.rows);
        } catch (error) {
            console.error("Erro ao listar sub-categorias:", error);
            res.status(500).json({ message: "Erro ao listar sub-categorias", error: error.message });
        }
    }

    static async deletarSubCategoria(req, res) {
        const { id } = req.params;
        try {
            await BD.query(
                `UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1`,
                [id]
            );
            return res.status(200).json({ message: "Sub-Categoria desativada com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar sub-categoria:", error);
            res.status(500).json({ message: "Erro ao deletar sub-categoria", error: error.message });
        }
    }

    static async consultaPorId(req, res) {
        const { id } = req.params;
        try {
            const subcategoria = await BD.query(
                `SELECT * FROM subcategorias 
                 WHERE id_categoria = $1 AND ativo = true 
                 ORDER BY nome`,
                [id]
            );
            return res.status(200).json(subcategoria.rows);
        } catch (error) {
            console.error("Erro ao consultar sub-categoria:", error);
            res.status(500).json({ message: "Erro ao consultar sub-categoria", error: error.message });
        }
    }

    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, id_categoria } = req.body;
        try {
            const subcategoria = await BD.query(
                `UPDATE subcategorias 
                 SET nome = $1, id_categoria = $2 
                 WHERE id_subcategoria = $3 RETURNING *`,
                [nome, id_categoria, id]
            );
            return res.status(200).json(subcategoria.rows[0]);
        } catch (error) {
            console.error("Erro ao atualizar sub-categoria:", error);
            res.status(500).json({ message: "Erro ao atualizar sub-categoria", error: error.message });
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, id_categoria } = req.body;

        try {
            const campos = [];
            const valores = [];

            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`);
                valores.push(nome);
            }
            if (id_categoria !== undefined) {
                campos.push(`id_categoria = $${valores.length + 1}`);
                valores.push(id_categoria);
            }

            if (campos.length === 0) {
                return res.status(400).json({ message: "Nenhum campo para atualizar foi fornecido." });
            }

            valores.push(id); // adiciona id no final
            const query = `UPDATE subcategorias SET ${campos.join(", ")} 
                           WHERE id_subcategoria = $${valores.length} RETURNING *`;

            const subcategoria = await BD.query(query, valores);

            if (subcategoria.rows.length === 0) {
                return res.status(404).json({ message: "Sub-Categoria não encontrada" });
            }

            return res.status(200).json(subcategoria.rows[0]);
        } catch (error) {
            console.error("Erro ao atualizar sub-categoria:", error);
            res.status(500).json({ message: "Erro ao atualizar sub-categoria", error: error.message });
        }
    }
}

export default rotasSubCategorias;
