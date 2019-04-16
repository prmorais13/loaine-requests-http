const express = require('express');
const cors = require('cors');
const multipart = require('connect-multiparty');

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const multipartMiddleware = multipart({ uploadDir: './uploads' });
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.use((err, res, req, next) => res, json({ error: err.message }));

app.listen(app.get('port'), () => {
  console.log('Servidor rodando na porta', app.get('port'));
});
