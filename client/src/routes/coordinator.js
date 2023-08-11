export const goToLogin = (navigate) => {
    navigate('/');
  };
  
  export const goToSignUp = (navigate) => {
    navigate('/cadastro');
  };

  export const goToRecoverPassword = (navigate) => {
    navigate('/recuperar-senha');
  };

  export const goToHome = (navigate) => {
    navigate('/home');
  };

  export const goToProfile = (navigate) => {
    navigate('/profile');
  };

  export const goToLastPage = (navigate) => {
    navigate.goBack();
  };