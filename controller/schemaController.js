import SchemaModel from "../models/SchemaModel.js";

export const saveSchema = async (req, res) => {
  try {
    const { tableName, code, fields } = req.body;

    if (!tableName || !code) {
      return res.status(400).json({
        success: false,
        message: "Missing table name or code",
      });
    }

    const userId = req.user ? req.user.id : null; // ✅ from token

    const schemaDoc = new SchemaModel({
      tableName,
      code,
      fields,
      createdBy: userId,
    });

    await schemaDoc.save();
    console.log("✅ Schema saved:", schemaDoc.tableName);

    res.json({ success: true, schema: schemaDoc });
  } catch (error) {
    console.error("❌ Error saving schema:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
