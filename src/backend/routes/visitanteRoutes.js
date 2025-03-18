import express from "express";
import {
  criarVisitante,
  listarVisitantes,
  buscarVisitantePorId,
  atualizarVisitante,
  deletarVisitante,
} from "../controllers/visitanteController.js";

const router = express.Router();

router.post("/visitantes", criarVisitante);
router.get("/visitantes", listarVisitantes);
router.get("/visitantes/:id", buscarVisitantePorId);
router.put("/visitantes/:id", atualizarVisitante);
router.delete("/visitantes/:id", deletarVisitante);

export default router;
