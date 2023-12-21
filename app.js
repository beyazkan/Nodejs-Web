// File System Modülü Dahil Etme
const fs = require('fs');

/*
const files = fs.readdir('./', function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
});
*/

/*
const data = fs.readFile('index.html', 'utf-8', function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
});
*/
/* Dosya oluşturma ve üzerine yazma yöntemi
fs.writeFile('deneme.txt', 'Hello World...', function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Dosya oluşturuldu.');
    }
});
*/
/* Dosya oluşturma ve ekleme yapma yöntemi
fs.appendFile('deneme1.txt', 'Hello World...', function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Dosya oluşturuldu.');
    }
});
*/
/* Dosya silme yöntemi
fs.unlink('deneme1.txt', function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Dosya Silindi.');
    }
})
*/
/* Dosya ismi değiştirme yöntemi
fs.rename('deneme.txt', 'deneme1.txt', function(error){
    if(error){
        console.log(error);
    }else{
        console.log('dosya ismi değiştirildi.');
    }
});
*/