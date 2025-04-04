import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Chart } from "react-google-charts";

// busca binária
import buscaBinaria from './algs/busca-binaria-padrao.js';
import buscaBinariaRaw from './algs/busca-binaria-padrao.js?raw';
import buscaBinariaOtimizada from './algs/busca-binaria-otimizada.js';

// hashing perfeito
import HashingSemKnuth from './algs/hashing-sem-knuth.js';
import HashingComKnuthPerfeito from './algs/hashing-com-knuth-perfeito.js';
import HashingComKnuthPerfeitoRaw from './algs/hashing-com-knuth-perfeito.js?raw';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function benchmark(func, entries, value) {
  const start = performance.now();
  func(entries, value);
  const end = performance.now();

  return end - start;
}

const blocs = [
  {
    title: 'Busca Binária',
    description: 'A busca binária é um algoritmo eficiente para encontrar um elemento em uma lista ordenada, dividindo repetidamente o espaço de busca pela metade até localizar o elemento desejado ou determinar que ele não está presente.',
    funcs: [
      {
        title: "Busca Binária",
        func: () => buscaBinaria([1, 2, 3, 4, 5, 6, 7, 8, 9], 9),
      },
      {
        title: "Busca Binária Otimizada",
        func: () => buscaBinariaOtimizada([1, 2, 3, 4, 5, 6, 7, 8, 9], 9),
      }
    ],
    raw: buscaBinariaRaw,
  },
  {
    title: 'Hashing Perfeito',
    description: 'O hashing perfeito é uma técnica que busca criar uma função de hash que mapeie um conjunto de chaves para um espaço de hash sem colisões, permitindo acesso constante a dados.',
    funcs: [
      {
        title: "Hashing Sem Knuth",
        func: () => {
          const hash = new HashingSemKnuth();

          hash.set("nome", "João");
          hash.set("idade", 30);
          hash.set("profissao", "Dev");

          hash.get("nome");
          hash.get("idade");
          hash.has("profissao");
          hash.get("inexistente");
        },
      },
      {
        title: "Hashing Com Knuth Perfeito",
        func: () => {
          const chaves = ["banana", "uva", "laranja", "abacaxi", "kiwi"];
          const hashPerfeito = new HashingComKnuthPerfeito(chaves);

          console.log(hashPerfeito.getTable());
          console.log(hashPerfeito.has("banana"));  // true
          console.log(hashPerfeito.has("melancia")); // false
        },
      }
    ],
    raw: HashingComKnuthPerfeitoRaw,
  },
]

function ExecuteBenchmark({ bloc }) {
  const [open, setOpen] = React.useState(false);
  const [chartData, setChatData] = React.useState([]);

  const handleOpen = () => {
    const data = [
      ["Tipo", "Tempo de execução", { role: "style" }],
      ...bloc.funcs.map((func) => {
        const time = benchmark(func.func, func.entries, func.target);
        return [func.title, time, generateRandomColor()];
      }),
    ];

    setChatData(data);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Executar Benchmark</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Resultado do benchmark em ms
          </Typography>
          <Chart chartType="ColumnChart" width="100%" height="100%" data={chartData} />
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default function App() {
  return (
    <Container maxWidth="md">
      {blocs.map((bloc, index) => (
        <Card variant="outlined" sx={{ mt: 2, mb: 2 }} key={index}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {bloc.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>Descrição</Typography>
            <Typography variant="body2">
              {bloc.description}
            </Typography>
            <Box>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px solid', padding: 8 }}>
                {bloc.raw}
              </pre>
            </Box>
          </CardContent>
          <CardActions>
            <ExecuteBenchmark bloc={bloc} />
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
