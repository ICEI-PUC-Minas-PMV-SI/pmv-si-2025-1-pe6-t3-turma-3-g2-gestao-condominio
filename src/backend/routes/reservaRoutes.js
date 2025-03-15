const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");

router.post("/reserva", reservaController.criarReserva);
router.get("/reserva", reservaController.listarReservas);
router.get("/reserva/:id", reservaController.buscarReserva);
router.put("/reserva/:id", reservaController.atualizarReserva);
router.delete("/reserva/:id", reservaController.cancelarReserva);
router.get("/reserva/historico", reservaController.historicoReservas);

module.exports = router;
