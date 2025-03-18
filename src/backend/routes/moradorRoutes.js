import express from "express";
import { criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador } from "../controllers/moradorController.js";

const router = express.Router();

router.post("/", criarMorador);
router.get("/", listarMoradores);
router.get("/:id", buscarMoradorPorId);
router.put("/:id", atualizarMorador);
router.delete("/:id", deletarMorador);

export default router;