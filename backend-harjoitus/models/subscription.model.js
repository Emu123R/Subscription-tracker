import mongoose from "mongoose";

//tilauksille tietokantamalli
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLenght: 2,
        maxLenght: 100,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "AUD"],
        default: "EUR",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["finance", "lifestyle", "news", "entertainment", "food", "technology", "sports", "other"],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer", "klarna"],
        default: "credit_card",
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "expired", "cancelled"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) { 
                return value > this.startDate; 
            },
            message: "Renewal date must be after the start date",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }
}, {timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    
    if(this.renewaldate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;