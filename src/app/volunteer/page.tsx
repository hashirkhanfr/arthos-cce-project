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
    <div className="section-padding bg-gray-50/50">
      <div className="container-arthos">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Information */}
          <div className="sticky top-32">
            <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
              Volunteer
            </span>
            <h1
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Join Our Volunteer Family
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your time and skills can bring hope to those who need it most. 
              By joining ARTHO&apos;S, you become part of a dedicated community 
              committed to driving real change across Pakistan.
            </p>
            
            <div className="space-y-6 mb-10 lg:mb-0">
              {[
                { title: "Make a Difference", desc: "Contribute directly to impactful community projects." },
                { title: "Learn & Grow", desc: "Gain valuable experience and develop new skills." },
                { title: "Build Connections", desc: "Meet like-minded people passionate about helping others." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F3D]/10 flex items-center justify-center shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#1F6F3D]" />
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
                  <Send size={32} className="text-[#1F6F3D]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Application Received!</h2>
                <p className="text-gray-500 mb-8">Thank you! Your volunteer application has been received. We will contact you soon.</p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStatus("idle")}
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 sm:p-10 space-y-6"
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
                      placeholder="+92 3XX-XXXXXXX"
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
                  rows={4}
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
                  className="mt-4"
                >
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
