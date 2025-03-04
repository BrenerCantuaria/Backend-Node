import app from './src/app';

const port = 3003;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + CLIQUE em http://localhost:${port}`);
});
