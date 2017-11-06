


const ase = function(){
  console.log("ase2222222222");
  setTimeout(ase,1000);
}

const asd = function(){
  console.log("asd");

  setImmediate(ase);

  setTimeout(asd,1000);

}

setTimeout(asd,1000);

console.log("asdf");
