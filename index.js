const { readdirSync, existsSync, mkdirSync, copyFileSync } = require('fs');

// Get all Files Paths
const getFileList = (dirName) => {
    let paths = [];
    const items = readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            paths = [...paths, ...getFileList(`${dirName}/${item.name}`)];
        } else {
            paths.push(`${dirName}/${item.name}`);
        }
    }

    return paths;
};

const paths = getFileList('C:/Users/brandon/Documents/Splice/Samples/packs');

// Figure out Categories
const samples = []
const tags = [
    {
        name: "Kicks",
        keywords: ["kick", "kicks", "kck"]
    },
    {
        name: "Snares",
        keywords: ["snare", "snares"]
    },
    {
        name: "Hats",
        keywords: ["hats", "hat", "kck"]
    },
    {
        name: "Claps",
        keywords: ["claps", "clap", "clp"]
    },
    {
        name: "Rims",
        keywords: ["rims", "rim"]
    },
    {
        name: "Snaps",
        keywords: ["snaps", "snap"]
    },
    {
        name: "Cymbals",
        keywords: ["cymbals", "cymbal"]
    },
    {
        name: "Toms",
        keywords: ["toms", "tom"]
    },
    {
        name: "Fills",
        keywords: ["fills", "fill"]
    },
    {
        name: "Impacts",
        keywords: ["impact", "impacts"]
    },
    {
        name: "Swells",
        keywords: ["swells", "swell"]
    },
    {
        name: "Risers",
        keywords: ["risers", "riser", "sweep"]
    },
    {
        name: "Vocals",
        keywords: ["vocals", "vocal", "chant", "phrases", "phrase", "chorus", "bridge", "lead", "full", "double"]
    },
    {
        name: "Synths",
        keywords: ["synth", "synths"]
    },
    {
        name: "Acapellas",
        keywords: ["acapellas", "acapella"]
    },
    {
        name: "Keys",
        keywords: ["keys", "key", "rhodes", "rhode"]
    },
    {
        name: "Perc",
        keywords: ["perc"]
    },
    {
        name: "Strings",
        keywords: ["strings", "string"]
    },
    {
        name: "Loops",
        keywords: ["loops", "loop"]
    }
]

for (let i = 0; i < paths.length; i++) {
    let pathTokens = paths[i].split("/")
    let name = pathTokens[pathTokens.length - 1]

    let editedName = name.toLowerCase();

    // Figure out tags
    let sampleTag = ""
    for (let a = 0; a < tags.length; a++) {
        let tag = tags[a]
        let found = false;
        for (let b = 0; b < tag.keywords.length; b++) {
            if (editedName.includes(tag.keywords[b])) {
                found = true
            }
        }
        if (found) sampleTag = tag.name
    }

    samples.push({ name: name, sampleTag: sampleTag, path: paths[i] })
}

// Unsorted Files for logging purposes
console.log("----------------- Unsorted files -----------------")
for (let i = 0; i < samples.length; i++) {
    if (samples[i].sampleTag === "") {
        console.log(samples[i].name)
    }
}
console.log("--------------------------------------------------")

var dir = './SpliceSamples/';
let UnsortedDir = dir + "Unsorted"

if (!existsSync(dir)){
    mkdirSync(dir);
}

if (!existsSync(UnsortedDir)) {
    mkdirSync(UnsortedDir)
}

for (let i = 0; i < tags.length; i++) {
    if (!existsSync(dir + tags[i].name)) {
        mkdirSync(dir + tags[i].name)
    }    
}

// Sort files
for (let i = 0; i < samples.length; i++) {
    hashCode = samples[i].path.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    
    if (samples[i].sampleTag === '') {
        copyFileSync(samples[i].path, "./SpliceSamples/Unsorted/Sample_" + Math.abs(hashCode) + ' - ' + samples[i].name)
    } else {
        copyFileSync(samples[i].path, "./SpliceSamples/" + samples[i].sampleTag + "/" + samples[i].sampleTag + "_" + Math.abs(hashCode) + ' - ' + samples[i].name)
    }
}



