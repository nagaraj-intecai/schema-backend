import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  name: String,
  type: String,
  children: [{ type: mongoose.Schema.Types.Mixed }],
});

const schemaSchema = new mongoose.Schema({
 
  fields: [fieldSchema],
  code: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Schema", schemaSchema);
