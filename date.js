
   exports.getdate = 
   function() 
   {var today = new Date();
     var currentdate = today.getDay();
     var options ={
        
         weekday : "long" ,
         month    : "long" ,
         day     : "numeric"
       }

     var day = today.toLocaleDateString("en-US" , options);
     return day ;
    }