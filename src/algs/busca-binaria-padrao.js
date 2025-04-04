export default function buscaBinaria(array, alvo) {
  let inicio = 0;
  let fim = array.length - 1;

  while (inicio <= fim) {
    let meio = Math.floor((inicio + fim) / 2);
    if (array[meio] === alvo) {
      return meio; // Retorna o índice do elemento encontrado
    } else if (array[meio] < alvo) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  return -1; // Retorna -1 se o elemento não for encontrado
}
