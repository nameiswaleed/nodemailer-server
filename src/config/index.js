const dotenv = require("dotenv");
const path = require("path");
const { env } = require("process");
const Joi = require("joi");
dotenv.config({ path: path.join(__dirname, "../../.env") });

const configSchema = Joi.object({
  port: Joi.number().required(),
  gmailAddress: Joi.string().email().required(),
  gmailKey: Joi.string().required(),
  recieverMail: Joi.string().email().required(),
});

const enVars = {
  port: env.PORT || 4000,
  gmailAddress: env.GMAIL_ADDRESS,
  gmailKey: env.GMAIL_PASSWORD,
  recieverMail: env.RECIEVER_MAIL,
};
const { error, value: config } = configSchema.validate(enVars);

if (error) {
  throw new Error(`Invalid configuration: ${error.message}`);
}

module.exports = config;
