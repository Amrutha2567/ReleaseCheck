import express from "express";
import cors from "cors";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

const defaultSteps = {
  code_freeze: false,
  qa_done: false,
  docs_ready: false,
  deployment: false,
  monitoring: false,
  rollback_plan: false,
  announcement: false
};

function getStatus(steps) {
  const values = Object.values(steps);
  if (values.every(v => !v)) return "planned";
  if (values.every(v => v)) return "done";
  return "ongoing";
}

app.get("/api/releases", async (req, res) => {
  const releases = await prisma.release.findMany({ orderBy: { date: "asc" } });
  const result = releases.map(r => ({ ...r, status: getStatus(r.steps) }));
  res.json(result);
});

app.post("/api/releases", async (req, res) => {
  const { name, date, additionalInfo } = req.body;

  const release = await prisma.release.create({
    data: {
      name,
      date: new Date(date),
      additionalInfo,
      steps: defaultSteps
    }
  });

  res.json(release);
});

app.patch("/api/releases/:id/steps", async (req, res) => {
  const updated = await prisma.release.update({
    where: { id: req.params.id },
    data: { steps: req.body.steps }
  });
  res.json(updated);
});

app.listen(5000, () => console.log("Server running on port 5000"));
