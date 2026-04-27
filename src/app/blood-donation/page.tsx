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
    <div className="section-padding bg-gray-50/50">
      <div className="container-arthos">
        <div className="grid lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          
          {/* Right Side: Information (Primary Background) */}
          <div className="bg-[#1F6F3D] text-[#E8D3A5] p-8 sm:p-12 lg:p-16 order-1 lg:order-2 flex flex-col justify-center">
            <span className="inline-block text-sm font-semibold text-[#E8D3A5] uppercase tracking-widest mb-3 opacity-90">
              Blood Donation
            </span>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Give the Gift of Life
            </h1>
            <p className="text-lg text-[#E8D3A5]/90 mb-10 leading-relaxed">
              Every drop counts. Register as a blood donor with ARTHO&apos;S today and stand ready to be a lifeline for someone in critical need. Your simple act can save up to three lives.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Save Lives", desc: "Your donation directly helps patients in emergencies, surgeries, and cancer treatments." },
                { title: "Health Benefits", desc: "Regular donation helps balance iron levels and improves cardiovascular health." },
                { title: "Community Impact", desc: "Join a network of heroes who keep our community safe and resilient." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#E8D3A5]/10 flex items-center justify-center shrink-0">
                    <Droplets size={20} className="text-[#E8D3A5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-[#E8D3A5]/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Side: Form (Beige Background) */}
          <div className="bg-[#E8D3A5] p-8 sm:p-12 lg:p-16 order-2 lg:order-1 flex flex-col justify-center">
            {status === "success" ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center mx-auto mb-6">
                  <Droplets size={32} className="text-[#1F6F3D]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1F6F3D] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>You&apos;re Registered!</h2>
                <p className="text-[#1F6F3D]/80 mb-8">{message}</p>
                <Button variant="primary" size="lg" onClick={() => setStatus("idle")}>
                  Register Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#1F6F3D] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Registration Form</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput id="name" name="name" label="Full Name" placeholder="Your full name" value={form.name} onChange={handleChange} error={errors.name} required icon={User} />
                  <FormInput id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} required icon={Mail} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput id="phone" name="phone" label="Phone Number" type="tel" placeholder="+92 3XX-XXXXXXX" value={form.phone} onChange={handleChange} error={errors.phone} required icon={Phone} />
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

                <Button type="submit" fullWidth size="lg" disabled={status === "loading"} icon={Send} iconPosition="right" className="mt-4">
                  {status === "loading" ? "Registering..." : "Register as Donor"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
