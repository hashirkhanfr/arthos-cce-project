"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Send } from "lucide-react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  age: string;
  occupation: string;
  motivation: string;
  availability: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  age: "",
  occupation: "",
  motivation: "",
  availability: "",
};

export default function VolunteerPage() {
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

    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, age: Number(form.age) }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("Thank you! Your volunteer application has been received.");
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
            Volunteer
          </span>
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Join Our Volunteer Family
          </h1>
          <p className="text-gray-500">
            Fill out the form below and we&apos;ll be in touch to get you
            started on your volunteering journey with ARTHO&apos;S.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-[#1F6F3D]/5 border border-[#1F6F3D]/20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-[#1F6F3D]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Application Received!</h2>
            <p className="text-gray-500">{message}</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setStatus("idle")}
            >
              Submit Another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput
                id="name"
                name="name"
                label="Full Name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                required
                icon={User}
              />
              <FormInput
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
                icon={Mail}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <FormInput
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="+880 1X-XXXX-XXXX"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                required
                icon={Phone}
              />
              <FormInput
                id="age"
                name="age"
                label="Age"
                type="number"
                placeholder="Your age"
                value={form.age}
                onChange={handleChange}
                error={errors.age}
                required
                min={16}
              />
            </div>

            <FormInput
              id="address"
              name="address"
              label="Address"
              placeholder="Your city and district"
              value={form.address}
              onChange={handleChange}
              error={errors.address}
              required
              icon={MapPin}
            />

            <FormInput
              id="occupation"
              name="occupation"
              label="Occupation"
              placeholder="Your current occupation"
              value={form.occupation}
              onChange={handleChange}
              error={errors.occupation}
              required
              icon={Briefcase}
            />

            <FormInput
              id="availability"
              name="availability"
              label="Availability"
              type="select"
              value={form.availability}
              onChange={handleChange}
              error={errors.availability}
              required
              icon={Calendar}
              options={[
                { value: "weekdays", label: "Weekdays" },
                { value: "weekends", label: "Weekends" },
                { value: "both", label: "Both Weekdays & Weekends" },
              ]}
            />

            <FormInput
              id="motivation"
              name="motivation"
              label="Why do you want to volunteer?"
              type="textarea"
              placeholder="Tell us what motivates you to join ARTHO'S..."
              value={form.motivation}
              onChange={handleChange}
              error={errors.motivation}
              required
              rows={5}
            />

            {status === "error" && message && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                {message}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={status === "loading"}
              icon={Send}
              iconPosition="right"
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
