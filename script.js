const label1 = document.querySelector(".color-label1");
const label2 = document.querySelector(".color-label2");
const color1 = document.querySelector("#input-color-1");
const color2 = document.querySelector("#input-color-2");
const colorbg1 = document.querySelector(".colors-c1");
const colorbg2 = document.querySelector(".colors-c2");
const colorLabel1 = document.querySelector(".cl1");
const colorLabel2 = document.querySelector(".cl2");
const btn = document.querySelector(".btn");
const message = document.querySelector(".message");
let rgb1 = [];
let rgb2 = [];
let ratio = 0;

const submit = btn.addEventListener("click", () => {
  rgb1 = [
    hexToRgb(color1.value).r,
    hexToRgb(color1.value).g,
    hexToRgb(color1.value).b,
  ];
  rgb2 = [
    hexToRgb(color2.value).r,
    hexToRgb(color2.value).g,
    hexToRgb(color2.value).b,
  ];
  contrast();
  changeColorLabels(rgb1, rgb2);
  showContrastMessage();
});

const luminance = (r, g, b) => {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = () => {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  ratio = (brightest + 0.05) / (darkest + 0.05);
  console.log(ratio);
  return (brightest + 0.05) / (darkest + 0.05);
};

const changeColorLabels = (a, b) => {
  colorbg1.style.backgroundColor = `rgb(${a[0]},${a[1]},${a[2]})`;
  colorbg2.style.backgroundColor = `rgb(${b[0]},${b[1]},${b[2]})`;
  colorLabel2.style.color = `rgb(${a[0]},${a[1]},${a[2]})`;
  colorLabel1.style.color = `rgb(${b[0]},${b[1]},${b[2]})`;
  label1.style.margin = "35px 0";
  label2.style.margin = "35px 0";
};

const showContrastMessage = () => {
  message.style.display = "block";
  if (ratio >= 7) {
    message.textContent = "The colors passed with high contrast!!";
    message.style.color = "#333333";
  } else if (ratio < 7 && ratio >= 3) {
    message.textContent =
      "The colors passed, but may not work well with blocks of small text!!";
    message.style.color = "#333333";
  } else {
    message.textContent = "The colors fail the contrast test :(";
    message.style.color = "red";
  }
};

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
