let mappedImage = (s) => {
  s.preload = () => {
    s.pixelDensity(sk2dns);
    palette = s.loadImage(outBaseGen);
    img = s.loadImage(imgtochange);
  };

  s.setup = () => {
    aspectRatio = img.width / img.height;
    let dns2 = palletteres / sk2dns;
    let cnv = s.createCanvas(
      dns2 * resolution,
      (dns2 * resolution) / aspectRatio
    );
    s.background(255);
    cnv.parent(document.querySelector("output"));
    let lmn = [...imgluminance];
    for (let j = 0; j < resolution; j++) {
      for (let i = 0; i < resolution; i++) {
        s.image(
          palette,
          i * dns2,
          j * dns2,
          dns2,
          dns2,
          lmn.shift() * palletteres,
          0,
          palletteres,
          palletteres
        );
      }
    }
    let btnsave = document.createElement("button");
    btnsave.innerText = "Download";
    document.querySelector("output").appendChild(btnsave);
    btnsave.onclick = s.salvar;
  };
  s.salvar = function () {
    s.save("minecraftado.png");
  };
};
