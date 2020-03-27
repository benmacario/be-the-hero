const express = require("express")
const OngsControllers = require("./controllers/OngsController")

const IncidentsControllers = require("./controllers/IncidentController")
const ProfileControllers = require("./controllers/ProfileController")
const SessionControllers = require("./controllers/SessionController")




const routes = express.Router()

routes.post("/session", SessionControllers.create)

routes.get("/ongs", OngsControllers.index)
routes.post("/ongs", OngsControllers.create)

routes.get("/profile", ProfileControllers.index)

routes.get("/incidents", IncidentsControllers.index)
routes.post("/incidents", IncidentsControllers.create)
routes.delete("/incidents/:id", IncidentsControllers.delete)


module.exports = routes