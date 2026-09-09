"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
          <input 
            {...register("name")}
            type="text" 
            id="name" 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
            placeholder="John Doe" 
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
          <input 
            {...register("email")}
            type="email" 
            id="email" 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
            placeholder="john@example.com" 
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
        <textarea 
          {...register("message")}
          id="message" 
          rows={5} 
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
          placeholder="Tell me about your project..."
        ></textarea>
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>
      
      {submitStatus === "success" && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
          Message sent successfully! I will get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          Failed to send message. Please try again later.
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-4 rounded-lg transition-colors flex justify-center items-center"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
