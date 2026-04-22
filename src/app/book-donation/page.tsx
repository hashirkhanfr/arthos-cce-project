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
  bookTitle: string;
  author: string;
  subject: string;
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
  bookTitle: "",
  author: "",
  subject: "",
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
    <div className="section-padding">
      <div className="container-arthos max-w-2xl">
        <div className="mb-10">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Book Donation
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Donate Books, Empower Minds
          </h1>
          <p className="text-gray-500">
            Share the gift of knowledge. Your books will find a new home where they&apos;ll make the greatest difference.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-[#1F6F3D]/5 border border-[#1F6F3D]/20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} className="text-[#1F6F3D]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Donation Submitted!</h2>
            <p className="text-gray-500">{message}</p>
            <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Submit Another</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="donorName" name="donorName" label="Your Name" placeholder="Full name" value={form.donorName} onChange={handleChange} error={errors.donorName} required icon={User} />
              <FormInput id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} required icon={Mail} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="phone" name="phone" label="Phone Number" type="tel" placeholder="+880 1X-XXXX-XXXX" value={form.phone} onChange={handleChange} error={errors.phone} required icon={Phone} />
              <FormInput id="address" name="address" label="Address" placeholder="City and district" value={form.address} onChange={handleChange} error={errors.address} required icon={MapPin} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="bookTitle" name="bookTitle" label="Book Title" placeholder="Name of the book" value={form.bookTitle} onChange={handleChange} error={errors.bookTitle} required icon={BookOpen} />
              <FormInput id="author" name="author" label="Author" placeholder="Author's name" value={form.author} onChange={handleChange} error={errors.author} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="subject" name="subject" label="Subject / Category" placeholder="e.g. Science, Fiction" value={form.subject} onChange={handleChange} error={errors.subject} required />
              <FormInput id="quantity" name="quantity" label="Quantity" type="number" value={form.quantity} onChange={handleChange} min={1} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput id="condition" name="condition" label="Book Condition" type="select" value={form.condition} onChange={handleChange} error={errors.condition} required options={[{ value: "new", label: "New" }, { value: "good", label: "Good" }, { value: "fair", label: "Fair" }]} />
              <FormInput id="pickupRequired" name="pickupRequired" label="Need Pickup?" type="select" value={form.pickupRequired} onChange={handleChange} options={[{ value: "false", label: "No, I'll drop it off" }, { value: "true", label: "Yes, please arrange pickup" }]} />
            </div>
            <FormInput id="message" name="message" label="Additional Notes (optional)" type="textarea" placeholder="Any special instructions or notes..." value={form.message} onChange={handleChange} rows={3} />

            {status === "error" && message && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{message}</p>
            )}
            <Button type="submit" fullWidth size="lg" disabled={status === "loading"} icon={Send} iconPosition="right">
              {status === "loading" ? "Submitting..." : "Submit Donation"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
