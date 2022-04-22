
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pmt:Hexa123@cluster222.mqpx2.mongodb.net/pmtnew-databese?retryWrites=true&w=majority', { 
    useNewUrlparser: true ,
     useUnifiedTopology:true,
    // useFindAndModify:false,
}).then(()=>{
    console.log("connection established");

}).catch((e) =>{
    console.log("no connection");
})
