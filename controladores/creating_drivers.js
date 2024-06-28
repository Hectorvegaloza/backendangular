import creating_models from "../modelos/creating_models.js";
import mongoose from "mongoose";

const creatingDrivers = {
    createPayment: async (request, answer) => {
      try {
        const newPayment = new creating_models(request.body);
  
        const dateString = request.body.expiration_date;

        let formattedDate;
        try {
          const dateObject = new Date(dateString);
          if (isNaN(dateObject.getTime())) {
            throw new Error("Invalid date format");
          }
          formattedDate = dateObject.toISOString().split('.')[0] + 'Z';
        } catch (error) {
          console.error("Error parsing date:", error.message);
          answer.json({
            answer: "failed",
            message: "Invalid date format. Please use YYYY-MM-DD format.",
            info: null,
          });
          return; 
        }
  
        newPayment.date = formattedDate;

        const paymentCreated = await newPayment.save();
        if (paymentCreated._id) {
          answer.json({
            answer: "worked",
            message: "payment created",
            info: paymentCreated._id,
          });
        }
      } catch (error) {
        answer.json({
          answer: "failed",
          message: "something went wrong",
          info: error,
        });
        console.log("error:", error);
      }
    },

    Read_one_Payment: async (request, answer) => {
        try {
          const paymentId = request.params.id; 
          if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            throw new Error("Invalid payment ID format.");
          }
    
          const foundPayment = await creating_models.findById(paymentId);
    
          if (!foundPayment) {
            answer.json({
              answer: "not found",
              message: "Payment with the provided ID does not exist.",
              info: null,
            });
            return;
          }
    
          answer.json({
            answer: "found",
            message: "Payment details retrieved successfully.",
            info: foundPayment, 
          });
        } catch (error) {
          answer.json({
            answer: "failed",
            message: "Error retrieving payment details",
            info: error.message,
          });
          console.error("Error getting payment by ID:", error);
        }
      },

      listPayments: async (request, answer) => {
        try {
          const allPayments = await creating_models.find({}); 
    
          answer.json({
            answer: "found",
            message: "List of all payments retrieved successfully.",
            info: allPayments, 
          });
        } catch (error) {
          answer.json({
            answer: "failed",
            message: "Error retrieving list of payments",
            info: error.message,
          });
          console.error("Error getting all payments:", error);
        }
      },

      updatePayment: async (request, answer) => {
        try {
          const paymentId = request.params.id;
          const updateData = request.body;
    
          if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            throw new Error("Invalid payment ID format.");
          }

          if (!updateData.hasOwnProperty('payment_amount') || 
              !updateData.hasOwnProperty('tax_applied')) {
            throw new Error("Missing required update data.");
          }
    
          const updatedPayment = await creating_models.findByIdAndUpdate(
            paymentId,
            updateData,
            { new: true } 
          );
    
          if (!updatedPayment) {
            answer.json({
              answer: "not found",
              message: "Payment with the provided ID does not exist.",
              info: null,
            });
            return;
          }
    
          answer.json({
            answer: "updated",
            message: "Payment details updated successfully.",
            info: updatedPayment,
          });
        } catch (error) {
          answer.json({
            answer: "failed",
            message: "Error updating payment details",
            info: error.message,
          });
          console.error("Error updating payment:", error);
        }
      },

      deletePayment: async (request, answer) => {
        try {
          const paymentId = request.params.id; 
    
          if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            throw new Error("Invalid payment ID format.");
          }
    
          const deletedPayment = await creating_models.findByIdAndDelete(paymentId);
    
          if (!deletedPayment) {
            answer.json({
              answer: "not found",
              message: "Payment with the provided ID does not exist.",
              info: null,
            });
            return;
          }
    
          answer.json({
            answer: "deleted",
            message: "Payment deleted successfully.",
            info: null, 
          });
        } catch (error) {
          answer.json({
            answer: "failed",
            message: "Error deleting payment",
            info: error.message,
          });
          console.error("Error deleting payment:", error);
        }
      },
  };

export default creatingDrivers;