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

// hashing universal
import UniversalHashing from './algs/hashing-universal.js';
import HashingUniversalRaw from './algs/hashing-universal.js?raw';

// árvore AVL
import AVLTree from './algs/arvore-avl.js';
import AVLTreeRaw from './algs/arvore-avl.js?raw';

// sondagem linear
import LinearProbingHash from './algs/sondagem-linear.js';
import LinearProbingHashRaw from './algs/sondagem-linear.js?raw';
// duplo hashing
import DoubleHashingHashTable from './algs/duplo-hashing.js';
// encadeamento separado
import HashTableChaining from './algs/encadeamento-separado.js';
// move-to-front
import MoveToFrontList from './algs/move-to-front.js';
import MoveToFrontListRaw from './algs/move-to-front.js?raw';

// transpose
import { TransposeList, transpose } from './algs/transpose.js';
import TransposeRaw from './algs/transpose.js?raw';

// skip list
import SkipList from './algs/skip-list.js';
import SkipListRaw from './algs/skip-list.js?raw';

// árvore B
import BTreeSearch from './algs/busca-em-arvove-b.js';
import BTreeSearchRaw from './algs/busca-em-arvove-b.js?raw';

// árvore de fibonacci
import FibonacciTree from './algs/arvore-de-fibonacci.js';
import FibonacciTreeRaw from './algs/arvore-de-fibonacci.js?raw';

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

