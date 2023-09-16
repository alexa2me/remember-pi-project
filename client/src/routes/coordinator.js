export const goToLogin = (navigate) => {
    navigate('/');
  };
  
  export const goToSignUp = (navigate) => {
    navigate('/cadastro');
  };

  export const goToRecoverPassword = (navigate) => {
    navigate('/recuperar-senha');
  };

  export const goToWritePage = (navigate) => {
    navigate('/escrever');
  };

  export const goToProfile = (navigate) => {
    navigate('/perfil');
  };

  export const goToPostList = (navigate) => {
    navigate('/historico');
  };

  export const goToMyPosts = (navigate) => {
    navigate('/meus-posts');
  };

  export const goToLastPage = (navigate) => {
    navigate.goBack();
  };