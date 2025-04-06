import express from "express";
import {
  criarVisitante,
  listarVisitantes,
  buscarVisitantePorId,
  atualizarVisitante,
  deletarVisitante,
} from "../controllers/visitanteController.js";

import { verifyToken } from "../controllers/authController.js";  
import { isAdmin } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/visitantes", verifyToken, criarVisitante); 
router.get("/visitantes", verifyToken, isAdmin, listarVisitantes); 
router.get("/visitantes/:id", verifyToken, buscarVisitantePorId); 
router.put("/visitantes/:id", verifyToken, atualizarVisitante); 
router.delete("/visitantes/:id", verifyToken, isAdmin, deletarVisitante); 

export default router;
