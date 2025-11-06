import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import http from "http";
import { Server } from "socket.io";
import schemaRoutes from "./routes/schemaRoute.js";
  import SchemaModel from "./models/SchemaModel.js";
  import aiRoute from "./routes/aiRoute.js";
  import geminiRoute from "./routes/geminiRoute.js";


dotenv.config();

const app = express();
connectDb();

// ✅ Apply CORS correctly for Express
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ✅ API routes
app.use("/api/ai", aiRoute);
app.use("/api/gemini", geminiRoute);
app.use("/api/auth", authRoutes);
app.use("/api/schema", schemaRoutes);

// ✅ HTTP server + Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // or "*" if you want all origins
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  // 🔹 Realtime code update
  socket.on("schema-update", (data) => {
    socket.broadcast.emit("schema-update", data); // broadcast to others
  });

  // 🔹 Save schema
  socket.on("save-schema", async (data) => {
    try {
      console.log("🗄️ Saving schema:", data);
      const newSchema = new SchemaModel({
        tableName: data.tableName || "Untitled_Table",
        fields: data.fields || [],
        code: data.code || "",
        createdBy: data.userId || null,
      });
      await newSchema.save();
      console.log("✅ Schema saved successfully!");
      io.emit("schema-saved", newSchema);
    } catch (err) {
      console.error("❌ Error saving schema:", err.message);
      socket.emit("save-error", { message: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
