import customerModel from "../../Lesson5/Models/customer.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.query.apiKey;

    if (!apiKey) {
      return res.status(400).send({ message: "API key is required" });
    }

    const parts = apiKey.split('$');
    console.log("🚀 ~ authMiddleware ~ parts:", parts)

    if (parts.length !== 7 || !parts[0].startsWith("web")) {
      return res.status(400).send({ message: "Invalid API key format" });
    }

    const customerId = parts[1]; // Extract customer ID from the API key
    const email = parts[3]
    const customer = await customerModel.findById(customerId);

    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    // Validate if the email matches
    if (customer.email !== email) {
      return res.status(400).send({ message: "Email does not match" });
    }

    // Store customer data in request for use in controllers
    req.customer = customer;

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const validateCustomer = async (req, res, next) => {
  try {
    const { name, email, age, password } = req.body;
    if (!name || !email || !age || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    // check email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }
    const customer = await customerModel.find({ email });
    if (customer.length > 0) {
      return res.status(400).send({ message: "Email already exists" });
    }
    next(); // Proceed to the next middleware or controller
  }catch (error) {
    return res.status(500).send({ message: error.message });
  }
}