export function cpfValidator(cpf: any) {
  let Soma = 0;
  // Verifica se a variável cpf é igual a "undefined", exibindo uma msg de erro
  if (cpf === undefined) {
    return false;
  }

  // Esta função retira os caracteres . e - da string do cpf, deixando apenas os números
  const strCPF = cpf.replace('.', '').replace('.', '').replace('-', '');
  // Testa as sequencias que possuem todos os dígitos iguais e, se o cpf não tem 11 dígitos, retorna falso e exibe uma msg de erro
  if (
    strCPF === '00000000000' ||
    strCPF === '11111111111' ||
    strCPF === '22222222222' ||
    strCPF === '33333333333' ||
    strCPF === '44444444444' ||
    strCPF === '55555555555' ||
    strCPF === '66666666666' ||
    strCPF === '77777777777' ||
    strCPF === '88888888888' ||
    strCPF === '99999999999' ||
    strCPF.length !== 11
  ) {
    return false;
  }

  // Os seis blocos seguintes de funções vão realizar a validação do CPF propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
  // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número para ser testado

  // Multiplica cada digito por numeros de 1 a 9, soma-os e multiplica-os por 10. Depois, divide o resultado encontrado por 11 para encontrar o resto
  for (let i = 1; i <= 9; i++) {
    Soma += Number(strCPF.substring(i - 1, i)) * (11 - i);
  }

  let Resto = (Soma * 10) % 11;
  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== Number(strCPF.substring(9, 10))) {
    return false;
  }

  Soma = 0;
  for (let k = 1; k <= 10; k++) {
    Soma += Number(strCPF.substring(k - 1, k)) * (12 - k);
  }

  Resto = (Soma * 10) % 11;
  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== Number(strCPF.substring(10, 11))) {
    return false;
  }

  return true;
}
