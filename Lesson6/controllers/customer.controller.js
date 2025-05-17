import customerModel from "../../Lesson5/Models/customer.model.js";
import crypto from "crypto";
import bcrypt from 'bcrypt'
// get list customers
const CustomerController = {
  // get api key
  getApiKey: async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await customerModel.customerModel(customerId);

      if (!customer) {
        return res.status(404).send({ message: "Customer not found" });
      }

      const randomString = crypto.randomBytes(16).toString("hex");
      console.log("🚀 ~ getApiKey: ~ randomString:", randomString)
      const apiKey = `web-$${customerId}$-$${customer.email}$-$${randomString}$`;

      return res.status(200).send({ apiKey });
      // web-$6808fb6bbfdd224ea60d945f$-$nguyenvana@example.com$-$08c1f1a3591c63c8a87276691799d2fe$
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  getListCustomer: async (req, res) => {
    try {
      const customers = await customerModel.find({});
    
      if (!customers) throw new Error("User not found!");

      res.status(200).send({
        data: customers,
        message: "Get customer successful!",
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const { id } = req.params;
      const customerDetail = await customerModel.findById(id)

      if (!customerDetail) res.status(404).send({
        message: "Customer not found!",
        data: null,
        success: false,
      });

      res.status(200).send({
        data: customerDetail,
        message: "Get customer successful!",
        success: true,
      });

    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },
  
  // create new customer
  createNewCustomer: async (req, res) => {
    try {
      const { name, email, age, password } = req.body;
      if (!name || !email || !age || !password) {
        throw new Error('Missing information (name, email, age, password)')
      }
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)

      const createdCustomer = await Customer.create({
        name,
        email,
        age,
        hash,
        salt
      });
      res.status(201).send({
        data: createdCustomer,
        message: "Register successful!",
        success: true,
      });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },


};

export default CustomerController;