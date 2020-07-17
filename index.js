const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');
const EffectsByClass = require('./effects_by_class.json');
const Effects = require('./effects.json');

let substances = EffectsByClass.data.substances;
let effects = Effects.data.effects;
console.log('Number of substances:', substances.length);
console.log('Number of effects:', effects.length);

dataset = []
let noFx = 0;
let noClass = 0;

classes = [
    "Depressant",
    "Psychedelics",
    "Stimulants",
    "Dissociatives",
    "Nootropic",
    "Entactogens",
    "Cannabinoid",
    "Opioids",
    "Deliriant",
    "Sedative",
    "Antipsychotic",
    "Oneirogen",
    "Hallucinogens",
    "Eugeroic",
    "Antidepressant",
]


for (var i = 0; i < substances.length; i++) {
    let data = []
    if (substances[i].effects.length !== 0) {
        if (substances[i].class !== null) {
            if (substances[i].class.psychoactive !== null) {
                for (var j = 0; j < effects.length; j++) {
                    let hasEffect = false;
                    for (var k = 0; k < substances[i].effects.length; k++) {
                        if (effects[j].name === substances[i].effects[k].name) {
                            hasEffect = true;
                        }
                    }
                    if (hasEffect) {
                        data.push(1);
                    } else {
                        data.push(0);
                    }
                }
                dataset.push(data);
            } else {
                noClass++;
            }
        } else {
            noClass++;
        }
    } else {
        noFx++;
    }
}
console.log('substances with no effects:', noFx);
console.log('substances with no class:', noClass);
console.log('remaining samples:', dataset.length);
let labels = []
for (var i = 0; i < substances.length; i++) {
    if (substances[i] !== null) {
        if (substances[i].effects !== null && substances[i].effects.length !== 0) {
            if (substances[i].class !== null) {
                if (substances[i].class.psychoactive !== null) {
                    if (substances[i].class.psychoactive[0] !== null) {
                        let data = []
                        for (var j = 0; j < classes.length; j++) {
                            
                            if(substances[i].class.psychoactive[0] === classes[j]) {
                                data.push(1)
                            } else {
                                data.push(0)
                            }
                        }
                        labels.push(data)
                    }
                }
            }
        }
    }
}
console.log('labels length:', labels.length);
const csv = convertArrayToCSV(labels);
fs.writeFile('./y.csv', csv, err => {
    if (err) {
        return console.log(err);
    }
    console.log("file saved");
});

const csv2 = convertArrayToCSV(dataset);
fs.writeFile('./X.csv', csv2, err => {
    if (err) {
        return console.log(err);
    }
    console.log("file saved");
});
