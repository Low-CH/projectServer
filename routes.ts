import { Router } from "https:deno.land/x/oak/mod.ts";
import {
  getParticulars,
  getParticular,
  addParticular,
  updateParticular,
  deleteParticular,
} from "./controllers/particulars.ts";
const router = new Router();
router.get("/api/v1/particulars", getParticulars)
  .get("/api/v1/particulars/:id", getParticular)
  .post("/api/v1/particulars", addParticular)
  .put("/api/v1/particulars/:id", updateParticular)
  .delete("/api/v1/particulars/:id", deleteParticular);

export default router;
