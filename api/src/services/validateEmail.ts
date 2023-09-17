export const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      const error = new Error("E-mail inválido");
      (error as any).status = 422;
      throw error;
    }
  };
  