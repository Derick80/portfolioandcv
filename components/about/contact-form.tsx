"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/app/actions/about";
import { Label } from "../ui/label";

const initialState = {
  name: "",
  from: "",
  message: "",
};

const ContactForm = () => {
  const [state, action, isPending] = useActionState(
    sendContactEmail,
    initialState,
  );
  return (
    <form id="Contact" className="space-y-4 mt-6" action={action}>
      <h2 className="text-2xl font-bold">Contact Me</h2>
      <p className="text-primary italic">Contact me via Email</p>
      <input type="hidden" name="shield" value="" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="from"
            name="from"
            placeholder="Enter your email"
            type="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="mb-2">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message"
        />
      </div>
      <Button className="w-full" disabled={isPending} type="submit">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
