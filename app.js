const express = require('express');
const app = express();

const mysql = require('mysql');

const bodyparser = require('body-parser');
const port = process.env.PORT || 3200;

let orders = [];

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

/*let con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin"
})

con.connect(function(err){
if(err)throw err;
    console.log("Connected!");
});*/


app.post("/new_order",(req, res)=>{
    const order = req.body;
    if(order.food_name && order.food_qty && order.customer_name){
        orders.push({...order,
        id: `${order.length + 1}`,
        date: Date.now().toString()
        });
        res.status(200).json({
            message: "Order was successful"
        });
    }else{
        res.status(401).json({
            message: "Invalid order creation"
        })
    }
  })

  app.get("/get_orders", (req, res)=>{
      res.status(200).send(orders);

  });

  app.patch("/update_order/:id",(req, res)=>{
      const order_id = req.param.id;
      const order_update = req.body;

      for(let order of orders){
        if(order.id === order_id){
            if(order_update.food_name !== null || undefined)
                order.food_name = order_update.food_name;
            
            if(order_update.food_qty !== null || undefined)
                order.food_qty = order_update.food_qty;
            
            if(order_update.customer_name !== null || undefined)
                order.customer_name = order_update.customer_name;
            
           return res.status(200).json({ message: "Order updated successfully"})
        }
      }
      res.status(404).json({ message: "Invalid order Id updated successfully"})   
  })

  app.delete("/delete_order/:id",(req, res)=>{

    const order_id = req.param.id;
    const order_delete = req.body;

    for (let order of orders){
        if(order.id === order_id)
        orders.slice(orders.indexOf(order),1);
        return res.status(200).json({message: "Order deleted"})
    }
    res.status(404).json({message: "Invalid Order "})
  });

  app.listen(port, () => {
    console.log(`running at port ${port}`);
  });  

