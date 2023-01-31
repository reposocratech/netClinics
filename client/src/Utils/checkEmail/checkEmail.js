//------------------------------------------------------------
//FUNCION PARA VALIDAR EMAIL
export const emailValidator = (email) => {
  let isMail = false;
  let validator = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,8})$/;
  if (validator.test(email)) {
    isMail = true;
  }

  return isMail;
};

//------------------------------------------------------------
