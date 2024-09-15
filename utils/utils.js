const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Fecha inválida";
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', options);

    return formattedDate;
};

export default formatDate;