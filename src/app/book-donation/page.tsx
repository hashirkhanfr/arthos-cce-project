"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Send } from "lucide-react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

interface FormState {
  donorName: string;
  email: string;
  phone: string;
  address: string;
  condition: string;
  quantity: string;
  pickupRequired: string;
  message: string;
}

const initialState: FormState = {
  donorName: "",
  email: "",
  phone: "",
  address: "",
  condition: "",
  quantity: "1",
  pickupRequired: "false",
  message: "",
};

export default function BookDonationPage() {
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

    const res = await fetch("/api/book-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
        pickupRequired: form.pickupRequired === "true",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("Thank you for donating books! We'll reach out soon.");
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
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Book Donation
            </span>
            <h1
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Donate Books, Empower Minds
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Share the gift of knowledge. Your books will find a new home where they&apos;ll make the greatest difference. Help us build libraries and provide educational resources to underprivileged communities across Pakistan.
            </p>
            
            <div className="space-y-6 mb-10 lg:mb-0">
              {[
                { title: "Empower Students", desc: "Your books provide crucial learning materials for children who cannot afford them." },
                { title: "Promote Literacy", desc: "Contribute directly to raising the literacy rate and fostering a culture of reading." },
                { title: "Environmental Impact", desc: "Recycle and reuse books, promoting sustainability and reducing waste." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center shrink-0">
                    <BookOpen size={20} className="text-[#1F6F3D]" />
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
                  <BookOpen size={32} className="text-[#1F6F3D]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Donation Submitted!</h2>
                <p className="text-gray-500 mb-8">{message}</p>
                <Button variant="outline" size="lg" onClick={() => setStatus("idle")}>Submit Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 sm:p-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput id="donorName" name="donorName" label="Your Name" placeholder="Full name" value={form.donorName} onChange={handleChange} error={errors.donorName} required icon={User} />
                  <FormInput id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} required icon={Mail} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput id="phone" name="phone" label="Phone Number" type="tel" placeholder="+92 3XX-XXXXXXX" value={form.phone} onChange={handleChange} error={errors.phone} required icon={Phone} />
                  <FormInput id="address" name="address" label="Address" placeholder="City and district" value={form.address} onChange={handleChange} error={errors.address} required icon={MapPin} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput id="quantity" name="quantity" label="Quantity" type="number" value={form.quantity} onChange={handleChange} min={1} />
                  <FormInput id="condition" name="condition" label="Book Condition" type="select" value={form.condition} onChange={handleChange} error={errors.condition} required options={[{ value: "new", label: "New" }, { value: "good", label: "Good" }, { value: "fair", label: "Fair" }]} />
                </div>
                <div className="grid sm:grid-cols-1 gap-6">
                  <FormInput id="pickupRequired" name="pickupRequired" label="Need Pickup?" type="select" value={form.pickupRequired} onChange={handleChange} options={[{ value: "false", label: "No, I'll drop it off" }, { value: "true", label: "Yes, please arrange pickup" }]} />
                </div>

                <FormInput id="message" name="message" label="Additional Notes (optional)" type="textarea" placeholder="Any special instructions or notes..." value={form.message} onChange={handleChange} rows={3} />

                {status === "error" && message && (
                  <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{message}</p>
                )}
                <Button type="submit" fullWidth size="lg" disabled={status === "loading"} icon={Send} iconPosition="right" className="mt-4">
                  {status === "loading" ? "Submitting..." : "Submit Donation"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
