
const {Client}=require("pg");


class ClienteController{
  async index(){
    try{
      const client = new Client({
        connectionString:process.env.DATABASE_URL,
        ssl:{
          rejectUnauthorized:false
        },
      });
      client.connect();
      const result = await client.query("SELECT * FROM public.clientes;");
      client.end();
      const results = result.rows;
      return results;
    }catch(err){
      return response.json(err)
    }
  }
}

module.exports = ClienteController;

/*clienteRouter.get("/", async (req, res) => {
  const result = await runQuery("SELECT id_clientes, nome_clientes, telefone FROM public.clientes;", null);
  res.json(result);
});

clienteRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("SELECT * FROM public.clientes WHERE id_clientes = $1", [id]);
  res.json(result);
});

clienteRouter.post("/", async (req, res) => {
  const { nome } = req.body;
  const { telefone } = req.body;

  const result = await runQuery("INSERT INTO public.clientes (nome_clientes, telefone) VALUES($1,$2);", [nome, telefone]);
  res.json(result);
});

clienteRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("DELETE FROM public.clientes WHERE id_clientes=$1", [id]);
  res.json(result);
});

clienteRouter.patch("/:id", async (req, res) => {
  const { nome, telefone } = req.body;
  const { id } = req.params;
  const result = await runQuery("UPDATE public.clientes SET nome_clientes=$1, telefone=$2 WHERE id_clientes=$3;", [nome, telefone, id]);
  res.json(result);
});

module.exports = clienteRouter;*/