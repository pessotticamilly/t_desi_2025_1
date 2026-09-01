const cpfInput = document.getElementById("cpfInput");
const phoneNumberInput = document.getElementById("phoneNumberInput");
const cepInput = document.getElementById("cepInput");

function inputMask(input, pattern) {
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, '');
        let newValue = 0;
        let result = '';

        for (let i = 0; i < pattern.length && newValue < value.length; i++) {
            if (pattern[i] === '9') {
                result += value[newValue];
                newValue++;
            } else {
                result += pattern[i];
            };
        };

        input.value = result;
    });
};

inputMask(cpfInput, '999.999.999-99');
inputMask(phoneNumberInput, '(99) 99999-9999');
inputMask(cepInput, '99999-999');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const countryInput = document.getElementById("countryInput");
const stateInput = document.getElementById("stateInput");
const cityInput = document.getElementById("cityInput");
const neighborhoodInput = document.getElementById("neighborhoodInput");
const streetInput = document.getElementById("streetInput");

cepInput.addEventListener('blur', async () => {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return;
    }

    try {
        // https://viacep.com.br/
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert('404\nCEP not found');
            return;
        }    

        countryInput.value = "Brasil"
        stateInput.value = data.uf;
        cityInput.value = data.localidade;
        neighborhoodInput.value = data.bairro;
        streetInput.value = data.logradouro;

    } catch (error) {
        console.error('Error trying to get CEP', error);
        alert('500\nServidor Error');
    }
});