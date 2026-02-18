let pi = 3.14;

let yarıcap = process.argv[2];

if (!yarıcap) {
  console.log("Yarıçap değeri gir : ");
}

let sonuc = pi * yarıcap ** 2;
console.log(`Dairenin alanı :  ${sonuc}`);
