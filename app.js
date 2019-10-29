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


app.post("/new-order", (req, res) => {
    
    const { food_name, customer_name, food_qty } = req.body; //Object.entries(req.query);
    
    console.log(req.body);
    //if (order.food_name && order.customer_name && order.food_qty) {
        if(food_name && customer_name && food_qty){
      orders.push({ food_name,customer_name,food_qty,
      //  ...order,
  
        id: `${orders.length + 1}`,
  
        date: Date.now().toString()
      });

      res.status(200).json({
        message: "Order created successfully"
      });
    } else {//return res.status().json();
        res.status(401).json({
        message: "Invalid Order creation"
      });
    }
  });

  /*
  Get the all the list of order
   */
  app.get("/get-orders",(req, res)=>{
      if(orders.length !== null || undefined)
      res.status(200).send(orders);
  })
  /*
  Get order by the order Id number
  */
  app.get("/get-order/:id",(req, res)=>{
      const id = req.params.id;
      if (id === ""){
        res.status(404).json({message: "Order Id not exist"});
      }
      //let [food_name, customer_name, food_qty] = Object.entries(req.query);
      console.log("Value of " + `${id}`);
      console.log("Number of Orders: " + `${orders.length}`);
      let orderRequest = "";
      for(let order of orders){
            orderRequest = {
                "food_name": order.food_name,
                "customer_name": order.customer_name,
                "food_qty": order.food_qty
          }
      }
    return res.status(200).json({ message: orderRequest});
})

  app.put("/update-order/:id",(req, res)=>{
      const order_id = req.params.id;
      //let [ food_name, customer_name, food_qty ] = Object.entries(req.body);
      const { food_name, customer_name, food_qty } = req.body;
    
      console.log("Number of orders: " + orders);

      for(let order of orders){
        if(order.id === order_id){
            if(food_name !== null || undefined)
                order.food_name = food_name;

            if(food_qty !== null || undefined)
                order.food_qty = food_qty;
            
            if(customer_name !== null || undefined)
                order.customer_name = customer_name;
        }
        else{
         //   res.status(404).json({ message: "Invalid order Id supplied "});
        }
      }
      return res.status(200).json({ message: "Order updated successfully"})
    
  })

  app.delete("/delete-order/:id",(req, res)=>{

    const id = req.params.id;
    if(id === ""){
        res.json({message: "Please provide order number"});
    }

    for (let order of orders){
        if(order.id === id){
            orders.splice(orders.indexOf(order),1);
        }else{
            res.status(404).json({message: "Invalid Order ID"})
        }
    }
    return res.status(200).json({message: "Order deleted"});

  });

  app.listen(port, () => {
    console.log(`running at port ${port}`);
  });  

