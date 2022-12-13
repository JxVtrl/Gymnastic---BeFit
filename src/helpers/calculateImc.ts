export const calculateImc = (height: number, weight: number) => {
    return (weight / (height * height)).toFixed(2);
}

export const calculatePercentageImc = (height: number, weight: number) => {
   let imc_result = Number(calculateImc(height, weight))

    if(imc_result < 18.5){
        return 0.80
    }
    else if(imc_result < 24.9){
        return 1
    }
    else if(imc_result < 29.9){
        return 0.60
    }
    else if(imc_result < 34.9){
        return 0.15
    }
    else if(imc_result <= 39.9){
        return 0.10
    }
    else if(imc_result >= 40){
        return 0.05
    }
}