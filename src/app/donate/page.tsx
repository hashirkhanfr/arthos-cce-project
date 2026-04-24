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
    <div className="section-padding bg-gray-50/50">
      <div className="container-arthos">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Information */}
          <div className="sticky top-32">
            <span className="inline-block text-sm font-semibold text-[#C9A86A] uppercase tracking-widest mb-3">
              Donate
            </span>
            <h1
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Make a Meaningful Donation
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your contribution directly funds life-changing programs. Every rupee counts. Join us in building a stronger, healthier, and more educated Pakistan through your generous support.
            </p>
            
            <div className="space-y-6 mb-10 lg:mb-0">
              {[
                { title: "Transparent Impact", desc: "100% of your donation directly supports our on-ground community programs." },
                { title: "Tax Deductible", desc: "All donations to ARTHO'S are eligible for tax deductions under government regulations." },
                { title: "Regular Updates", desc: "We'll keep you informed about exactly how your contribution is making a difference." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A86A]/10 flex items-center justify-center shrink-0">
                    <Heart size={20} className="text-[#C9A86A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div>
            {status === "success" ? (
              <div className="p-10 rounded-3xl bg-white border border-[#1F6F3D]/20 shadow-xl shadow-[#1F6F3D]/5 text-center">
                <div className="w-20 h-20 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center mx-auto mb-6">
                  <Heart size={32} className="text-[#1F6F3D] fill-current" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Thank You!</h2>
                <p className="text-gray-500 mb-8">{message}</p>
                <Button variant="outline" size="lg" onClick={() => setStatus("idle")}>Donate Again</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 sm:p-10 space-y-6">
                {/* Quick amount selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-3">
                    Select Amount (PKR) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {suggestedAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, amount: String(amt) }))}
                        className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                          form.amount === String(amt)
                            ? "border-[#1F6F3D] bg-[#1F6F3D] text-white shadow-md shadow-[#1F6F3D]/20"
                            : "border-gray-200 text-gray-600 hover:border-[#1F6F3D]/50 hover:text-[#1F6F3D]"
                        }`}
                      >
                        ₨{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <FormInput id="amount" name="amount" label="Or enter custom amount" type="number" placeholder="Enter amount in PKR" value={form.amount} onChange={handleChange} error={errors.amount} min={1} />
                </div>

                <FormInput id="purpose" name="purpose" label="Donation Purpose" type="select" value={form.purpose} onChange={handleChange} error={errors.purpose} required options={purposeOptions} icon={Heart} />

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput id="donorName" name="donorName" label="Your Name" placeholder="Full name" value={form.donorName} onChange={handleChange} error={errors.donorName} required icon={User} />
                  <FormInput id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} required icon={Mail} />
                </div>

                <FormInput id="phone" name="phone" label="Phone Number" type="tel" placeholder="+92 3XX-XXXXXXX" value={form.phone} onChange={handleChange} error={errors.phone} required icon={Phone} />
                <FormInput id="message" name="message" label="Message (optional)" type="textarea" placeholder="A note of encouragement or dedication..." value={form.message} onChange={handleChange} rows={3} />

                {status === "error" && message && (
                  <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{message}</p>
                )}
                <Button type="submit" fullWidth size="lg" disabled={status === "loading"} icon={Send} iconPosition="right" className="mt-4">
                  {status === "loading" ? "Processing..." : "Submit Donation"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
