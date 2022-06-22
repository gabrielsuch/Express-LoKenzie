import express from "express"
import swaggerUiExpress from "swagger-ui-express"
import swaggerDocument from "./swagger.json"
import registerRoutes from "./routes/index"


const app = express()

app.use(express.json())
app.use("/api-documentation", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument))
registerRoutes(app)


export default app