const express = require("express");
const product = require("./router/products");
const variants = require("./router/variants");
const Products = require("./connection/schema/product.schema");
require("./connection/conn")

const app = express()


app.use(express.json())

app.use("/product",product)
app.use('/variants',variants)



module.exports = app.listen(3000,()=>{
    console.log(' The app is running on 3000 port ')
})
