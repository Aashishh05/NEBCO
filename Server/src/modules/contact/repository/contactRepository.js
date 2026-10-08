import Contact from "../model/contactModel.js";

// The site keeps a single contact card, so there is just one document.
export const findFirst = async () => {
  return await Contact.findOne();
};

export const upsert = async (data) => {
  const contact = (await Contact.findOne()) || new Contact();

  for (const [field, value] of Object.entries(data)) {
    if (value !== undefined) contact[field] = value;
  }

  return await contact.save();
};