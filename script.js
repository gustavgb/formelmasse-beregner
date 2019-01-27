// Atommasser
var am = {
    H: 1.008,
    He: 4.003,
    Li: 6.941,
    Be: 9.012,
    B: 10.81,
    C: 12.01,
    N: 14.01,
    O: 16.00,
    F: 19.00,
    Ne: 20.18,
    Na: 22.99,
    Mg: 24.31,
    Al: 26.98,
    Si: 28.09,
    P: 30.97,
    S: 32.07,
    Cl: 35.45,
    Ar: 39.95,
    K: 39.10,
    Ca: 40.08,
    Sc: 44.96,
    Ti: 44.96,
    V: 50.94,
    Cr: 52.00,
    Mn: 54.94,
    Fe: 55.85,
    Co: 58.93,
    Ni: 58.69,
    Cu: 63.55,
    Zn: 65.38,
    Ga: 69.72,
    Ge: 72.64,
    As: 74.92,
    Se: 78.96,
    Br: 79.90,
    Kr: 83.80,
    Rb: 85.47,
    Sr: 87.62,
    Y: 88.91,
    Zr: 91.22,
    Nb: 92.91,
    Mo: 95.96,
    Tc: undefined,
    Ru: 101.1,
    Rh: 102.9,
    Pd: 106.4,
    Ag: 107.9,
    Cd: 112.4,
    In: 114.8,
    Sn: 118.7,
    Sb: 121.8,
    Te: 127.6,
    I: 126.9,
    Xe: 131.3,
    Cs: 132.9,
    Ba: 137.3,
    La: 138.9,
    Ce: 140.1,
    Pr: 140.9,
    Nd: 144.2,
    Pm: undefined,
    Sm: 150.4,
    Eu: 151.0,
    Gd: 157.3,
    Tb: 158.9,
    Dy: 162.5,
    Ho: 164.9,
    Er: 167.3,
    Tm: 168.9,
    Yb: 173.1,
    Lu: 175.0,
    Hf: 178.5,
    Ta: 180.9,
    W: 183.9,
    Re: 186.2,
    Os: 190.2,
    Ir: 192.2,
    Pt: 195.1,
    Au: 197.0,
    Hg: 200.6,
    Tl: 204.4,
    Pb: 207.2,
    Bi: 209.0,
    Po: undefined,
    At: undefined,
    Rn: undefined,
    Fr: undefined,
    Ra: undefined,
    Ac: undefined,
    Th: 232.0,
    Pa: 231.0,
    U: 238.0,
    Np: undefined,
    Pu: undefined,
    Am: undefined,
    Cm: undefined,
    Bk: undefined,
    Cf: undefined,
    Es: undefined,
    Fm: undefined,
    Md: undefined,
    No: undefined,
    Lr: undefined,
    Johan: "johan"
}


function separate(molecule) {
    var uLetters = {"A":true, "B":true, "C":true, "D":true, "E":true, "F":true, "G":true, "H":true, "I":true, "J":true, "K":true, "L":true, "M":true, "N":true, "O":true, "P":true, "Q":true, "R":true, "S":true, "T":true, "U":true, "V":true, "W":true, "X":true, "Y":true, "Z":true};
    var lLetters = {"a":true, "b":true, "c":true, "d":true, "e":true, "f":true, "g":true, "h":true, "i":true, "j":true, "k":true, "l":true, "m":true, "n":true, "o":true, "p":true, "q":true, "r":true, "s":true, "t":true, "u":true, "v":true, "w":true, "x":true, "y":true, "z":true};
    var numbers = {"0":true, "1":true, "2":true, "3":true, "4":true, "5":true, "6":true, "7":true, "8":true, "9":true};
    
    var l0 = [];
    var l1 = [];
    
    for (var i = 0; i < molecule.length; i++) {
        var letter = molecule.charAt(i);
        
        if (letter in uLetters) l0.push(i);
        if ((letter in numbers) && l0.length != l1.length) l1.push(i);
        if (l0.length > l1.length + 1) l1.push(i);
    }
    l0.push(molecule.length);
    if (!numbers[molecule.charAt(molecule.length-1)]) l1.push(molecule.length);
    
    var parts = [];
    for (var i = 0; i< l1.length; i += 1) {
        var str = molecule.substring(l0[i], l1[i]);
        var number = parseInt(molecule.substring(l1[i], l0[i+1]));
        if (isNaN(number)) number = 1;
        parts.push({str: str, num: number});
    }
    
    var amount = parseInt(molecule.substring(0, l0[0]));
    if (isNaN(amount)) amount = 1;
    
    return {molecule: molecule, parts: gather(parts), amount: amount};
}

