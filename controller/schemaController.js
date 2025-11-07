import SchemaModel from "../models/SchemaModel.js";

export const saveSchema = async (req, res) => {
  try {
    const { code, fields } = req.body;

    if ( !code) {
      return res.status(400).json({
        success: false,
        message: "Missing Schema  code",
      });
    }

    const userId = req.user ? req.user.id : null; // ✅ from token

    const schemaDoc = new SchemaModel({
      
      code,
      fields,
      createdBy: userId,
    });

    await schemaDoc.save();
    

    res.json({ success: true, schema: schemaDoc });
  } catch (error) {
    console.error(" Error saving schema:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
