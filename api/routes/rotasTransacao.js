import { BD } from "../db.js";

class rotasTransacao {
  static async novaTransacao(req, res) {
    const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario } = req.body;
    try {
      const transacao = await BD.query(`
        INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `, [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario]);

      res.status(201).json(transacao.rows[0]);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      res.status(500).json({ message: "Erro ao criar transação", error: error.message });
    }
  }

  static async dadosDashboard(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;

      const kpisQuery = `
        SELECT
          COALESCE(SUM(CASE WHEN tipo_transacao = 'ENTRADA' THEN valor ELSE 0 END), 0) AS receitas,
          COALESCE(SUM(CASE WHEN tipo_transacao = 'SAIDA' THEN valor ELSE 0 END), 0) AS despesas
        FROM transacoes
        WHERE data_vencimento BETWEEN $1 AND $2;
      `;

      const categoriasQuery = ` 
        SELECT c.nome, SUM(t.valor)::float AS valor
        FROM transacoes AS t 
        INNER JOIN categorias AS c ON t.id_categoria = c.id_categoria
        WHERE t.data_vencimento BETWEEN $1 AND $2
        GROUP BY c.nome
        ORDER BY valor DESC;
      `;

      const subcategoriasQuery = ` 
        SELECT s.nome, SUM(t.valor)::float AS valor
        FROM transacoes AS t 
        INNER JOIN subcategorias AS s ON t.id_subcategoria = s.id_subcategoria
        WHERE t.data_vencimento BETWEEN $1 AND $2
        GROUP BY s.nome
        ORDER BY valor DESC;
      `;

      const vencimentoQuery = `
        SELECT t.valor, t.data_vencimento, t.descricao, sct.nome AS nome_subcategoria, ct.icone, ct.cor
        FROM transacoes AS t 
        JOIN categorias ct ON t.id_categoria = ct.id_categoria
        JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
        WHERE t.data_vencimento BETWEEN $1 AND $2 AND t.data_pagamento IS NULL
        ORDER BY t.data_vencimento;
      `;

      const evolucao6mesesQuery = `
        SELECT
          TO_CHAR(t.data_vencimento, 'MM/YYYY') AS mes,
          SUM(CASE WHEN t.tipo_transacao = 'ENTRADA' THEN t.valor ELSE 0 END) AS total_receitas,
          SUM(CASE WHEN t.tipo_transacao = 'SAIDA' THEN t.valor ELSE 0 END) AS total_despesas
        FROM transacoes AS t
        JOIN categorias ct ON t.id_categoria = ct.id_categoria
        JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
        WHERE t.data_vencimento >= (CURRENT_DATE - INTERVAL '6 months')
        GROUP BY TO_CHAR(t.data_vencimento, 'MM/YYYY')
        ORDER BY TO_DATE(TO_CHAR(t.data_vencimento, 'MM/YYYY'), 'MM/YYYY');
      `;

      const [kpis, categorias, subcategorias, vencimentos, evolucao6meses] = await Promise.all([
        BD.query(kpisQuery, [dataInicio, dataFim]),
        BD.query(categoriasQuery, [dataInicio, dataFim]),
        BD.query(subcategoriasQuery, [dataInicio, dataFim]),
        BD.query(vencimentoQuery, [dataInicio, dataFim]),
        BD.query(evolucao6mesesQuery)
      ]);

      res.status(200).json({
        kpis: kpis.rows[0],
        categorias: categorias.rows,
        subcategorias: subcategorias.rows,
        vencimentos: vencimentos.rows,
        evolucao6meses: evolucao6meses.rows
      });
    } catch (error) {
      console.error("Erro ao listar dados:", error);
      res.status(500).json({ message: "Erro ao listar dados", error: error.message });
    }
  }
}

export default rotasTransacao;