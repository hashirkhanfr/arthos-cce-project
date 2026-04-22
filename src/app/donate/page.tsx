"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { User, Mail, Phone, Heart, Send } from "lucide-react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

interface FormState {
  donorName: string;
  email: string;
  phone: string;
  amount: string;
  purpose: string;
  message: string;
}

const initialState: FormState = {
  donorName: "",
  email: "",
  phone: "",
  amount: "",
  purpose: "",
  message: "",
};

const purposeOptions = [
  { value: "general", label: "General Support" },
  { value: "education", label: "Education Programs" },
  { value: "health", label: "Health Services" },
  { value: "food", label: "Food Aid" },
  { value: "disaster-relief", label: "Disaster Relief" },
];

const suggestedAmounts = [500, 1000, 2500, 5000];

export default function DonatePage() {
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

    const res = await fetch("/api/donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("Your donation has been recorded. Thank you for your generosity!");
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
            Donate
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Make a Meaningful Donation
          </h1>
          <p className="text-gray-500">
            Your contribution directly funds life-changing programs. Every taka counts.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-[#1F6F3D]/5 border border-[#1F6F3D]/20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center mx-auto mb-4">
              <Heart size={28} className="text-[#1F6F3D]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-500">{message}</p>
            <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Donate Again</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
            {/* Quick amount selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-3">
                Select Amount (BDT) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, amount: String(amt) }))}
                    className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      form.amount === String(amt)
                        ? "border-[#1F6F3D] bg-[#1F6F3D] text-white"
                        : "border-gray-200 text-gray-600 hover:border-[#1F6F3D] hover:text-[#1F6F3D]"
                    }`}
                  >
                    ৳{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <FormInput id="amount" name="amount" label="Or enter custom amount" type="number" placeholder="Enter amount in BDT" value={form.amount} onChange={handleChange} error={errors.amount} min={1} />
            </div>

            <FormInput id="purpose" name="purpose" label="Donation Purpose" type="select" value={form.purpose} onChange={handleChange} error={errors.purpose} required options={purposeOptions} icon={Heart} />

            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="donorName" name="donorName" label="Your Name" placeholder="Full name" value={form.donorName} onChange={handleChange} error={errors.donorName} required icon={User} />
              <FormInput id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} required icon={Mail} />
            </div>

            <FormInput id="phone" name="phone" label="Phone Number" type="tel" placeholder="+880 1X-XXXX-XXXX" value={form.phone} onChange={handleChange} error={errors.phone} required icon={Phone} />
            <FormInput id="message" name="message" label="Message (optional)" type="textarea" placeholder="A note of encouragement or dedication..." value={form.message} onChange={handleChange} rows={3} />

            {status === "error" && message && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{message}</p>
            )}
            <Button type="submit" fullWidth size="lg" disabled={status === "loading"} icon={Send} iconPosition="right">
              {status === "loading" ? "Processing..." : "Submit Donation"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
