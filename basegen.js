var outBaseGen = "";
var sketches = [];
function basegen(s) {
  let resolution = palletteres;
  let imgarray = [];
  let luminances = [];
  let qtsimg = qtd_imagens;
  s.preload = () => {
    let isMine = document.querySelector("#mine").checked;
    if (!isMine) {
      for (let file of palettefiles) {
        imgarray.push(s.loadImage(file));
      }
    } else {
      qtd_imagens = 818;
      qtsimg = qtd_imagens;
      outBaseGen = "luminos.png";
      baseGenCallback();
      s.remove();
    }
  };
  s.setup = () => {
    let cnv = s.createCanvas(resolution * qtsimg, resolution);
    cnv.parent(document.querySelector("output"));
    s.pixelDensity(1);

    s.background(255);
    let x = 0;
    for (let img of imgarray) {
      s.image(img, x, 0, resolution, resolution);
      let sumr = 0;
      let sumg = 0;
      let sumb = 0;
      for (let i = x; i < x + resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const [r, g, b, a] = s.get(i, j);
          sumr += r;
          sumg += g;
          sumb += b;
        }
      }
      sumr = sumr / resolution / resolution;
      sumg = sumg / resolution / resolution;
      sumb = sumb / resolution / resolution;
      let lu = 0.299 * sumr + 0.587 * sumg + 0.114 * sumb;
      luminances.push({ img, lu });
      x += resolution;
    }
    luminances.sort(function (a, b) {
      return a.lu - b.lu;
    });
    s.clear();
    x = 0;
    for (let lu of luminances) {
      s.image(lu.img, x, 0, resolution, resolution);
      x += resolution;
    }
    outBaseGen = s.canvas.toDataURL();
    baseGenCallback();
    s.remove();
  };
}
function baseGenCallback() {
  document.body.appendChild(document.createElement("br"));
  sketches.push(new p5(originalImage));
  let imagemrender = document.createElement("img");
  imagemrender.src = outBaseGen;
  document.querySelector("output").appendChild(imagemrender);
  //sketch1.inpt = out;
}
function skt1Callback(out) {
  document.body.appendChild(document.createElement("br"));

  sketches.push(new p5(mappedImage));
}
//new p5(basegen);

function generate() {
  endsketches();
  document.querySelector("output").innerHTML = "<label>Result:</label>";
  qtd_imagens = document.querySelector("#base").files.length;
  palletteres = Number(document.querySelector("#palres").value);
  sk2dns = palletteres;
  sketches.push(new p5(basegen));
}
function endsketches() {
  for (let skt of sketches) {
    skt.remove();
  }
}
document.querySelector("#base").onchange = getFilesFromInput;

function getFilesFromInput() {
  palettefiles = [];
  const files = document.querySelector("#base").files;
  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      palettefiles.push(reader.result);
    };
  }
}

document.querySelector("#imgtochange").onchange = getFileFromInput;
function getFileFromInput() {
  const file = document.querySelector("#imgtochange").files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    imgtochange = reader.result;
  };
}
