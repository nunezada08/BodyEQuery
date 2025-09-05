import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais } = dados

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.get('/varinhas', (req, res) => {
    const { material, nucleo } = req.query;
    let resultado = varinhas;
  
    if (material) {
      resultado = resultado.filter(v => v.material.toLowerCase() === material.toLowerCase());
    }
  
    if (nucleo) {
      resultado = resultado.filter(v => v.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.get('/pocoes', (req, res) => {
    const { nome, efeito } = req.query;
    let resultado = pocoes;
  
    if (nome) {
      resultado = resultado.filter(p => p.nome.toLowerCase() === nome.toLowerCase());
    }
  
    if (efeito) {
      resultado = resultado.filter(p => p.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.get('/animais', (req, res) => {
    const { tipo, nome } = req.query;
    let resultado = animais;
  
    if (nome) {
      resultado = resultado.filter(a => a.nome.toLowerCase() === nome.toLowerCase());
    }
  
    if (tipo) {
      resultado = resultado.filter(a => a.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome, varinha, mascote, patrono, vivo } = req.body;
     if (!nome || !casa) {
      res.status(400).json ({
        sucess:false,
        message: "Nome e casa são obrigatorios para um bruxo",
      });
     }

     const novoBruxo = {
      id: bruxos.length + 1,
      nome,
      casa: casa,
      ano: parseInt(ano),
      varinha: varinha,
      mascote,
      patrono,
      especialidade: especialidade || "ainda nao atribuido",
      vivo: vivo
     }

});


app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});