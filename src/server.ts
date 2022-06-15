import app from "./app"
import AppDataSource from "./data-source"



AppDataSource.initialize()
.then(() => {
    console.log("Database connected")
    
    const port = process.env.PORT ?? 3000

    app.listen(port, () => {
        console.log("Running on localhost:3000")
    })
})
.catch((err) => {
    console.error("Error During Data Source Initialization", err)
})