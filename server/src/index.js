const express = require('express');
// const cors = require('cors');
const multipart = require('connect-multiparty');

const app = express();
app.set('port', process.env.PORT || 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, res, req, next) => res.json({ error: err.message }));

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }; server\uploads
// app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './server/uploads' });
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.get('/downloadExcel', (req, res) => {
  res.download('./server/uploads/report.xlsx');
});

app.get('/downloadPDF', (req, res) => {
  res.download('./server/uploads/report.pdf');
});

app.listen(app.get('port'), () => {
  console.log('Servidor rodando na porta', app.get('port'));
});