function gather(parts) {
    var newParts = {};
    
    for (var i = 0; i < parts.length; i++) {
        if (!newParts[parts[i].str]) newParts[parts[i].str] = {str: parts[i].str, num: parts[i].num};
        else {
            newParts[parts[i].str].num += parts[i].num;
        }
    }
    
    var result = [];
    for (var i in newParts) {
        result.push(newParts[i]);
    }
    
    return result;
}

function beautify(molecule) {
    var numbers = {"0":true, "1":true, "2":true, "3":true, "4":true, "5":true, "6":true, "7":true, "8":true, "9":true};
    
    var res = [];
    var allowNumbers = false;
    
    for (var i = 0; i < molecule.length; i++) {
        if (numbers[molecule.charAt(i)] && allowNumbers) res.push("<sub>" + molecule.charAt(i) + "</sub>");
        else {
            res.push(molecule.charAt(i));
            allowNumbers = true;
        }
    }
    
    return res.join("");
}

function correctMeaningfulCiphers(num, ciphers) {
    var digits = 4 - num.toString().split(".")[0].length;
    return num.toFixed(digits);
}

function M(inp) {
    var parts = inp.parts;
    var amount = inp.amount;
    var molecule = inp.molecule;
    
    var raw_result = 0;
    for (var i = 0; i < parts.length; i++) {
        var weight = am[parts[i].str];
        if (weight === "johan") {
            return {
                msg: "johan",
                result: "Johans vægt måles kun kærlighed og vold."
            }
        }
        if (weight === undefined) {
            return {
                msg: "Fejl: Ukendt grundstof " + parts[i].str,
                result: undefined
            }
        }
        raw_result += amount * parts[i].num * weight;
    }
    
    var calculation = [];
    var formular = [];
    var task = "M(" + beautify(molecule) + ")";
    var result = correctMeaningfulCiphers(raw_result, 4);
    
    for (var i = 0; i < parts.length; i++) {
        var str;
        var weight = am[parts[i].str];
        if (parts[i].num > 1) str = parts[i].num + " &#8729; " + correctMeaningfulCiphers(weight, 4) + " g/mol";
        else str = correctMeaningfulCiphers(weight, 4) + " g/mol";
        calculation.push(str);
        if (i < parts.length-1) calculation.push(" + ");
        
        if (parts[i].num > 1) str = parts[i].num + " &#8729; M(" + parts[i].str + ")";
        else str = "M(" + parts[i].str + ")";
        formular.push(str);
        if (i < parts.length-1) formular.push(" + ");
    }
    
    
    var str0 = "", str1 = "";
    if (amount > 1) {
        str0 = amount + " &#8729; (";
        str1 = ")"
    }
    calculation = [str0, calculation.join(""), str1].join("");
    formular = [str0, formular.join(""), str1].join("");
    
    return {
        task: task,
        formular: formular,
        calculation: calculation,
        raw_result: raw_result,
        result: result
    };
}


function returnM() {
    var inp = document.getElementById("inp").value;
    var molarmasse = M(separate(inp))

    if (molarmasse.msg != "johan") document.getElementById("result").innerHTML = molarmasse.task + " = " + molarmasse.formular + " = " + molarmasse.calculation + " = " + molarmasse.raw_result + " g/mol = " + molarmasse.result + " g/mol";
    else document.getElementById("result").innerHTML = molarmasse.result;
}

/*function createTable(w, h) {
    var table = document.createElement("table");
    
    for (var y = 0; y < h; y++) {
        var row = document.createElement("tr");
        for (var x = 0; x < w; x++) {
            var cell = document.createElement("td");
            
            if (x > 0 && y < 2) {
                var text = document.createElement("input");
                text.setAttribute("type", "text");
                text.setAttribute("id", "row" + y + "cell" + x);
                text.setAttribute("class", "tableInput");
                cell.appendChild(text);
            } else {
                cell.setAttribute("id", "row" + y + "cell" + x);
            }
            
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }
    
    
    
    return table;
}


function updateTable(w, h) {
    var w = parseInt(document.getElementById("wInp").value);
    
    var table = createTable(w, 4);
    
    document.getElementById("tableResult").innerHTML = table.innerHTML;
    
}*/