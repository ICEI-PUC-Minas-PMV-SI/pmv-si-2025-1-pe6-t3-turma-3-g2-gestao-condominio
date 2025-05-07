import express from "express";
import { 
  criarMorador, 
  listarMoradores, 
  buscarMoradorPorId, 
  atualizarMorador, 
  deletarMorador,
  getMoradorDoUsuario 
} from "../controllers/moradorController.js";

import { verifyToken } from "../controllers/authController.js";  
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, criarMorador); 
router.get("/", verifyToken, isAdmin, listarMoradores); 
router.get("/usuario", verifyToken, getMoradorDoUsuario);
router.get("/:id", verifyToken, buscarMoradorPorId);
router.put("/:id", verifyToken, atualizarMorador);
router.delete("/:id", verifyToken, isAdmin, deletarMorador);

export default router;