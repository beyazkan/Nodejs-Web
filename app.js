const Logger = require('./logger.js');
const logger = new Logger();

// Listener kayıt et
logger.on('connection', function(args){
    console.log('bağlantı kuruldu.', args);
});

logger.on('logout', function(){
    console.log('bağlantı sonlandırıldı.');
});
// event'i tetikle
logger.log('Mustafa Oğuz login oldu.');
logger.emit('logout');