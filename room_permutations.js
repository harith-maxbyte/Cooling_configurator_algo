
var permArr = [], usedChars = [];
let data = []
function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);

    if (input.length == 0) {
      permArr.push(usedChars.slice());
      //  if(permArr.length == 2){
      //   for(var i=0;i<permArr.length;i++){data.push(permArr[i])}
      //   break;
      // }
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};



function random(totrooms1) {
  var arr = [];
  while (arr.length < totrooms1) {

    var r = Math.floor(Math.random() * totrooms1) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr
}


module.exports = { permute, random };
