const cpfInput = document.getElementById("cpfInput");
const phoneNumberInput = document.getElementById("phoneNumberInput");
const cepInput = document.getElementById("cepInput");

function inputMask(input, pattern) {
    console.log("input:\n" + input);
    console.log("pattern:\n" + pattern);
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, '');
        console.log("value:\n" + value);
        let newValue = 0;
        let result = '';

        for (let i = 0; i < pattern.length && newValue < value.length; i++) {
            if (pattern[i] === '9') {
                result += value[newValue];
                console.log("result:\n" + result);
                newValue++;
                console.log("newValue:\n" + newValue);
            } else {
                result += pattern[i];
                console.log("result:\n" + result);
            };
        };

        input.value = result;
    });
};

inputMask(cpfInput, '999.999.999-99');
inputMask(phoneNumberInput, '(99) 99999-9999');
inputMask(cepInput, '99999-999');