const blocks = [
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
  {
    title: 'Hashing Universal',
    description: 'A hashing universal é uma técnica que utiliza funções de hash aleatórias para minimizar colisões, garantindo que a probabilidade de colisão entre chaves seja baixa, mesmo em conjuntos de dados grandes.',
    funcs: [
      {
        title: "Hashing Universal",
        func: () => {
          const hashTable = new UniversalHashing(10, 97);
          console.log(hashTable.hash(42)); // Saída: um índice entre 0 e 9
        },
      }
    ],
    raw: HashingUniversalRaw,
  },
  {
    title: 'Árvore AVL',
    description: 'A árvore AVL é uma estrutura de dados de árvore binária balanceada que garante operações de busca, inserção e remoção em tempo logarítmico, mantendo o balanceamento através de rotações.',
    funcs: [
      {
        title: "Árvore AVL",
        func: () => {
          const avl = new AVLTree();
          let root = null;
          root = avl.insert(root, 10);
          root = avl.insert(root, 20);
          root = avl.insert(root, 30);

          avl.inorder(root);
        },
      }
    ],
    raw: AVLTreeRaw,
  },
  {
    title: 'Comparação de Estratégias de Resolução de Colisão',
    description: 'A comparação de estratégias de resolução de colisão em tabelas hash envolve analisar diferentes métodos, como encadeamento e endereçamento aberto, para determinar qual abordagem oferece melhor desempenho em termos de tempo de busca e eficiência de espaço.',
    funcs: [
      {
        title: "Sondagem Linear",
        func: () => {
          const hash = new LinearProbingHash();

          hash.set("apple", 100);
          hash.set("banana", 200);
          hash.set("grape", 300);

          console.log(hash.get("banana")); // 200
          console.log(hash.has("grape")); // true
          console.log(hash.has("orange")); // false
        },
      },
      {
        title: "Duplo Hashing",
        func: () => {
          const hashTable = new DoubleHashingHashTable(7);

          hashTable.insert(10, "Value1");
          hashTable.insert(20, "Value2");
          hashTable.insert(15, "Value3");

          console.log(hashTable.get(10)); // Output: Value1
          console.log(hashTable.get(20)); // Output: Value2
          console.log(hashTable.get(15)); // Output: Value3
          console.log(hashTable.get(99)); // Output: null
        },
      },
      {
        title: "Encadeamento Separado",
        func: () => {
          const hashChain = new HashTableChaining(10);
          hashChain.insert(15, "A");
          hashChain.insert(25, "B");
          hashChain.display();
        },
      }
    ],
    raw: LinearProbingHashRaw,
  },
  {
    title: 'Move-to-Front',
    description: 'O algoritmo Move-to-Front é uma técnica de otimização que move um elemento acessado recentemente para o início de uma lista, melhorando o desempenho em acessos subsequentes.',
    funcs: [
      {
        title: "Move-to-Front",
        func: () => {
          const mtfList = new MoveToFrontList();
          mtfList.insert(1);
          mtfList.insert(2);
          mtfList.insert(3);
          mtfList.insert(4);
          mtfList.insert(5);

          console.log("Antes da busca:");
          mtfList.display();

          mtfList.search(4);

          console.log("Depois da busca (4 movido para frente):");
          mtfList.display();
        },
      }
    ],
    raw: MoveToFrontListRaw,
  },
  {
    title: 'Transpose',
    description: 'O algoritmo Transpose é uma técnica de otimização que troca a posição de um elemento acessado recentemente com o elemento anterior, melhorando o desempenho em acessos subsequentes.',
    funcs: [
      {
        title: "Transpose",
        func: () => {
          // 🔹 Exemplo de Uso - Lista Encadeada
          const tList = new TransposeList();
          tList.insert(1);
          tList.insert(2);
          tList.insert(3);
          tList.insert(4);
          tList.insert(5);

          console.log("\n🔹 Antes da busca na Lista Encadeada:");
          tList.display();

          tList.search(4);

          console.log("\n🔹 Depois da busca (4 movido para frente):");
          tList.display();

          // 🔹 Exemplo de Uso - Array
          const lista = [1, 2, 3, 4, 5];

          console.log("\n🔹 Antes da transposição no Array:", lista);
          transpose(lista, 4);
          console.log("\n🔹 Depois da transposição no Array:", lista);
        },
      }
    ],
    raw: TransposeRaw,
  },
  {
    title: 'Árvore AVL',
    description: 'A árvore AVL é uma estrutura de dados de árvore binária balanceada que garante operações de busca, inserção e remoção em tempo logarítmico, mantendo o balanceamento através de rotações.',
    funcs: [
      {
        title: "Árvore AVL",
        func: () => {
          const avl = new AVLTree();
          let root = null;
          root = avl.insert(root, 10);
          root = avl.insert(root, 20);
          root = avl.insert(root, 30);

          avl.inorder(root);
        },
      }
    ],
    raw: AVLTreeRaw,
  },
  {
    title: 'SkipList',
    description: 'A SkipList é uma estrutura de dados probabilística que permite buscas rápidas em listas encadeadas, utilizando múltiplos níveis de listas para otimizar o tempo de busca.',
    funcs: [
      {
        title: "SkipList",
        func: () => {
          const skipList = new SkipList(3, 0.5);

          skipList.insert(3);
          skipList.insert(7);
          skipList.insert(9);

          console.log("Buscar 7:", skipList.search(7) ? "Encontrado" : "Não encontrado");
          console.log("Buscar 5:", skipList.search(5) ? "Encontrado" : "Não encontrado");
        },
      }
    ],
    raw: SkipListRaw,
  },
  {
    title: 'Busca em Árvore B',
    description: 'A Busca em Árvore B é um algoritmo de busca eficiente em estruturas de dados de árvore balanceada, permitindo operações rápidas de inserção, remoção e busca em grandes conjuntos de dados.',
    funcs: [
      {
        title: "Busca em Árvore B",
        func: () => {
          // Exemplo de uso
          const btSearch = new BTreeSearch(2);
          const root = btSearch.root;
          root.keys = [10, 20, 30]; // Inserindo manualmente

          console.log(
            "Busca pelo 20:",
            btSearch.search(root, 20) ? "Encontrado" : "Não encontrado"
          ); // True
          console.log(
            "Busca pelo 50:",
            btSearch.search(root, 50) ? "Encontrado" : "Não encontrado"
          ); // False
        },
      }
    ],
    raw: BTreeSearchRaw,
  },
  {
    title: 'Árvore de Fibonacci',
    description: 'A Árvore de Fibonacci é uma estrutura de dados que representa números de Fibonacci em forma de árvore binária, permitindo operações eficientes de busca e inserção.',
    funcs: [
      {
        title: "Árvore de Fibonacci",
        func: () => {
          const fibTree = new FibonacciTree();
          fibTree.root = fibTree.buildTree(6);
        },
      }
    ],
    raw: FibonacciTreeRaw,
  },
]

function ExecuteBenchmark({ block }) {
  const [open, setOpen] = React.useState(false);
  const [chartData, setChatData] = React.useState([]);

  const handleOpen = () => {
    const data = [
      ["Tipo", "Tempo de execução", { role: "style" }],
      ...block.funcs.map((func) => {
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
          <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>Para visualizar o resultado veja o console.</Typography>
          <Chart chartType="ColumnChart" width="100%" height="100%" data={chartData} />
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align='center' sx={{ mt: 4, mb: 2 }}>
        Knuth Project
      </Typography>
      <Typography align='center' sx={{ color: 'text.secondary', mb: 4 }}>
        Alunos: Priscila Moura, Murilo Bahia e Humberto.
      </Typography>
      {blocks.map((block, index) => (
        <Card variant="outlined" sx={{ mt: 2, mb: 2 }} key={index}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {block.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>Descrição</Typography>
            <Typography variant="body2">
              {block.description}
            </Typography>
            <Box>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px solid', padding: 8 }}>
                {block.raw}
              </pre>
            </Box>
          </CardContent>
          <CardActions>
            <ExecuteBenchmark block={block} />
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
