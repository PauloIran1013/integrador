import knexdb from "./knex.js";
import express from 'express';
import cors from 'cors';
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Cachorro')
})
app.get('/usuarios',async (req,res) =>{
const usuarios = await knexdb ('usuarios').select('*')
res.status(200).json({usuarios})

})
app.post('/usuarios',async (req,res) =>{
  const{ AdotanteID,Nome, Email,Telefone, DataNascimento,Endereco,fucionario} = req.body
  const usuarios = await knexdb('usuarios').insert({ AdotanteID,Nome, Email,Telefone, DataNascimento,Endereco,fucionario})
  res.status(200).json({usuarios})
})


app.get('/usuarios/:AdotanteID', async (req,res)=>{
  const {AdotanteID} = req.params
  const usuarios = await knexdb ('usuarios').select('*').where({AdotanteID})
  if (usuarios == '') {
    res.send('Usuario não encontrado')
  }
  res.status(200).json({usuarios})
})
app.delete('/usuarios', async(req,res) =>{
  const {AdotanteID} = req.body
  const animaldel = await knexdb('usuarios').where({AdotanteID}).del()
  console.log(AdotanteID)
  res.send('Adeus parceiro!')
})

app.get('/animais', async (req,res) =>{
  const bicho = await knexdb ('bicho').select('*')
  res.status(200).json({bicho})
})

app.get('/animais/:animal_id', async (req,res) =>{
  const {animal_id} = req.params
  const bicho = await knexdb ('bicho').select('*').where({animal_id})
  if (bicho =="") {
    res.send('Animal não encontrado')
  }
  
  res.status(200).json({bicho})
})

app.post('/animais',async (req,res) =>{
  const {animal_id,raca,genero,idade,foto,vacinado,porte,disponivel} = req.body
  const bicho = await knexdb('bicho').insert({animal_id,raca,genero,idade,foto,vacinado,porte,disponivel})

  res.status(200).json({bicho})
})

app.delete('/animais', async(req,res) =>{
const {animal_id} = req.body
const bichodel = await knexdb ('bicho').where({animal_id}).del()
console.log(animal_id);
res.send('adeus pobre animal')
})


app.get('/adocoes', async(req,res)=>{
  const adotante = await knexdb ('Adocoes').select('*')
res.status(200).json({adotante})
})

app.get('/adocoes/:AdocaoID', async(req,res)=>{
  const {AdocaoID} = req.params
  const adocaoid = await knexdb ('Adocoes').select('*').where({AdocaoID})
  .join('bicho','Adocoes.animal_id','=','bicho.animal_id')
  .join('usuarios','Adocoes.AdotanteID','=','usuarios.AdotanteID')
  if(adocaoid == ''){
   res.send('Animal não encontrado')
  }

  res.status(200).json({adocaoid})
})

// app.post('/adocoes', async (req,res)=>{
//   const {} = req.body
//   const adocoespost = await knexdb('Adocoes').insert({})

//   res.status(200).json({adocoespost})
// })

app.delete('/adocoes', async(req,res)=>{
  const {AdocaoID} = req.body
  const adocaodel = await knexdb('Adocoes').where({AdocaoID}).del()
  res.send('Adeus')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
