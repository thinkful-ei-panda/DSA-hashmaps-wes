const HashMap = require('./hash-map');

//1.
function main() {
  let lotr = new HashMap;
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  const chars = 
  [
    ['Hobbit', 'Bilbo'],
    ['Hobbit', 'Frodo'],
    ['Wizard', 'Gandalf'], 
    ['Human', 'Aragorn'], 
    ['Elf', 'Legolas'], 
    ['Maiar', 'The Necromancer'],
    ['Maiar', 'Sauron'], 
    ['RingBearer', 'Gollum'], 
    ['LadyOfLight', 'Galadriel'], 
    ['HalfElven', 'Arwen'],
    ['Ent', 'Treebeard']
  ];

  chars.forEach(char => {
    lotr.set(char[0],char[1]);
  });

  console.log(lotr._hashTable);  
}

// main();

//2.

const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};

// WhatDoesThisDo();

//3.
// [
//   [0,22],
//   [1,88],
//   [2,undefined],
//   [3,undefined],
//   [4,4],
//   [5,15],
//   [6,17],
//   [7,28],
//   [8,59],
//   [9,31],
//   [10,10],
// ];

// [
//   [0,],
//   [1,],
//   [2,],
//   [3,],
//   [4,],
//   [5,],
//   [6,],
//   [7,],
//   [8,],
// ];

//4.

function removeDuplicates(string) {
  let hash = new HashMap;
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let updatedString = [];
  for(let i = 0; i<string.length; i++){
    try{
      if(hash.get(string[i]) !== string[i]){
        throw new Error('new character with same hash');
      }
    }catch(e){      
      hash.set(string[i],string[i]);
      updatedString.push(string[i]);
    }
  }

  return updatedString.join('');
}

// console.log(removeDuplicates('google'));
// console.log(removeDuplicates('google all that you think can think of'));

//5.
function permuPalindrome(string){
  let hash = new HashMap;
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  for(let i = 0; i < string.length; i++){
    try{
      const value = hash.get(string[i]);
      hash.set(string[i],value + 1);
    }catch(e){
      hash.set(string[i],1);
    }
  }

  let countOddRepeatChars = 0;
  for(let j = 0; j < string.length; j++){    
    if(hash.get(string[j]) % 2 === 1){
      countOddRepeatChars++;
      if(countOddRepeatChars > 1){
        return false;
      }
    }    
  }
  return true;
}

// console.log(permuPalindrome('acecarr'));
// console.log(permuPalindrome('aceca'));
// console.log(permuPalindrome('acecar'));
// console.log(permuPalindrome('north'));

//6.
function anagramGrouping(array){
  let hash = new HashMap;
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let results = [];
  for(let i = 0; i<array.length; i++){
    const sortedString = array[i].split('').sort().join('');
    try {
      const prevAnagrams = hash.get(sortedString);
      hash.set(sortedString,[...prevAnagrams,array[i]]);
    }catch(e){
      results.push(sortedString);
      hash.set(sortedString,[array[i]]);
    }
  }

  for(let j = 0; j < results.length; j++){
    results[j] = hash.get(results[j]);
  }

  return results;
}

console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));