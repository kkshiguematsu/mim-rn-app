export const applyMask = (value: string, mask: string): string => {
  const numbers = value.replace(/\D/g, '');

  switch (mask) {
    case 'cpf':
      // XXX.XXX.XXX-XX
      const cpf = numbers.slice(0, 11);
      let formattedCpf = cpf;
      if (cpf.length >= 10) {
        formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
      } else if (cpf.length >= 7) {
        formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
      } else if (cpf.length >= 4) {
        formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
      }
      return formattedCpf;

    case 'phone':
      // (XX) XXXXX-XXXX
      const phone = numbers.slice(0, 11);
      let formattedPhone = phone;
      if (phone.length >= 7) {
        formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
      } else if (phone.length >= 3) {
        formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
      }
      return formattedPhone;

    case 'birthDate':
      // DD/MM/YYYY
      const birthDate = numbers.slice(0, 8);
      let formattedBirthDate = birthDate;
      if (birthDate.length >= 5) {
        formattedBirthDate = `${birthDate.slice(0, 2)}/${birthDate.slice(2, 4)}/${birthDate.slice(4, 8)}`;
      } else if (birthDate.length >= 3) {
        formattedBirthDate = `${birthDate.slice(0, 2)}/${birthDate.slice(2, 4)}`;
      }
      return formattedBirthDate;

    case 'expireDate':
      // MM/YY
      const expire = numbers.slice(0, 4);
      let formattedExpire = expire;
      if (expire.length >= 3) {
        formattedExpire = `${expire.slice(0, 2)}/${expire.slice(2, 4)}`;
      }
      return formattedExpire;

    case 'creditCard':
      // XXXX XXXX XXXX XXXX
      const limited = numbers.slice(0, 16);
      let formatted = limited;
      if (limited.length >= 13) {
        formatted = `${limited.slice(0, 4)} ${limited.slice(4, 8)} ${limited.slice(8, 12)} ${limited.slice(12)}`;
      } else if (limited.length >= 9) {
        formatted = `${limited.slice(0, 4)} ${limited.slice(4, 8)} ${limited.slice(8)}`;
      } else if (limited.length >= 5) {
        formatted = `${limited.slice(0, 4)} ${limited.slice(4)}`;
      }
      return formatted;

    default:
      return value;
  }
};
