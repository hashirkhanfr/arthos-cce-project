export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^(\+?880|0)?1[3-9]\d{8}$/.test(phone.replace(/\s/g, ""));
}

export function validateRequired(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return !isNaN(value);
  return value !== null && value !== undefined;
}

export function validateVolunteer(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.name)) errors.name = "Name is required";
  if (!validateEmail(data.email as string)) errors.email = "Valid email is required";
  if (!validatePhone(data.phone as string)) errors.phone = "Valid Bangladeshi phone number is required";
  if (!validateRequired(data.address)) errors.address = "Address is required";
  if (!data.age || (data.age as number) < 16) errors.age = "Must be at least 16 years old";
  if (!validateRequired(data.occupation)) errors.occupation = "Occupation is required";
  if (!validateRequired(data.motivation)) errors.motivation = "Motivation is required";
  if (!["weekdays", "weekends", "both"].includes(data.availability as string))
    errors.availability = "Availability must be weekdays, weekends, or both";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateBloodDonor(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (!validateRequired(data.name)) errors.name = "Name is required";
  if (!validateEmail(data.email as string)) errors.email = "Valid email is required";
  if (!validatePhone(data.phone as string)) errors.phone = "Valid Bangladeshi phone number is required";
  if (!validBloodGroups.includes(data.bloodGroup as string))
    errors.bloodGroup = "Valid blood group is required";
  if (!data.age || (data.age as number) < 18 || (data.age as number) > 65)
    errors.age = "Donor must be between 18 and 65 years old";
  if (!validateRequired(data.address)) errors.address = "Address is required";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateDonation(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  const validPurposes = ["general", "education", "health", "food", "disaster-relief"];

  if (!validateRequired(data.donorName)) errors.donorName = "Name is required";
  if (!validateEmail(data.email as string)) errors.email = "Valid email is required";
  if (!validatePhone(data.phone as string)) errors.phone = "Valid Bangladeshi phone number is required";
  if (!data.amount || (data.amount as number) < 1) errors.amount = "Amount must be at least 1";
  if (!validPurposes.includes(data.purpose as string)) errors.purpose = "Valid purpose is required";

  return { valid: Object.keys(errors).length === 0, errors };
}
