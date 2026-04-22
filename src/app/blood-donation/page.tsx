"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Droplets, Calendar, Send } from "lucide-react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  age: string;
  address: string;
  lastDonationDate: string;
  medicalConditions: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  bloodGroup: "",
  age: "",
  address: "",
  lastDonationDate: "",
  medicalConditions: "",
};

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export default function BloodDonationPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/blood-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
        lastDonationDate: form.lastDonationDate || undefined,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("Thank you for registering as a blood donor!");
      setForm(initialState);
    } else {
      setStatus("error");
      setErrors(data.errors ?? {});
      setMessage(data.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="section-padding">
      <div className="container-arthos max-w-2xl">
        <div className="mb-10">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Blood Donation
          </span>
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Register as a Blood Donor
          </h1>
          <p className="text-gray-500">
            Your blood can save lives. Register below and be ready when
            someone needs you most.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-[#1F6F3D]/5 border border-[#1F6F3D]/20 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Droplets size={28} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Registered!</h2>
            <p className="text-gray-500">{message}</p>
            <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
              Register Another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="name" name="name" label="Full Name" placeholder="Your full name" value={form.name} onChange={handleChange} error={errors.name} required icon={User} />
              <FormInput id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} required icon={Mail} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="phone" name="phone" label="Phone Number" type="tel" placeholder="+880 1X-XXXX-XXXX" value={form.phone} onChange={handleChange} error={errors.phone} required icon={Phone} />
              <FormInput id="age" name="age" label="Age" type="number" placeholder="Your age" value={form.age} onChange={handleChange} error={errors.age} required min={18} max={65} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="bloodGroup" name="bloodGroup" label="Blood Group" type="select" value={form.bloodGroup} onChange={handleChange} error={errors.bloodGroup} required icon={Droplets} options={bloodGroupOptions} />
              <FormInput id="lastDonationDate" name="lastDonationDate" label="Last Donation Date (if any)" type="date" value={form.lastDonationDate} onChange={handleChange} icon={Calendar} />
            </div>
            <FormInput id="address" name="address" label="Address" placeholder="Your city and district" value={form.address} onChange={handleChange} error={errors.address} required icon={MapPin} />
            <FormInput id="medicalConditions" name="medicalConditions" label="Medical Conditions (if any)" type="textarea" placeholder="List any relevant medical conditions..." value={form.medicalConditions} onChange={handleChange} rows={3} />

            {status === "error" && message && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{message}</p>
            )}

            <Button type="submit" fullWidth size="lg" disabled={status === "loading"} icon={Send} iconPosition="right">
              {status === "loading" ? "Registering..." : "Register as Donor"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
