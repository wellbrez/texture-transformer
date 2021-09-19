let originalImage = function (s) {
  s.preload = () => {
    s.pixelDensity(1);
    palette = s.loadImage(outBaseGen);
    img = s.loadImage(imgtochange);
  };

  s.setup = () => {
    aspectRatio = img.height / img.width;
    let cnv = s.createCanvas(resolution, resolution * aspectRatio);
    cnv.parent(document.querySelector("#form-pixels"));
    s.image(img, 0, 0, resolution, resolution * aspectRatio);
    s.loadPixels();
    imgluminance = [];
    for (let i = 0; i < s.pixels.length; i += 4) {
      imgluminance.push(
        0.299 * s.pixels[i] + 0.587 * s.pixels[i + 1] + 0.114 * s.pixels[i + 2]
      );
    }
    s.updatePixels();
    imgluminance = imgluminance.map((val) => {
      let res = Math.round(s.map(val, 0, 255, 0, qtd_imagens - 1));
      return res;
    });
    skt1Callback();
  };
};
