const containsLetterOrNumber = (str) => {
  return /[a-zA-Z0-9]/.test(str);
};

const hasReps = (str) => {
  const repsAllowed = 3;
  const regex = new RegExp(`(.)\\1{${repsAllowed},}`, "g");
  return regex.test(str);
};

const hasValidChar = (str) => {
  return /^[a-zA-Z0-9\s\-\:\,\(\)\!\?\&]+$/.test(str);
};

const urlPattern = (str) => {
  return /\.(jpg|jpeg|png)$/i.test(str);
};

export default (state, name) => {
  let errors = {};
  switch (name) {
    case "name":
      if (state.name === "") {
        errors.name = "Campo requerido.";
      } else if (!containsLetterOrNumber(state.name)) {
        errors.name = "Debe contener al menos una letra o número.";
      } else if (hasReps(state.name.toLowerCase())) {
        errors.name = "Nombre incorrecto, evita repeticiones.";
      } else if (state.name.trim().length < 3) {
        errors.name = `El nombre debe tener al menos ${3} caracteres.`;
      } else if (state.name.trim().length > 15) {
        errors.name = `El nombre no debe exceder los ${15} caracteres.`;
      } else if (!hasValidChar(state.name)) {
        errors.name =
          "El campo solo puede contener letras (a-z), números (0-9), espacios y los siguientes caracteres: ( : , () ! ? & ).";
      } else {
        errors.name = "";
      }
      break;
      case "description":
        if (state.description === "") {
          errors.description = "Campo requerido.";
        } else if (state.description.length < 30) {
          errors.description =
            "La descripción debe tener al menos 30 caracteres.";
        } else if (state.description.length > 1000) {
          errors.description =
            "La descripción no debe exceder los 1000 caracteres.";
        } else if (!containsLetterOrNumber(state.description)) {
          errors.description = "Debe contener al menos una letra o número.";
        } else if (hasReps(state.description.toLowerCase())) {
          errors.description = "Descripción incorrecta, evita repeticiones.";
        } else if (!hasValidChar(state.description)) {
          errors.description =
            "El campo solo puede contener letras (a-z), números (0-9), espacios y los siguientes caracteres: ( : , () ! ? & ).";
        } else {
          errors.description = "";
        }
        break;
    case "background_image":
      if (!urlPattern(state.background_image)) {
        errors.background_image =
          "Debe ser una URL válida de imagen (.jpg, .jpeg, .png).";
      }
      if (state.background_image === "")
        errors.background_image = "Campo requerido.";
      break;
    case "released":
      const currentDate = new Date();
      const releasedDate = new Date(state.released);
      if (state.released === "") {
        errors.released = "Campo requerido.";
      }
      if (releasedDate > currentDate) {
        errors.released = "La fecha no puede ser posterior a la fecha actual.";
      }
      break;
      case 'rating':
        if (isNaN(state.rating)) {
          errors.rating = "Campo requerido y debe ser un número.";
        } else if (state.rating < 0 || state.rating > 5) {
          errors.rating = "El rating debe estar entre 0 y 5.";
        }
        break;
        case "genres":
          if (state.genres.length === 0) {
            errors.genres = "Agrega al menos un género";
          }
          break;
    default:
      break;
  }
  return errors;
};
