export default function buscaBinariaOtimizada(array, alvo) {
  let inicio = 0;
  let fim = array.length;

  while (inicio < fim) {
    // Usa deslocamento de bits para dividir por 2, mais rápido que Math.floor
    const meio = inicio + ((fim - inicio) >> 1);

    if (array[meio] < alvo) {
      inicio = meio + 1;
    } else {
      fim = meio;
    }
  }

  // Verifica se encontrou o alvo
  if (inicio < array.length && array[inicio] === alvo) {
    return inicio;
  }

  return -1;
}
