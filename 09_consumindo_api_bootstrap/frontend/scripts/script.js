const inputCep = document.getElementById("cep");
const inputEstado = document.getElementById("estado");
const inputCidade = document.getElementById("cidade");
const inputBairro = document.getElementById("bairro");
const inputRua = document.getElementById("rua");

inputCep.addEventListener("blur", async () => {
    try {
        // const response = await fetch(url)
        // viacep.com.br/ws/01001000/json/

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("404\nNot Found");
            return;
        };

        inputEstado.value = data.estado;
        inputCidade.value = data.localidade;
        inputBairro.value = data.bairro;
        inputRua.value = data.logradouro
    } catch (error) {
        console.log("Erro tentando buscar CEP:\n" + error);
        alert("500\nServidor Error")
    }
});