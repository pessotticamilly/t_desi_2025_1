const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");

cep.addEventListener("blur", async () => {
    try {
        // const response = await fetch(url)
        // viacep.com.br/ws/01001000/json/
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        const data = await response.json();

        estado.value = data.estado;
        cidade.value = data.localidade;
        bairro.value = data.bairro;
        rua.value = data.logradouro
    } catch (error) {
        console.log("Erro tentando buscar CEP:\n" + error);
        alert("500\nServidor Error")
    }
});