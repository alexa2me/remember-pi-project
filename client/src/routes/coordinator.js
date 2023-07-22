export const goToLogin = (navigate) => {
    navigate('/');
  };
  
  export const goToSignUp = (navigate) => {
    navigate('/cadastro');
  };

  export const goToHome = (navigate) => {
    navigate('/home');
  };

  export const goToLastPage = (navigate) => {
    navigate.goBack();
  };