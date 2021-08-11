const {Client}=require("pg");
const bcrypt = require('bcryptjs')

class LoginController{
  async index(){
    try{
      const client = new Client({
        connectionString:process.env.DATABASE_URL,
        ssl:{
          rejectUnauthorized: false
        },  
      });
      client.connect();
      const result = await client.query("SELECT * FROM public.usuarios;");
      client.end();
      const results = result.rows;
      return results;
    }catch(err){
      console.error(err)
      return res.json(err)
    }
  }
  
  async create(email,senha){
    try{
      const client = new Client({
        connectionString:process.env.DATABASE_URL,
        ssl:{
          rejectUnauthorized:false
        },
      });
      client.connect();

//hash de senha
     var salt = brycpt.genSaltSync(10);
     var hash = bcrypt.hashSync(senha,salt);
     //senha = hash;
      const result = await client.query("INSERT INTO public.usuarios (email,senha) VALUES($1, $2);",
      [email,hash]);
      client.end();
      const results = result.rows;
      const response = {
        message:"cadastrado"
      }
      return response;
    }catch(err){
      console.error(err)
      const response={
        message:"Erro ao cadastar cliente"
      }
      return response;
    }
  }

  async delete(id){
    try{
      const client = new Client({
        connectionString:process.env.DATABASE_URL,
        ssl:{
          rejectUnauthorized:false
        },
      });
      client.connect();
      const result = await client.query("DELETE FROM public.usuarios WHERE id=$1", [id]);
      client.end();
      const results = result.rows;
      return results;
    }catch(err){
      console.error(err)
      const response={
        message:"erro ao deletar"
      }
      return response
    }
  }

  async getId(id){
    try{
      const client = new Client({
        connectionString:process.env.DATABASE_URL,
        ssl:{
          rejectUnauthorized:false
        }, 
      });
      client.connect();
      const result = await client.query("SELECT * FROM public.usuarios WHERE id=$1", [id]);
      client.end();
      const results = result.rows;
      return results;
    }catch(err){
      console.error(err)
      return res.json(err)
    }
  }

  async update(email,password){
    try{
      const client = new Client({
        connectionString:process.env.DATABASE_URL,
        ssl:{
          rejectUnauthorized:false
        },
      });
      client.connect();
      const result = await client.query("UPDATE public.usuarios SET email=$1, password=$2 WHERE id=$3;",[email,password,id]);
      client.end();
      const results = result.rows;
      const response = {
        message:"editado"
      }
      return response;
    }catch(err){
      console.error(err)
      const response={
        message:"erro"
      }
      return response;
    }
  }
}

module.exports = LoginController;

