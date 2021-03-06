export const isCPFCNPJValid = function(iDoc:string):boolean{
    let ret : boolean = false;
    let nDoc  : string = "";
    let nDocAux  : string = "";
    let nDigToCmp : string = "";
    let somatorio  : number;
    let peso  : number;
    let resto : number;
    let nDig1 : number;
    let nDig2 : number;

    nDoc = onlyNumber(iDoc);
    try{
        if(!isDocValidToCompare(nDoc)){
            return false;
        }
        //
        if(nDoc.length == 11){
            //11 = cpf
            nDocAux = nDoc.substr(0,9);
            nDigToCmp = nDoc.substr(-2);
            //////////////////////////
            //calcula o primeiro digito
            //////////////////////////
            somatorio = 0;
            peso = nDocAux.length + 1;
            for (const chCpf of nDocAux){
                if(peso < 2)break;
                somatorio += (Number(chCpf) * peso);
                peso--;
            }
            resto = somatorio % 11;
            nDig1 = 11 - resto;
            if(nDig1 < 0){
                nDig1 = 0;
            }
            //////////////////////////
            //calcula o segundo digito
            //////////////////////////
            nDocAux = nDocAux + String(nDig1);
            somatorio = 0;
            peso = nDocAux.length + 1;
            for (const chCpf of nDoc){
                if(peso < 2)break;
                somatorio += (Number(chCpf) * peso);
                peso--;
            }
            resto = somatorio % 11;
            nDig2 = 11 - resto;
            if(nDig2 < 0){
                nDig2 = 0;
            }
            if(nDigToCmp == String(nDig1)+String(nDig2)){
                return true;
            }else return false;
        }else if(nDoc.length == 14){
            //14 = cnpj
            nDocAux = nDoc.substr(0,12);
            nDigToCmp = nDoc.substr(-2);
            //////////////////////////
            //calcula o primeiro digito
            //////////////////////////
            somatorio = 0;
            peso = 2;
            //console.log("doc aux "+nDocAux.length);
            for(let i : number = nDocAux.length-1;i >= 0; i--){
                somatorio += (Number(nDocAux.charAt(i)) * peso);
                peso++;
                if(peso > 9){
                    peso = 2;
                }
            }
            resto = somatorio % 11;
            nDig1 = 11 - resto;
            if(nDig1 < 0){
                nDig1 = 0;
            }
            //////////////////////////
            //calcula o segundo digito
            //////////////////////////
            nDocAux = nDocAux + String(nDig1);
            somatorio = 0;
            peso = 2;
            //console.log("doc aux "+nDocAux.length);
            for(let i : number = nDocAux.length-1;i >= 0; i--){
                somatorio += (Number(nDocAux.charAt(i)) * peso);
                peso++;
                if(peso > 9){
                    peso = 2;
                }
            }
            resto = somatorio % 11;
            nDig2 = 11 - resto;
            if(nDig2 < 0){
                nDig2 = 0;
            }

            if(nDigToCmp == String(nDig1)+String(nDig2)){
                ret = true;
            }
        }
    }catch (error) {
        ret = false;
    }
    return ret;
};

export const generateCPFCNPJ = function(iTpDoc:string, iMask:boolean=false):string{
    let ret : string = "";
    let nDoc : string;
    let nDocAux : string;
    let somatorio  : number;
    let peso  : number;
    let resto : number;
    let nDig1 : number;
    let nDig2 : number;

    if(iTpDoc == "CPF"){
        nDocAux = randomNumber(100,999).toString();
        nDoc = nDocAux;
        ret += nDocAux+String((iMask)?("."):(""));
        nDocAux = randomNumber(100,999).toString();
        nDoc += nDocAux;
        ret += nDocAux+String((iMask)?("."):(""));
        nDocAux = randomNumber(100,999).toString();
        nDoc += nDocAux;
        ret += nDocAux;
        
        somatorio = 0;
        peso = nDoc.length + 1;
        for (const chCpf of nDoc){
            if(peso < 2)break;
            somatorio += (Number(chCpf) * peso);
            peso--;
        }
        resto = somatorio % 11;
        nDig1 = 11 - resto;
        if(nDig1 < 0){
            nDig1 = 0;
        }
        //////////////////////////
        //calcula o segundo digito
        //////////////////////////
        nDoc += String(nDig1);
        somatorio = 0;
        peso = nDoc.length + 1;
        for (const chCpf of nDoc){
            if(peso < 2)break;
            somatorio += (Number(chCpf) * peso);
            peso--;
        }
        resto = somatorio % 11;
        nDig2 = 11 - resto;
        if(nDig2 < 0){
            nDig2 = 0;
        }

        ret += String((iMask)?("-"):(""))+String(nDig1)+String(nDig2);
    }else if(iTpDoc == "CNPJ"){
        nDocAux = randomNumber(10,99).toString();
        nDoc = nDocAux;
        ret += nDocAux+String((iMask)?("."):(""));
        nDocAux = randomNumber(100,999).toString();
        nDoc += nDocAux;
        ret += nDocAux+String((iMask)?("."):(""));
        nDocAux = randomNumber(100,999).toString();
        nDoc += nDocAux;
        ret += nDocAux+String((iMask)?("/"):(""));
        nDocAux = "0001";
        nDoc += nDocAux;
        ret += nDocAux;
        
        somatorio = 0;
        peso = 2;
        //console.log("doc aux "+nDocAux.length);
        for(let i : number = nDoc.length-1;i >= 0; i--){
            somatorio += (Number(nDoc.charAt(i)) * peso);
            peso++;
            if(peso > 9){
                peso = 2;
            }
        }
        resto = somatorio % 11;
        nDig1 = 11 - resto;
        if(nDig1 < 0){
            nDig1 = 0;
        }
        //////////////////////////
        //calcula o segundo digito
        //////////////////////////
        nDoc += String(nDig1);
        somatorio = 0;
        peso = 2;
        //console.log("doc aux "+nDocAux.length);
        for(let i : number = nDoc.length-1;i >= 0; i--){
            somatorio += (Number(nDoc.charAt(i)) * peso);
            peso++;
            if(peso > 9){
                peso = 2;
            }
        }
        resto = somatorio % 11;
        nDig2 = 11 - resto;
        if(nDig2 < 0){
            nDig2 = 0;
        }

        ret += String((iMask)?("-"):(""))+String(nDig1)+String(nDig2);
    }
    return ret;
};

function randomNumber(min:number, max:number):number{
    //console.log(Math.random() * 100 + 100);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onlyNumber(tp:string):string{
    let ret : string = "";
    ret = tp.replace(/\D+/g,"");
    return ret;
}

function isDocValidToCompare(tp:string):boolean{
    let numbers : string = "123456789";
    for (const num of numbers){
        if(tp.replace(new RegExp(num,"g"),"") == ""){
            return false;
        }
    }
    return true;
}