import { describe, it, expect } from "vitest";
import { contactSchema, csvCell } from "./contact-schema";
const valid = {
  full_name: "Ada Mensah",
  email: "ada@example.org",
  phone: "+233 20 123 4567",
  country: "Ghana",
  organisation: "",
  subject: "general",
  message: "I would like to learn more about IAPA.",
  preferred_language: "en",
  consent: true,
  website: "",
};
describe("Contact rules", () => {
  it("requires at least 20 message characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(19) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(20) }).success).toBe(true);
  });
  it("requires consent", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("allows African countries and Other only", () => {
    expect(contactSchema.safeParse({ ...valid, country: "Other" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, country: "Atlantis" }).success).toBe(false);
  });
  it("requires a country code when phone is provided", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "020 123 4567" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, phone: "" }).success).toBe(true);
  });
  it("accepts only the supplied subjects", () => {
    expect(contactSchema.safeParse({ ...valid, subject: "training" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, subject: "spam" }).success).toBe(false);
  });
  it("neutralises spreadsheet formulas", () => {
    expect(csvCell("=1+1")).toBe('"\'=1+1"');
  });
  it("rejects a filled honeypot", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam.example" }).success).toBe(false);
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("normalises French countries", () => {
    expect(contactSchema.parse({ ...valid, country: "Cameroun" }).country).toBe("Cameroon");
  });
});
